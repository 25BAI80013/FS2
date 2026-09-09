import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MemoPostCard, PostCard } from "@/components/schedule/PostCard";
import { RenderPanel } from "@/components/schedule/RenderPanel";
import { RenderMonitor } from "@/lib/render-monitor";
import { DAYS, INITIAL_POSTS, KIND_META, buildAgenda, type Post } from "@/lib/schedule";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scheduler Lab — Interactive Calendar & Render Profiler" },
      {
        name: "description",
        content:
          "Drag posts across a week calendar and watch how React.memo, useCallback and useMemo change re-render counts in real time.",
      },
      { property: "og:title", content: "Scheduler Lab — Interactive Calendar & Render Profiler" },
      {
        property: "og:description",
        content:
          "An interactive post scheduler with a live render monitor for memoization experiments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SchedulerLab,
});

function SchedulerLab() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [agendaDay, setAgendaDay] = useState(0);
  const [dragOverDay, setDragOverDay] = useState<number | null>(null);
  const [useMemoCards, setUseMemoCards] = useState(true);
  const [useStableHandlers, setUseStableHandlers] = useState(true);
  const [useMemoAgenda, setUseMemoAgenda] = useState(true);
  const [clockOn, setClockOn] = useState(false);
  const [tick, setTick] = useState(0);

  const monitorRef = useRef(new RenderMonitor());
  const monitor = monitorRef.current;
  const draggingRef = useRef<string | null>(null);
  const clockRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleClock = (on: boolean) => {
    setClockOn(on);
    if (clockRef.current) clearInterval(clockRef.current);
    clockRef.current = on ? setInterval(() => setTick((t) => t + 1), 450) : null;
  };

  const stableDragStart = useCallback((id: string) => {
    draggingRef.current = id;
  }, []);
  const stableSelect = useCallback((id: string) => setSelectedId(id), []);

  const onDragStart = useStableHandlers
    ? stableDragStart
    : (id: string) => {
        draggingRef.current = id;
      };
  const onSelect = useStableHandlers ? stableSelect : (id: string) => setSelectedId(id);

  const memoAgenda = useMemo(() => buildAgenda(posts, agendaDay), [posts, agendaDay]);
  const agenda = useMemoAgenda ? memoAgenda : buildAgenda(posts, agendaDay);

  const drop = (day: number) => {
    const id = draggingRef.current;
    setDragOverDay(null);
    draggingRef.current = null;
    if (!id) return;
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, day } : p)));
  };

  const Card = useMemoCards ? MemoPostCard : PostCard;
  const selected = posts.find((p) => p.id === selectedId) ?? null;

  return (
    <main className="min-h-screen bg-background px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="meta-label">Experiment 05 · scheduling + performance</p>
            <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Scheduler Lab</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Drag scheduled posts between days, then flip the memoization switches to watch, in
              real time, what React.memo, useCallback and useMemo actually do to re-renders.
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface px-4 py-3 text-right">
            <p className="meta-label">Clock ticks</p>
            <p className="font-mono text-2xl text-ember">{tick}</p>
          </div>
        </header>

        <section className="panel mt-8 p-5">
          <div className="grid gap-5 md:grid-cols-3">
            <ToggleRow
              label="React.memo on cards"
              hint="Skip a card's re-render when its own props haven't changed."
              checked={useMemoCards}
              onChange={setUseMemoCards}
            />
            <ToggleRow
              label="useCallback for handlers"
              hint="Keep drag handlers referentially stable so memo isn't fooled."
              checked={useStableHandlers}
              onChange={setUseStableHandlers}
            />
            <ToggleRow
              label="useMemo for agenda"
              hint="Cache the expensive filtered agenda; recompute only on real change."
              checked={useMemoAgenda}
              onChange={setUseMemoAgenda}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <ToggleRow
              label="Live clock"
              hint="Ticks every 450ms to simulate unrelated state elsewhere in the app."
              checked={clockOn}
              onChange={toggleClock}
            />
            <Button variant="outline" onClick={monitor.reset}>
              Reset counters
            </Button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
          <section className="panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="meta-label">Week view</h2>
              <ul className="flex flex-wrap gap-2">
                {Object.entries(KIND_META).map(([key, meta]) => (
                  <li
                    key={key}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[11px]",
                      meta.chip,
                    )}
                  >
                    {meta.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {DAYS.map((day, index) => (
                <div
                  key={day}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverDay(index);
                  }}
                  onDragLeave={() => setDragOverDay((d) => (d === index ? null : d))}
                  onDrop={() => drop(index)}
                  onClick={() => setAgendaDay(index)}
                  className={cn(
                    "min-h-44 rounded-lg border bg-background/40 p-2 transition-colors",
                    dragOverDay === index
                      ? "border-ember bg-ember/10"
                      : agendaDay === index
                        ? "border-ember/40"
                        : "border-border",
                  )}
                >
                  <p className="meta-label mb-2 px-1">{day}</p>
                  <div className="space-y-2">
                    {posts
                      .filter((p) => p.day === index)
                      .map((post) => (
                        <Card
                          key={post.id}
                          post={post}
                          monitor={monitor}
                          selected={post.id === selectedId}
                          onDragStart={onDragStart}
                          onSelect={onSelect}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <h3 className="meta-label">
                Agenda · {DAYS[agendaDay]} · {agenda.agenda.length} posts
              </h3>
              <ul className="mt-3 space-y-1.5">
                {agenda.agenda.map((post) => (
                  <li key={post.id} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-xs text-ember">{post.time}</span>
                    <span className="text-foreground">{post.title}</span>
                    <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                      {KIND_META[post.kind].label}
                    </span>
                  </li>
                ))}
                {agenda.agenda.length === 0 && (
                  <li className="text-sm text-muted-foreground">Nothing scheduled — drag a post here.</li>
                )}
              </ul>
            </div>
          </section>

          <div className="space-y-6">
            <RenderPanel monitor={monitor} posts={posts} />
            <section className="panel p-5">
              <h2 className="meta-label">Inspector</h2>
              {selected ? (
                <div className="mt-3 space-y-2 text-sm">
                  <p className="font-display text-xl">{selected.title}</p>
                  <p className="text-muted-foreground">
                    {DAYS[selected.day]} at{" "}
                    <span className="font-mono text-foreground">{selected.time}</span>
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    kind: {KIND_META[selected.kind].label} · id: {selected.id}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Click a post to inspect it. Drag it onto another day to reschedule.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-3">
      <Switch checked={checked} onCheckedChange={onChange} className="mt-0.5" />
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}
