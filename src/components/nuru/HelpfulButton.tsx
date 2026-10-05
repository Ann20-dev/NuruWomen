import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNuruPublish } from '@/hooks/useNuruPublish';
import { cn } from '@/lib/utils';

interface HelpfulButtonProps {
  targetId: string;
  targetPubkey: string;
  targetKind: number;
  questionId: string;
  count: number;
}

/**
 * Reputation, not likes: a "Helpful" vote is a kind-7 reaction.
 * Votes are deduped locally so one visitor inflates the count once at most.
 */
export function HelpfulButton({ targetId, targetPubkey, targetKind, questionId, count }: HelpfulButtonProps) {
  const { user } = useCurrentUser();
  const { markHelpful } = useNuruPublish();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  const voted = votedIds.includes(targetId);

  const onVote = async () => {
    if (voted || pending) return;
    setPending(true);
    try {
      await markHelpful.mutateAsync({
        targetId,
        targetPubkey,
        targetKind,
        anonymous: !user,
      });
      setVotedIds([...votedIds, targetId]);
      queryClient.invalidateQueries({ queryKey: ['nuru-answers', questionId] });
      toast({ title: 'Marked as helpful', description: 'Asante. Your feedback guides other readers.' });
    } catch {
      toast({ title: 'Could not publish vote', description: 'Check your connection and try again.', variant: 'destructive' });
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onVote}
      disabled={voted || pending}
      className={cn(
        'rounded-full gap-1.5',
        voted && 'bg-clinical-soft text-clinical border-clinical/30',
      )}
      aria-pressed={voted}
    >
      <ThumbsUp className={cn('size-3.5', voted && 'fill-current')} />
      {voted ? 'Helpful ✓' : 'Helpful'}
      <span className="tabular-nums text-muted-foreground">{count}</span>
    </Button>
  );
}
