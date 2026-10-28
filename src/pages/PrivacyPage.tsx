import { Fingerprint, KeyRound, ShieldCheck } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { PhotoFigure } from '@/components/nuru/PhotoFigure';
import { QuickLeaveButton } from '@/components/nuru/QuickLeaveButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  useSeoMeta({
    title: 'Privacy and anonymity · NuruWomen',
    description: 'Plain-language explanation of what NuruWomen stores, what is public, and how your anonymous identity works.',
  });

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14 max-w-3xl space-y-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4" /> Privacy
            </p>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">How your privacy works</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You can ask sensitive questions here without giving your name, email, or phone number. This page explains
              what that really means, in plain words.
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

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="font-semibold flex items-center gap-2">
              <Fingerprint className="size-4 text-primary" /> You are anonymous
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>We never ask for your name, email, phone number, or address.</li>
              <li>Your question is published without your identity attached.</li>
              <li>Nobody reading it can tell it came from you.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="font-semibold">What is public, and what is not</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground mb-1">Public (anyone can read)</p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Your question text (after you remove identifying details)</li>
                  <li>Answers and stories</li>
                  <li>Topic tags</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Never public</p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Your name, phone, email, address, ID numbers</li>
                  <li>Medical records or lab results</li>
                  <li>Detailed private history</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Once something is published to the public network it cannot be taken back. Think before you post.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="font-semibold flex items-center gap-2">
              <KeyRound className="size-4 text-primary" /> Your anonymous identity
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Behind the scenes, the app creates a random secret key on your device. Think of it as your anonymous
              identity card. It lets you post and vote without a password or account.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>
                <strong className="text-foreground">Keep it safe.</strong> If you clear your browser data or change device,
                that key is gone. Save a backup in a password manager or write it down somewhere safe.
              </li>
              <li>
                <strong className="text-foreground">Do not share it.</strong> Anyone with your key can post as you.
              </li>
              <li>
                <strong className="text-foreground">Losing it is not the end.</strong> You can still read everything and ask
                new questions with a new identity. Only your past posts stay tied to the old one.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground pt-1">
              We cannot recover your key for you. That is the trade-off for true anonymity.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="font-semibold">Before you post</p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>Remove names, places, dates, and numbers that could identify you or someone else.</li>
              <li>Do not attach medical records, faces, or documents.</li>
              <li>Use the privacy check on the ask page. It catches common patterns but can miss things, so read it once more.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/safety">Safety and crisis resources</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/ask">Ask a question</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
