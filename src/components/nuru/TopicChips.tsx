import { Link } from 'react-router-dom';

import { useUiLanguage } from '@/contexts/UiLanguageContext';
import { getTopic } from '@/lib/nuru/topics';
import { cn } from '@/lib/utils';

export function TopicChip({ slug, className }: { slug: string; className?: string }) {
  const { lang } = useUiLanguage();
  const topic = getTopic(slug);
  const label = lang === 'sw' ? (topic?.swahili ?? topic?.name ?? slug) : (topic?.name ?? slug);
  return (
    <Link
      to={`/topics/${slug}`}
      className={cn(
        'inline-flex items-center rounded-full border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground',
        'hover:bg-accent hover:text-accent-foreground hover:border-primary/30 transition-colors',
        className,
      )}
    >
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
