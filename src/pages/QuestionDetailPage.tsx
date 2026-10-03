import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheck, Loader2, Lock, MessagesSquare, Send, Stethoscope } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';
import { useQueryClient } from '@tanstack/react-query';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { AnswerCard } from '@/components/nuru/AnswerCard';
import { CommunitySignal } from '@/components/nuru/CommunitySignal';
import { EvidenceCardView } from '@/components/nuru/EvidenceCardView';
import { LayerBadge } from '@/components/nuru/LayerBadge';
import { TopicChips } from '@/components/nuru/TopicChips';
import { EmptyState } from '@/components/nuru/EmptyState';
import { AuthorLine } from '@/components/nuru/AuthorLine';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/useToast';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNuruQuestion } from '@/hooks/useNuruQuestions';
import { useNuruAnswers } from '@/hooks/useNuruAnswers';
import { useNuruPublish } from '@/hooks/useNuruPublish';
import { evidenceCardBySlug } from '@/data/evidenceCards';
import { ClinicianArt } from '@/components/nuru/art/ClinicianArt';
import { SafetyBanner } from '@/components/nuru/SafetyBanner';
import { RelatedReading } from '@/components/nuru/RelatedReading';
import { retrieveForTopics } from '@/lib/nuru/retrieve';
import { scanSafety, type SafetyFlag } from '@/lib/nuru/safety';
import { CLINICIAN_PUBKEYS } from '@/data/clinicians';
import { timeAgo } from '@/lib/nuru/format';
import NotFound from '@/pages/NotFound';

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: question, isLoading } = useNuruQuestion(id);
  const { data: answers } = useNuruAnswers(id);
  const { user } = useCurrentUser();
  const { postAnswer } = useNuruPublish();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [draft, setDraft] = useState('');
  const [draftSafety, setDraftSafety] = useState<SafetyFlag[]>([]);

  // Warn on red-flag wording before an answer is published.
  useEffect(() => {
    const t = setTimeout(() => {
      setDraftSafety(draft.trim().length >= 12 ? scanSafety(draft) : []);
    }, 600);
    return () => clearTimeout(t);
  }, [draft]);

  useSeoMeta({
    title: question ? `${question.title} — NuruWomen` : 'Question — NuruWomen',
    description: question?.content.slice(0, 150),
  });

  if (!isLoading && !question) return <NotFound />;

  const evidence = question?.evidenceCard ? evidenceCardBySlug(question.evidenceCard) : undefined;
  const isClinician = user ? CLINICIAN_PUBKEYS.has(user.pubkey) : false;

  const shareExperience = async () => {
    if (!question || draft.trim().length < 10) return;
    try {
      await postAnswer.mutateAsync({
        questionId: question.id,
        questionPubkey: question.authorPubkey,
        text: draft.trim(),
        type: 'lived-experience',
        topics: question.topics,
        anonymous: !user,
      });
      setDraft('');
      queryClient.invalidateQueries({ queryKey: ['nuru-answers', question.id] });
      toast({ title: 'Response published', description: 'Shared as lived experience — thank you.' });
    } catch {
      toast({ title: 'Could not publish', description: 'Check your connection and try again.', variant: 'destructive' });
    }
  };

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14">
        {isLoading || !question ? (
          <div className="space-y-4 max-w-3xl">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
            {/* Main thread */}
            <div className="space-y-8">
              {/* Question */}
              <div className="space-y-4">
                <Link to="/questions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← All questions
                </Link>
                <h1 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight leading-snug">
                  {question.title}
                </h1>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{question.content}</p>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <TopicChips slugs={question.topics} />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <AuthorLine pubkey={question.authorPubkey} name={question.authorName} createdAt={question.createdAt} />
                  </div>
                </div>
              </div>

              {question.signal && (
                <CommunitySignal similarCount={question.signal.similarCount} insight={question.signal.insight} />
              )}

              {/* Lived experience layer */}
              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-clay/25 pb-3">
                  <div className="space-y-1">
                    <LayerBadge layer="lived-experience" />
                    <p className="text-xs text-muted-foreground">
                      What women have lived through. Not medical advice — and never presented as such.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-clay tabular-nums">
                    {answers ? answers.livedExperience.length : '…'} {answers?.livedExperience.length === 1 ? 'story' : 'stories'}
                  </span>
                </div>

                {!answers ? (
                  <Skeleton className="h-32 w-full" />
                ) : answers.livedExperience.length === 0 ? (
                  <EmptyState message="No experiences shared yet. If you have lived something similar, your story could be the one that helps." />
                ) : (
                  <div className="space-y-4">
                    {answers.livedExperience.map((a) => (
                      <AnswerCard key={a.id} answer={a} questionId={question.id} helpfulCount={answers.helpfulCounts[a.id] ?? 0} />
                    ))}
                  </div>
                )}

                {/* Share experience composer */}
                <Card className="border-clay/35">
                  <CardContent className="p-5 space-y-3">
                    <h2 className="font-semibold text-sm flex items-center gap-2">
                      <MessagesSquare className="size-4 text-clay" />
                      Share your experience
                    </h2>
                    <Textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Write your response. Do not include real names, phone numbers or other identifying details."
                      rows={4}
                    />
                    <SafetyBanner flags={draftSafety} />
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-xs text-muted-foreground">
                          Shared as <strong>lived experience</strong> — never as medical advice.
                        </p>
                      <Button
                        onClick={shareExperience}
                        disabled={draft.trim().length < 10 || postAnswer.isPending}
                        className="rounded-full bg-clay text-clay-foreground hover:bg-clay/90"
                      >
                        {postAnswer.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                        Publish response
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Clinical layer */}
              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-clinical/25 pb-3">
                  <div className="space-y-1">
                    <LayerBadge layer="clinical-response" />
                    <p className="text-xs text-muted-foreground">
                      Clinical education reviewed by the panel — general education, not a personal consultation.
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-clinical tabular-nums">
                    {answers ? answers.clinical.length : '…'} {answers?.clinical.length === 1 ? 'response' : 'responses'}
                  </span>
                </div>

                {!answers ? (
                  <Skeleton className="h-32 w-full" />
                ) : answers.clinical.length === 0 ? (
                  <EmptyState message="No clinician has responded yet. Verified professionals volunteer their time — check back soon." />
                ) : (
                  <div className="space-y-4">
                    {answers.clinical.map((a) => (
                      <AnswerCard key={a.id} answer={a} questionId={question.id} helpfulCount={answers.helpfulCounts[a.id] ?? 0} />
                    ))}
                  </div>
                )}

                <Card className="border-clinical/30 bg-clinical-soft/40 overflow-hidden">
                  <ClinicianArt className="w-full aspect-[3/2] max-h-44 border-b border-clinical/20" />
                  <CardContent className="p-5 flex items-start gap-3">
                    {isClinician ? (
                      <>
                        <BadgeCheck className="size-5 text-clinical shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          This release has no verified clinical identities. Clinical responses you post are
                          automatically labelled and badged.
                        </p>
                      </>
                    ) : (
                      <>
                        <Lock className="size-5 text-clinical shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">Clinical answers come from verified health professionals.</strong>{' '}
                          Every clinician is checked against official registers before they can respond.{' '}
                          <Link to="/about#volunteer" className="text-clinical font-medium hover:underline">Volunteer as a clinician</Link>.
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Side rail: evidence + context */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              {evidence ? (
                <EvidenceCardView card={evidence} compact />
              ) : (
                <Card className="border-plum/30 bg-plum-soft/40">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Stethoscope className="size-5 text-plum shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      An evidence card for this topic is being prepared by the clinical review panel.
                    </p>
                  </CardContent>
                </Card>
              )}

              <RelatedReading retrieval={retrieveForTopics(question.topics)} />

              <Card>
                <CardContent className="p-5 space-y-2 text-sm text-muted-foreground">
                  <h2 className="font-semibold text-foreground">Reading this thread</h2>
                  <p><span className="font-semibold text-clay">Clay</span> = lived experience. Real stories, not advice.</p>
                  <p><span className="font-semibold text-clinical">Teal</span> = verified clinical education.</p>
                  <p><span className="font-semibold text-plum">Plum</span> = reviewed evidence with sources.</p>
                  <p className="pt-1 text-xs">Asked {timeAgo(question.createdAt)} · every answer is labelled, so the three layers never blur.</p>
                </CardContent>
              </Card>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
