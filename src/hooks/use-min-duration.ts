import { useEffect, useRef, useState } from "react";

export function useMinDuration(active: boolean, minMs: number): boolean {
  const [visible, setVisible] = useState(active);
  const activeSinceRef = useRef<number | null>(active ? Date.now() : null);

  useEffect(() => {
    if (active) {
      activeSinceRef.current = Date.now();
      setVisible(true);
      return;
    }

    if (!visible) {
      activeSinceRef.current = null;
      return;
    }

    const startedAt = activeSinceRef.current ?? Date.now();
    const remaining = Math.max(0, minMs - (Date.now() - startedAt));
    const timeoutId = window.setTimeout(() => {
      activeSinceRef.current = null;
      setVisible(false);
    }, remaining);

    return () => window.clearTimeout(timeoutId);
  }, [active, minMs, visible]);

  return visible;
}
