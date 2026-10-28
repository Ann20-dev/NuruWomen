import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { EmptyStateArt } from '@/components/nuru/art/EmptyStateArt';
import { SuccessArt } from '@/components/nuru/art/SuccessArt';

export function EmptyState({ message, action, illustration }: { message: string; action?: ReactNode; illustration?: ReactNode }) {
  return (
    <Card className="border-dashed rounded-2xl shadow-soft">
      <CardContent className="py-10 px-8 text-center space-y-4">
        {illustration ?? <EmptyStateArt className="mx-auto w-40 sm:w-48 float-slow" />}
        <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">{message}</p>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
}

export function QuestionCardSkeleton() {
  return (
    <Card className="rounded-xl shadow-card">
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

export function SuccessState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <Card className="border-success/30 bg-success/5 rounded-2xl shadow-soft">
      <CardContent className="py-10 px-8 text-center space-y-4">
        <SuccessArt className="mx-auto w-40 sm:w-48 glow-pulse" />
        <p className="text-success-foreground max-w-sm mx-auto font-medium leading-relaxed">
          {message}
        </p>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  );
}
