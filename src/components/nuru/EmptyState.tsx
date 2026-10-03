import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { LottiePlayer } from '@/components/nuru/LottiePlayer';
import emptyBoxAnimation from '@/assets/lottie/empty-box.json';

export function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-10 px-8 text-center space-y-4">
        <LottiePlayer animationData={emptyBoxAnimation} className="mx-auto size-28" />
        <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">{message}</p>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
}

export function QuestionCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
