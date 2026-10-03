import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint, KeyRound, Loader2, ScanSearch, Send, Sparkles } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { SafetyBanner } from '@/components/nuru/SafetyBanner';
import { PrivacyCheckPanel } from '@/components/nuru/PrivacyCheckPanel';
import { AiCheckPanel } from '@/components/nuru/AiCheckPanel';
import { useNuruAnalysis } from '@/hooks/useNuruAnalysis';
import { LottiePlayer } from '@/components/nuru/LottiePlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNuruPublish } from '@/hooks/useNuruPublish';
import { scanForPii, redactPii, type PiiFinding } from '@/lib/nuru/privacy';
import { scanSafety, type SafetyFlag } from '@/lib/nuru/safety';
import { classifyTopics } from '@/lib/nuru/classify';
import { TOPICS } from '@/lib/nuru/topics';
import { cn } from '@/lib/utils';
import shieldAnimation from '@/assets/lottie/shield.json';
import DOMPurify from 'dompurify';

/** Matches the content limit in ai/app/schemas.py and server/src/schemas/aiRequests.ts. */
const BODY_MAX_CODEPOINTS = 2879;

export default function AskPage() {
  useSeoMeta({
    title: 'Ask anonymously — Nuru Commons',
    description: 'Ask a sensitive women’s health question without an account, email or phone number. Identifying details are removed before anything is published.',
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useCurrentUser();
  const { askQuestion } = useNuruPublish();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [checked, setChecked] = useState(false);
  const [findings, setFindings] = useState<PiiFinding[]>([]);
  const [safety, setSafety] = useState<SafetyFlag[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [identity, setIdentity] = useState<'anonymous' | 'account'>('anonymous');
  const [responseLanguage, setResponseLanguage] = useState<'en' | 'sw'>('en');
  const { status: aiStatus, analysis, error: aiError, analyze, invalidate } = useNuruAnalysis();

  // Python's len() counts codepoints; .length counts UTF-16 units and would
  // over-count emoji and some scripts.
  const bodyLength = Array.from(content).length;

  const suggestions = useMemo(() => classifyTopics(`${title} ${content}`), [title, content]);

  // Debounced live scan
  useEffect(() => {
    const text = `${title}\n${content}`.trim();
    const t = setTimeout(() => {
      if (text.length < 12) {
        setChecked(false);
        setFindings([]);
        setSafety([]);
        return;
      }
      setFindings(scanForPii(text));
      setSafety(scanSafety(text));
      setChecked(true);
    }, 600);
    return () => clearTimeout(t);
  }, [title, content]);

  // Auto-select top suggested topic if none chosen (render-time state adjustment,
  // see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  const [prevSuggestions, setPrevSuggestions] = useState(suggestions);
  if (prevSuggestions !== suggestions) {
    setPrevSuggestions(suggestions);
    if (selectedTopics.length === 0 && suggestions.length > 0) {
      setSelectedTopics([suggestions[0].topic.slug]);
    }
  }

  const toggleTopic = (slug: string) => {
    setSelectedTopics((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : prev.length < 4 ? [...prev, slug] : prev,
    );
  };

  const applyRedaction = () => {
    setTitle((t) => redactPii(t, scanForPii(t)));
    setContent((c) => redactPii(c, scanForPii(c)));
    toast({ title: 'Anonymous version applied', description: 'Identifying details were replaced with [removed]. Review it before posting.' });
  };

  const runAiCheck = () => {
    void analyze({
      title: title.trim(),
      content: content.trim(),
      response_language: responseLanguage,
      synthetic_only: true,
      include_demo_cards: true,
    });
  };

  const applyAiSuggestion = (nextTitle: string, nextContent: string) => {
    setTitle(nextTitle);
    setContent(nextContent);
    invalidate();
    toast({
      title: 'Suggested version applied',
      description: 'Read it through, then run the check again before posting.',
    });
  };

  const canPublish =
    title.trim().length >= 8 &&
    content.trim().length >= 20 &&
    selectedTopics.length > 0 &&
    aiStatus === 'ready' &&
    !askQuestion.isPending;

  const publish = async () => {
    if (!canPublish) return;
    try {
      const event = await askQuestion.mutateAsync({
        title: DOMPurify.sanitize(title.trim()),
        content: DOMPurify.sanitize(content.trim()),
        topics: selectedTopics,
        anonymous: identity === 'anonymous' || !user,
      });
      toast({
        title: 'Question posted anonymously',
        description: 'Women with lived experience and verified professionals can now respond.',
      });
      navigate(`/question/${event.id}`);
    } catch {
      toast({
        title: 'Could not publish',
        description: 'Could not reach the network. Check your connection and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <SiteLayout>
      <div className="container py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
                Ask the question you’ve been carrying
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                No account. No email. No phone number. Before anything is published, we check your words for
                identifying details and help you remove them.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q-title" className="text-sm font-semibold">Your question in one line</Label>
              <Input
                id="q-title"
                value={title}
                onChange={(e) => { setTitle(e.target.value); invalidate(); }}
                placeholder="e.g. Is it normal for periods to be this painful?"
                maxLength={120}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="q-body" className="text-sm font-semibold">Tell it fully — we’ll protect it</Label>
              <Textarea
                id="q-body"
                value={content}
                onChange={(e) => { setContent(e.target.value); invalidate(); }}
                placeholder="Share as much as you need. If you accidentally include your name, estate, phone number or ID, we’ll catch it below before you post."
                rows={7}
                maxLength={BODY_MAX_CODEPOINTS}
                aria-describedby="q-body-count"
                className="text-base leading-relaxed"
              />
              <p
                id="q-body-count"
                className={cn(
                  'text-xs text-right tabular-nums',
                  bodyLength >= BODY_MAX_CODEPOINTS ? 'text-destructive' : 'text-muted-foreground',
                )}
              >
                {bodyLength} / {BODY_MAX_CODEPOINTS}
              </p>
            </div>

            <PrivacyCheckPanel findings={findings} checked={checked} onApplyRedaction={findings.length > 0 ? applyRedaction : undefined} />
            <SafetyBanner flags={safety} />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={runAiCheck}
                  disabled={aiStatus === 'checking' || title.trim().length < 8 || content.trim().length < 20}
                >
                  <ScanSearch className="size-4" />
                  Run privacy check
                </Button>
                <div className="flex gap-1.5">
                  {(['en', 'sw'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => { setResponseLanguage(lang); invalidate(); }}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        responseLanguage === lang
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary/60 hover:bg-accent',
                      )}
                    >
                      {lang === 'en' ? 'English' : 'Kiswahili'}
                    </button>
                  ))}
                </div>
              </div>

              <AiCheckPanel
                status={aiStatus}
                analysis={analysis}
                error={aiError}
                onApplySuggestion={applyAiSuggestion}
              />
            </div>

            {/* Topic classification */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <Label className="text-sm font-semibold">Topics — suggested automatically, you decide</Label>
              </div>
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map(({ topic }) => (
                    <button
                      key={topic.slug}
                      type="button"
                      onClick={() => toggleTopic(topic.slug)}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        selectedTopics.includes(topic.slug)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-gold-soft text-gold border-gold/40 hover:bg-gold/15',
                      )}
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {TOPICS.filter((t) => !suggestions.some((s) => s.topic.slug === t.slug)).map((topic) => (
                  <button
                    key={topic.slug}
                    type="button"
                    onClick={() => toggleTopic(topic.slug)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      selectedTopics.includes(topic.slug)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary/60 text-secondary-foreground hover:bg-accent',
                    )}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Identity choice */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <Label className="text-sm font-semibold">Publish as</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setIdentity('anonymous')}
                    className={cn(
                      'rounded-xl border p-4 text-left space-y-1.5 transition-colors',
                      identity === 'anonymous' ? 'border-primary bg-accent/60 ring-1 ring-primary/40' : 'hover:border-primary/30',
                    )}
                  >
                    <span className="flex items-center gap-2 font-semibold text-sm">
                      <Fingerprint className="size-4 text-primary" /> One-time anonymous identity
                    </span>
                    <span className="block text-xs text-muted-foreground leading-relaxed">
                      A throwaway identity is created for this question only. Nothing is saved, and nothing links back to you.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => user && setIdentity('account')}
                    disabled={!user}
                    className={cn(
                      'rounded-xl border p-4 text-left space-y-1.5 transition-colors',
                      identity === 'account' ? 'border-primary bg-accent/60 ring-1 ring-primary/40' : 'hover:border-primary/30',
                      !user && 'opacity-60 cursor-not-allowed',
                    )}
                  >
                    <span className="flex items-center gap-2 font-semibold text-sm">
                      <KeyRound className="size-4 text-primary" /> My saved identity
                    </span>
                    <span className="block text-xs text-muted-foreground leading-relaxed">
                      {user
                        ? 'Post with the identity you already use. Builds your reputation under a nickname, not your name.'
                        : 'Log in from the header to ask under your saved nickname.'}
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 flex-wrap">
              <Button onClick={publish} disabled={!canPublish} size="lg" className="rounded-full px-7">
                {askQuestion.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Post anonymously
              </Button>
              {!checked && (
                <span className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
                  <ScanSearch className="size-4" /> Privacy scan runs automatically as you write
                </span>
              )}
            </div>
          </div>

          {/* Side rail: what happens next */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <LottiePlayer
              animationData={shieldAnimation}
              className="mx-auto size-20"
              label="Privacy shield — your words are checked before anything is posted"
            />
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-display font-semibold text-lg">What happens to your question</h2>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  {[
                    ['Privacy check', 'Names, numbers, emails, IDs and locations are flagged before anything is posted — you remove them, not us.'],
                    ['Safety check', 'Red-flag symptoms get urgent-care guidance before community answers.'],
                    ['Posted openly', 'Your anonymized question goes to the open network. No account exists anywhere.'],
                    ['Three layers respond', 'Lived experience, verified clinicians, and an evidence card — each clearly labelled.'],
                    ['It becomes a signal', 'Your question is counted in aggregate Blind Spot statistics — never individually.'],
                  ].map(([title, body], i) => (
                    <li key={title} className="flex gap-3">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {i + 1}
                      </span>
                      <span><strong className="text-foreground">{title}.</strong> {body}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-destructive/25">
              <CardContent className="p-5 space-y-2">
                <h2 className="font-semibold text-sm">Honest limits</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Public posts stay public. Don’t include medical records or identifying details even
                  if our scan misses them. In an emergency, call 999 / 112 first — community answers come second.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Looking for evidence instead? <Link to="/library" className="text-primary font-medium hover:underline">Browse the library</Link> or
                  see <Link to="/blind-spots" className="text-primary font-medium hover:underline">what women ask most</Link>.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
