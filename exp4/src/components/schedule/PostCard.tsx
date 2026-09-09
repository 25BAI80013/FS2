import { memo, useEffect } from "react";
import { KIND_META, type Post } from "@/lib/schedule";
import type { RenderMonitor } from "@/lib/render-monitor";
import { cn } from "@/lib/utils";

export type PostCardProps = {
  post: Post;
  monitor: RenderMonitor;
  selected: boolean;
  onDragStart: (id: string) => void;
  onSelect: (id: string) => void;
};

function PostCardBase({ post, monitor, selected, onDragStart, onSelect }: PostCardProps) {
  useEffect(() => {
    monitor.tick(post.id);
  });

  const meta = KIND_META[post.kind];

  return (
    <button
      type="button"
      draggable
      onDragStart={() => onDragStart(post.id)}
      onClick={() => onSelect(post.id)}
      className={cn(
        "group relative w-full cursor-grab overflow-hidden rounded-md border bg-surface-raised p-3 pl-4 text-left transition-all active:cursor-grabbing",
        selected
          ? "border-ember shadow-lift"
          : "border-border hover:border-ember/50 hover:shadow-lift",
      )}
    >
      <span className={cn("absolute left-0 top-0 h-full w-1", meta.accent)} />
      <span className="meta-label block">{post.time}</span>
      <span className="mt-1 block break-words text-sm font-medium leading-snug text-foreground">
        {post.title}
      </span>
    </button>
  );
}

export const PostCard = PostCardBase;
export const MemoPostCard = memo(PostCardBase);
