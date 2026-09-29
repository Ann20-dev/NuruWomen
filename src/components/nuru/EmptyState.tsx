import { Card, CardContent } from '@/components/ui/card';

export function EmptyState({ message }: { message: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-12 px-8 text-center">
        <p className="text-muted-foreground max-w-sm mx-auto">{message}</p>
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
