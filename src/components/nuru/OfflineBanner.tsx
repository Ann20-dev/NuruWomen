import { useEffect, useState } from 'react';

import { OfflineArt } from '@/components/nuru/art/OfflineArt';

export function OfflineBanner() {
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 justify-center bg-warning/90 text-warning-foreground text-sm px-4 py-2.5 rounded-xl shadow-soft"
    >
      <OfflineArt className="size-6" />
      <span>
        You appear to be offline. Some content may not load until you reconnect.
      </span>
    </div>
  );
}
