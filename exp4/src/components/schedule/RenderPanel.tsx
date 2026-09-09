import { useSyncExternalStore } from "react";
import type { RenderMonitor } from "@/lib/render-monitor";
import type { Post } from "@/lib/schedule";

const EMPTY = { counts: {} as Record<string, number>, total: 0 };

export function RenderPanel({ monitor, posts }: { monitor: RenderMonitor; posts: Post[] }) {
  const snapshot = useSyncExternalStore(monitor.subscribe, monitor.getSnapshot, () => EMPTY);
  const max = Math.max(1, ...Object.values(snapshot.counts));
  const rendered = posts.filter((p) => (snapshot.counts[p.id] ?? 0) > 0).length;

  return (
    <aside className="panel p-5">
      <h2 className="meta-label">Render monitor</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-display text-3xl text-ember">{snapshot.total}</p>
          <p className="mt-1 text-xs text-muted-foreground">renders logged</p>
        </div>
        <div>
          <p className="font-display text-3xl text-foreground">
            {rendered}
            <span className="text-muted-foreground">/{posts.length}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">cards that re-rendered</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {posts.map((post) => {
          const count = snapshot.counts[post.id] ?? 0;
          return (
            <li key={post.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">
                {post.title}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-ember transition-all duration-300"
                  style={{ width: `${Math.max(3, (count / max) * 100)}%` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right font-mono text-xs text-foreground">
                {count}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
