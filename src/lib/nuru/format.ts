export function timeAgo(timestamp: number): string {
  const seconds = Math.max(1, Math.floor(Date.now() / 1000) - timestamp);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-KE');
}

/** "Tue, 10 Nov 2026" (locale-aware: "Jtt, 10 Nov 2026" in Kiswahili) */
export function formatEventDate(timestamp: number, locale = 'en-KE'): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(timestamp * 1000));
}

/** "9:00 AM" (locale-aware) */
export function formatEventTime(timestamp: number, locale = 'en-KE'): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp * 1000));
}

/** "10" / "Nov" — compact date-block parts for event cards. */
export function formatEventDay(timestamp: number, locale = 'en-KE'): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(new Date(timestamp * 1000));
}

export function formatEventMonthShort(timestamp: number, locale = 'en-KE'): string {
  return new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(timestamp * 1000));
}

/** Grouping key "2026-11" for month sections. */
export function eventMonthKey(timestamp: number): string {
  const d = new Date(timestamp * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/** "November 2026" from an eventMonthKey (locale-aware). */
export function formatEventMonth(monthKey: string, locale = 'en-KE'): string {
  const [year, month] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  );
}

/** "November 2026" for right now — used by the monthly trending ranking. */
export function currentMonthLabel(locale = 'en-KE'): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date());
}
