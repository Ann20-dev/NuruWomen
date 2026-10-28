import { PhoneCall, ShieldAlert, Siren } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { PhotoFigure } from '@/components/nuru/PhotoFigure';
import { QuickLeaveButton } from '@/components/nuru/QuickLeaveButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function SafetyPage() {
  useSeoMeta({
    title: 'Safety and crisis resources · NuruWomen',
    description: 'Calm, practical steps and where to get help. For emergencies, call your local emergency number first.',
  });

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 max-w-3xl space-y-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-destructive inline-flex items-center gap-1.5">
              <Siren className="size-4" /> Safety first
            </p>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">If you need help right now</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This site is for learning and community support. It is not an emergency service. If you or someone else is in
              danger, call your local emergency number first.
            </p>
          </div>
          <QuickLeaveButton />
        </div>

        <PhotoFigure
          src="/images/safety-people.jpg"
          alt="Women supporting each other in a safe, reassuring setting"
          width={400}
          height={300}
          className="shadow-sm mx-auto"
          rounded-xl
          cover
        />

        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-5 space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <PhoneCall className="size-4" /> Emergency numbers
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Kenya emergency: 999 or 112</li>
              <li>Police (Kenya): 999</li>
              <li>Ambulance (Kenya): 999 / 112</li>
            </ul>
            <p className="text-xs text-muted-foreground pt-1">
              Outside Kenya, use your country's emergency number. When in doubt, call the nearest hospital or clinic.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="font-semibold flex items-center gap-2">
              <ShieldAlert className="size-4 text-primary" /> Support lines (Kenya)
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground">Gender-based violence:</strong> GBV hotline 1195 (free, 24/7) and the
                national police GBV desk.
              </li>
              <li>
                <strong className="text-foreground">Mental health:</strong> Kenya Red Cross counselling line 1199, and
                Befrienders Kenya.
              </li>
              <li>
                <strong className="text-foreground">Sexual and reproductive health:</strong> nearest public hospital,
                community health worker, or a trusted clinic.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground pt-1">
              These numbers change. If one does not answer, try another or go in person. Your safety comes first.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="font-semibold">A few calm steps</p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Move to a safe place if you can.</li>
              <li>Call an emergency or support number above.</li>
              <li>Tell one trusted person where you are.</li>
              <li>Do not wait for an online reply if you feel unsafe.</li>
            </ol>
            <p className="text-xs text-muted-foreground pt-1">
              Community stories here are real, but they cannot replace urgent care.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/privacy">How your privacy works</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/ask">Ask a question</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
