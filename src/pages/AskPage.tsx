import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Loader2, ScanSearch, Send, Sparkles } from 'lucide-react';
import { useSeoMeta } from '@unhead/react';

import { SiteLayout } from '@/components/nuru/SiteLayout';
import { SafetyBanner } from '@/components/nuru/SafetyBanner';
import { PrivacyCheckPanel } from '@/components/nuru/PrivacyCheckPanel';
import { AiCheckPanel } from '@/components/nuru/AiCheckPanel';
import { ImageAttachment } from '@/components/nuru/ImageAttachment';
import { SimilarQuestions } from '@/components/nuru/SimilarQuestions';
import { useNuruAnalysis } from '@/hooks/useNuruAnalysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { useNuruPublish } from '@/hooks/useNuruPublish';
import { useNuruQuestions } from '@/hooks/useNuruQuestions';
import type { UploadedImage } from '@/hooks/useNuruImageUpload';
import { countSimilarQuestions, findSimilarQuestions } from '@/lib/nuru/similar';
import { scanForPii, redactPii, type PiiFinding } from '@/lib/nuru/privacy';
import { scanSafety, type SafetyFlag } from '@/lib/nuru/safety';
import { classifyTopics } from '@/lib/nuru/classify';
import { TOPICS } from '@/lib/nuru/topics';
import { detectKiswahili } from '@/lib/nuru/language';
import { retrieveForText } from '@/lib/nuru/retrieve';
import { AskArt } from '@/components/nuru/art/AskArt';
import { RelatedReading } from '@/components/nuru/RelatedReading';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';

/** Matches the content limit in ai/app/schemas.py and server/src/schemas/aiRequests.ts. */
const BODY_MAX_CODEPOINTS = 2879;

