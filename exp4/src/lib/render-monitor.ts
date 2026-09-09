type Listener = () => void;

export type MonitorSnapshot = {
  counts: Record<string, number>;
  total: number;
};

/** Tiny external store so logging a render never re-renders the tracked card. */
export class RenderMonitor {
  private counts: Record<string, number> = {};
  private total = 0;
  private snapshot: MonitorSnapshot = { counts: {}, total: 0 };
  private listeners = new Set<Listener>();
  private queued = false;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): MonitorSnapshot => this.snapshot;

  tick = (id: string) => {
    this.counts[id] = (this.counts[id] ?? 0) + 1;
    this.total += 1;
    this.flush();
  };

  reset = () => {
    this.counts = {};
    this.total = 0;
    this.snapshot = { counts: {}, total: 0 };
    this.listeners.forEach((l) => l());
  };

  private flush() {
    if (this.queued) return;
    this.queued = true;
    queueMicrotask(() => {
      this.queued = false;
      this.snapshot = { counts: { ...this.counts }, total: this.total };
      this.listeners.forEach((l) => l());
    });
  }
}
