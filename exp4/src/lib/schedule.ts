export type PostKind = "meeting" | "deadline" | "focus" | "personal";

export type Post = {
  id: string;
  title: string;
  time: string;
  day: number; // 0 = Mon ... 6 = Sun
  kind: PostKind;
};

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const KIND_META: Record<PostKind, { label: string; accent: string; chip: string }> = {
  meeting: {
    label: "Meeting",
    accent: "bg-sky",
    chip: "border-sky/40 text-sky",
  },
  deadline: {
    label: "Deadline",
    accent: "bg-clay",
    chip: "border-clay/40 text-clay",
  },
  focus: {
    label: "Focus block",
    accent: "bg-sage",
    chip: "border-sage/40 text-sage",
  },
  personal: {
    label: "Personal",
    accent: "bg-ember",
    chip: "border-ember/40 text-ember",
  },
};

export const INITIAL_POSTS: Post[] = [
  { id: "p1", title: "Design review", time: "10:00", day: 0, kind: "meeting" },
  { id: "p2", title: "Ship v2.3", time: "16:00", day: 0, kind: "deadline" },
  { id: "p3", title: "1:1 with Sam", time: "09:30", day: 1, kind: "meeting" },
  { id: "p4", title: "Write proposal", time: "13:00", day: 2, kind: "focus" },
  { id: "p5", title: "Client demo", time: "15:00", day: 3, kind: "meeting" },
  { id: "p6", title: "Portfolio review", time: "18:00", day: 3, kind: "focus" },
  { id: "p7", title: "Grocery run", time: "10:00", day: 5, kind: "personal" },
  { id: "p8", title: "Sprint planning", time: "11:00", day: 6, kind: "meeting" },
];

/** Intentionally costly filter+sort so useMemo has something to cache. */
export function buildAgenda(posts: Post[], day: number) {
  let churn = 0;
  for (let i = 0; i < 120_000; i++) churn += Math.sqrt(i % 97);
  const agenda = posts
    .filter((p) => p.day === day)
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time));
  return { agenda, churn: Math.round(churn) };
}
