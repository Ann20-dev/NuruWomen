import { BadgeCheck, Fingerprint } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthor } from '@/hooks/useAuthor';
import { sanitizeUrl } from '@/lib/utils';
import { timeAgo } from '@/lib/nuru/format';
import { genUserName } from '@/lib/genUserName';

interface AuthorLineProps {
  pubkey: string;
  /** Seed pseudonym - used instead of a metadata lookup when present. */
  name?: string;
  role?: string;
  experienceTag?: string;
  createdAt?: number;
}

export function AuthorLine({ pubkey, name, role, experienceTag, createdAt }: AuthorLineProps) {
  const author = useAuthor(name ? undefined : pubkey);

  const metadata = author.data?.metadata;
  const displayName = name ?? metadata?.display_name ?? metadata?.name ?? genUserName(pubkey);
  const picture = sanitizeUrl(metadata?.picture);
  const verified = Boolean(role?.startsWith('Verified'));

  const initials = displayName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 min-w-0">
      <Avatar className="size-9 border">
        {picture && !name ? <AvatarImage src={picture} alt={displayName} /> : null}
        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-sm truncate">{displayName}</span>
          {verified ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-clinical">
              <BadgeCheck className="size-3.5" />
              {role}
            </span>
          ) : role ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-clay">
              {role}
            </span>
          ) : null}
          {!verified && !role && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Fingerprint className="size-3" />
              pseudonymous
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
          {experienceTag && <span>Lived experience: {experienceTag}</span>}
          {experienceTag && createdAt && <span aria-hidden>·</span>}
          {createdAt && <time>{timeAgo(createdAt)}</time>}
        </div>
      </div>
    </div>
  );
}