export default function AskPage() {
  useSeoMeta({
    title: 'Ask anonymously · NuruWomen',
    description: 'Ask a sensitive women’s health question without an account, email or phone number. Identifying details are removed before anything is published.',
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { askQuestion } = useNuruPublish();
  const { data: allQuestions } = useNuruQuestions();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [checked, setChecked] = useState(false);
  const [findings, setFindings] = useState<PiiFinding[]>([]);
  const [safety, setSafety] = useState<SafetyFlag[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);
  const [responseLanguage, setResponseLanguage] = useState<'en' | 'sw'>('en');
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [imageBusy, setImageBusy] = useState(false);
  const { status: aiStatus, analysis, source: aiSource, error: aiError, analyze, invalidate } = useNuruAnalysis();

  // Python's len() counts codepoints; .length counts UTF-16 units and would
  // over-count emoji and some scripts.
  const bodyLength = Array.from(content).length;

  const suggestions = useMemo(() => classifyTopics(`${title} ${content}`), [title, content]);

  // Related reading retrieved live from the same classification cues.
  const retrieval = useMemo(
    () => retrieveForText(`${title} ${content}`),
    [title, content],
  );

  // Live "similar questions" matching - on-device, against the questions
  // already loaded for the commons. Uses the writer's current topic
  // selection, which sharpens as they accept/edit suggestions.
  const similar = useMemo(() => {
    if (!allQuestions || (title.trim().length < 8 && selectedTopics.length === 0)) {
      return { matches: [], count: 0 };
    }
    const target = { title, content, topics: selectedTopics };
    return {
      matches: findSimilarQuestions(target, allQuestions, { limit: 3 }),
      count: countSimilarQuestions(target, allQuestions),
    };
  }, [title, content, selectedTopics, allQuestions]);

  // Kiswahili cue detection preselects the analysis language; a manual
  // toggle always wins.
  const detectedLanguage = useMemo(
    () => detectKiswahili(`${title} ${content}`),
    [title, content],
  );
  const [languageTouched, setLanguageTouched] = useState(false);
  useEffect(() => {
    if (!languageTouched && detectedLanguage !== responseLanguage) {
      setResponseLanguage(detectedLanguage);
    }
  }, [detectedLanguage, languageTouched, responseLanguage]);

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
      setSafety(scanSafety(text, responseLanguage));
      setChecked(true);
    }, 600);
    return () => clearTimeout(t);
  }, [title, content, responseLanguage]);

  // Auto-tag every suggested topic (up to 4) until the writer edits the
  // selection manually (render-time state adjustment, see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  const [prevSuggestions, setPrevSuggestions] = useState(suggestions);
  if (prevSuggestions !== suggestions) {
    setPrevSuggestions(suggestions);
    if (selectedTopics.length === 0 && suggestions.length > 0) {
      setSelectedTopics(suggestions.map((s) => s.topic.slug).slice(0, 4));
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
    toast({ title: 'Redacted version applied', description: 'Identifying details were replaced with [removed]. Review it before posting.' });
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

  // Local pattern scan is the baseline gate; the server check, when it runs
  // and flags identifiers, blocks publishing until they are removed.
  const aiIdentifiers = analysis
    ? analysis.privacy.title.contains_detected_identifiers ||
      analysis.privacy.content.contains_detected_identifiers
    : false;

  const canPublish =
    title.trim().length >= 8 &&
    content.trim().length >= 20 &&
    selectedTopics.length > 0 &&
    checked &&
    findings.length === 0 &&
    !aiIdentifiers &&
    privacyConfirmed &&
    !imageBusy &&
    !askQuestion.isPending;

  const publish = async () => {
    if (!canPublish) return;
    try {
      const event = await askQuestion.mutateAsync({
        title: DOMPurify.sanitize(title.trim()),
        content: DOMPurify.sanitize(content.trim()),
        topics: selectedTopics,
        anonymous: true,
        image: image ?? undefined,
      });
      toast({
        title: 'Question published',
        description: 'It’s live and anonymous. Public posts can’t be taken back.',
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
                Ask a health question
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                No account, email or phone number needed. We'll check your question for privacy and topics in English or Kiswahili before it goes live.
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
              <Label htmlFor="q-body" className="text-sm font-semibold">Describe the question</Label>
              <Textarea
                id="q-body"
                value={content}
                onChange={(e) => { setContent(e.target.value); invalidate(); }}
                placeholder="Do not enter real names, health records, phone numbers or locations."
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

            <ImageAttachment onChange={setImage} onStatusChange={(s) => setImageBusy(s === 'busy')} />

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
                <div className="flex gap-1.5 items-center">
                  {(['en', 'sw'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => { setLanguageTouched(true); setResponseLanguage(lang); invalidate(); }}
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
                  {detectedLanguage === 'sw' && responseLanguage === 'sw' && (
                    <span className="text-xs text-muted-foreground">Kiswahili detected</span>
                  )}
                </div>
              </div>

              <AiCheckPanel
                status={aiStatus}
                analysis={analysis}
                source={aiSource}
                error={aiError}
                onApplySuggestion={applyAiSuggestion}
              />
            </div>

            {/* Topic classification */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <Label className="text-sm font-semibold">Topics: suggested for you, tap to change</Label>
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

            <SimilarQuestions matches={similar.matches} count={similar.count} />

            <RelatedReading retrieval={retrieval} />

            <Card>
              <CardContent className="p-5 space-y-2">
                <p className="flex items-center gap-2 font-semibold text-sm"><Fingerprint className="size-4 text-primary" /> No account needed</p>
                <p className="text-sm text-muted-foreground">Your question is published anonymously. Nothing links it back to you, no email, no account, no trace.</p>
              </CardContent>
            </Card>

            <label className="flex gap-3 items-start text-sm">
              <input type="checkbox" checked={privacyConfirmed} onChange={e => setPrivacyConfirmed(e.target.checked)} className="mt-1" />
              I confirm this question contains no names, phone numbers or other identifying details.
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <Button onClick={publish} disabled={!canPublish} size="lg" className="rounded-full px-7">
                {askQuestion.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Publish question
              </Button>
              {!checked && (
                <span className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
                  <ScanSearch className="size-4" /> Privacy scan runs as you write
                </span>
              )}
            </div>
          </div>

          {/* Side rail: what happens next */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <AskArt className="mx-auto w-44 sm:w-52" />
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-display font-semibold text-lg">What happens to your question</h2>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  {[
                    ['Privacy check', 'We scan for names, numbers and places, and help you remove them.'],
                    ['Safety check', 'If your words suggest something urgent, we point you to care first.'],
                    ['Published anonymously', 'Your question goes live with no identity attached. Public posts can\'t be taken back.'],
                    ['Three layers, always separate', 'Stories, clinical answers and evidence never blur together.'],
                    ['Never counted', 'Your question is never used for statistics.'],
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
                <h2 className="font-semibold text-sm">Keep in mind</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Published questions are public and permanent. In an emergency, call 999 / 112 first. Community answers come second.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
