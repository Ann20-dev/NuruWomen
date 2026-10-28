import { Link } from 'react-router-dom';

import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { getTopic } from '@/lib/nuru/topics';
import { AREA_COLOR } from '@/lib/nuru/topicColors';
import { cn } from '@/lib/utils';
import { TopicIcon } from '@/components/nuru/icons/TopicIcon';

export { AREA_COLOR };

export function TopicChip({ slug, className }: { slug: string; className?: string }) {
  const { lang } = useUiLanguage();
  const topic = getTopic(slug);
  const label = lang === 'sw' ? (topic?.swahili ?? topic?.name ?? slug) : (topic?.name ?? slug);
  const areaColor = topic ? AREA_COLOR[topic.area] ?? 'text-primary' : 'text-primary';
  return (
    <Link
      to={`/topics/${slug}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border bg-secondary/60 px-3 py-1 text-xs font-medium',
        areaColor,
        'hover:bg-accent hover:text-accent-foreground hover:border-primary/30 transition-colors',
        className,
      )}
    >
      <TopicIcon slug={slug} size="sm" color="inherit" />
      {label}
    </Link>
  );
}

export function TopicChips({ slugs, className }: { slugs: string[]; className?: string }) {
  if (slugs.length === 0) return null;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {slugs.map((slug) => (
        <TopicChip key={slug} slug={slug} />
      ))}
    </div>
  );
}
