import { useMemo, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

export default function KnowledgeBasePage() {
  const { articles } = useWorkspace();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const published = useMemo(() => articles.filter((article) => article.status === 'published' && `${article.title} ${article.body}`.toLowerCase().includes(query.toLowerCase())), [articles, query]);
  const selected = articles.find((article) => article.id === selectedId);
  return <><div className="heading"><div><div className="eyebrow">PUBLISHED CONTENT</div><h1>Knowledge base</h1><p>Practical guides prepared by your team.</p></div></div><div className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" aria-label="Search published articles" /></div>
    {selected ? <section className="panel reader"><button className="text-button back-button" onClick={() => setSelectedId(null)}>← All articles</button><div className="article-meta"><span className="status-badge published">Published</span><time>{new Date(selected.updatedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time></div><h2>{selected.title}</h2><p>{selected.body}</p><footer>Written by {selected.author}</footer></section> : <section className="article-grid public-grid">{published.map((article) => <button className="article-card article-link" onClick={() => setSelectedId(article.id)} key={article.id}><div className="article-meta"><span className="status-badge published">Published</span><time>{new Date(article.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time></div><h2>{article.title}</h2><p>{article.body}</p><span className="read-more">Read article →</span></button>)}{!published.length && <div className="empty-state"><h2>No matching articles</h2><p>Try a different search term.</p></div>}</section>}
  </>;
}
