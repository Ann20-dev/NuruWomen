import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  CircleDollarSign,
  Clock,
  ExternalLink,
  Languages,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  Rss,
  Sparkles,
  Users,
} from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { EmptyState } from '@/components/nuru/EmptyState';
import { Reveal } from '@/components/nuru/Reveal';
import { TopicChips } from '@/components/nuru/TopicChips';
import { EventsArt } from '@/components/nuru/art/EventsArt';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNuruEvents } from '@/hooks/useNuruEvents';
import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { uiLocale, type UiKey } from '@/lib/nuru/i18n';
import {
  eventMonthKey,
  formatEventDate,
  formatEventDay,
  formatEventMonth,
  formatEventMonthShort,
  formatEventTime,
} from '@/lib/nuru/format';
import { sanitizeUrl, cn } from '@/lib/utils';
import type { HealthEvent, HealthEventType } from '@/lib/nuru/types';

const TYPE_STYLES: Record<HealthEventType, { badge: string; date: string; labelKey: UiKey }> = {
  screening: { badge: 'bg-clinical-soft text-clinical border-clinical/40', date: 'bg-clinical text-clinical-foreground', labelKey: 'events.type.screening' },
  webinar: { badge: 'bg-plum-soft text-plum border-plum/40', date: 'bg-plum text-plum-foreground', labelKey: 'events.type.webinar' },
  community: { badge: 'bg-clay-soft text-clay border-clay/40', date: 'bg-clay text-clay-foreground', labelKey: 'events.type.community' },
  training: { badge: 'bg-gold-soft text-gold border-gold/40', date: 'bg-gold text-white', labelKey: 'events.type.training' },
  awareness: { badge: 'bg-accent text-accent-foreground border-primary/40', date: 'bg-primary text-primary-foreground', labelKey: 'events.type.awareness' },
};

const TYPE_FILTERS: (HealthEventType | 'all')[] = ['all', 'screening', 'webinar', 'community', 'training', 'awareness'];

function EventCard({ event }: { event: HealthEvent }) {
  const { t, lang } = useUiLanguage();
  const locale = uiLocale(lang);
  const styles = TYPE_STYLES[event.type];
  const link = event.link ? sanitizeUrl(event.link) : undefined;

  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/25">
      <CardContent className="p-5 flex gap-4 sm:gap-5">
        {/* Date block */}
        <div
          aria-hidden
          className={cn(
            'flex flex-col items-center justify-center self-start rounded-xl px-3 py-2 min-w-16 shadow-sm',
            styles.date,
          )}
        >
          <span className="font-display font-bold text-2xl leading-none">{formatEventDay(event.startsAt, locale)}</span>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] mt-1">{formatEventMonthShort(event.startsAt, locale)}</span>
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="font-display font-semibold text-lg leading-snug">{event.title}</h3>
            <span className={cn('shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold', styles.badge)}>
              {t(styles.labelKey)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{event.summary}</p>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
              <span>
                <span className="sr-only">Date and time: </span>
                {formatEventDate(event.startsAt, locale)} · {formatEventTime(event.startsAt, locale)}
                {event.endsAt ? ` – ${formatEventTime(event.endsAt, locale)}` : ''}
              </span>
            </p>
            <p className="flex items-center gap-2">
              {event.isOnline ? (
                <MonitorSmartphone className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
              ) : (
                <MapPin className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
              )}
              <span>{event.location}</span>
            </p>
            <p className="flex items-center gap-2">
              <CircleDollarSign className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
              <span>{event.cost}</span>
            </p>
            {event.languages.length > 0 && (
              <p className="flex items-center gap-2">
                <Languages className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
                <span>{event.languages.join(' · ')}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap pt-0.5">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 min-w-0">
              <Users className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{event.organizer}</span>
              {!event.isSeed && (
                <span className="inline-flex items-center gap-1 rounded-full bg-clinical-soft text-clinical px-2 py-0.5 text-[0.66rem] font-semibold">
                  <span className="size-1.5 rounded-full bg-clinical" /> Live
                </span>
              )}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <TopicChips slugs={event.topics} />
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-card px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-accent"
                >
                  {t('events.details')} <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  useSeoMeta({
    title: 'Events — NuruWomen',
    description:
      'Screenings, webinars, support circles and trainings on women’s health across Africa — gathered by the community, free to attend.',
  });

  const { t, lang } = useUiLanguage();
  const locale = uiLocale(lang);
  const { data: events, isLoading } = useNuruEvents();
  const [type, setType] = useState<HealthEventType | 'all'>('all');

  const filtered = useMemo(
    () => (events ?? []).filter((e) => type === 'all' || e.type === type),
    [events, type],
  );

  const months = useMemo(() => {
    const groups = new Map<string, HealthEvent[]>();
    for (const e of filtered) {
      const key = eventMonthKey(e.startsAt);
      const list = groups.get(key) ?? [];
      list.push(e);
      groups.set(key, list);
    }
    return [...groups.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  }, [filtered]);

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" /> {t('events.kicker')}
          </p>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
            {t('events.title')}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('events.subtitle')}
          </p>
        </div>

        <EventsArt className="w-full max-w-3xl rounded-xl border" />

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by event type">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setType(f)}
              aria-pressed={type === f}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                type === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/60 hover:bg-accent',
              )}
            >
              {f === 'all' ? t('events.all') : t(TYPE_STYLES[f].labelKey)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : months.length === 0 ? (
          <EmptyState message={t('events.empty')} />
        ) : (
          <div className="space-y-12">
            {months.map(([key, list]) => (
              <section key={key} className="space-y-4">
                <h2 className="font-display font-semibold text-2xl border-b pb-2 flex items-baseline gap-3">
                  {formatEventMonth(key, locale)}
                  <span className="text-sm font-sans font-normal text-muted-foreground">
                    {list.length} {list.length === 1 ? t('events.countSingular') : t('events.countWord')}
                  </span>
                </h2>
                <div className="space-y-4">
                  {list.map((e, i) => (
                    <Reveal key={e.id} delay={Math.min(i * 80, 320)}>
                      <EventCard event={e} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* How events get listed */}
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <Card className="border-gold/40 bg-gold-soft/50">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <h2 className="font-display font-semibold text-xl flex items-center gap-2">
                <Megaphone className="size-5 text-gold" /> {t('events.hostTitle')}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('events.hostBody1')}{' '}
                <code className="rounded bg-background px-1.5 py-0.5 text-xs">nuru-commons</code>{' '}
                {t('events.hostBody2')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 sm:p-6 space-y-3">
              <h2 className="font-display font-semibold text-xl flex items-center gap-2">
                <Sparkles className="size-5 text-primary" /> {t('events.beforeTitle')}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('events.beforeBody')}{' '}
                <Link to="/ask" className="text-primary font-medium hover:underline">{t('events.beforeLink')}</Link>.
              </p>
              <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                <Rss className="size-3.5" /> {t('events.beforeNote')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
