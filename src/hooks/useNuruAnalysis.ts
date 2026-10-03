import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  createLatestAnalyzer,
  type NuruAnalysis,
  type NuruRequest,
} from '@/lib/nuru/aiClient';
import { analyzeLocally } from '@/lib/nuru/localAnalysis';

type Status = 'idle' | 'checking' | 'ready' | 'failed';

/** Where the completed analysis ran: the AI gateway, or on-device rules. */
export type AnalysisSource = 'server' | 'local';

/**
 * Runs the privacy, safety and routing check. The server-side analysis is
 * tried first; when the gateway is unreachable (e.g. a static deployment),
 * the same exported rules run on-device so categorization still works.
 *
 * A stale result must never look like a fresh one, so the result is cleared
 * the moment the text changes. Callers invalidate on every edit.
 */
export function useNuruAnalysis() {
  const analyzer = useMemo(() => createLatestAnalyzer(), []);

  const [status, setStatus] = useState<Status>('idle');
  const [analysis, setAnalysis] = useState<NuruAnalysis | null>(null);
  const [source, setSource] = useState<AnalysisSource | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Abort any in-flight request when the component unmounts.
  useEffect(() => () => analyzer.invalidate(), [analyzer]);

  const invalidate = useCallback(() => {
    analyzer.invalidate();
    setStatus('idle');
    setAnalysis(null);
    setSource(null);
    setError(null);
  }, [analyzer]);

  const analyze = useCallback(
    async (payload: NuruRequest) => {
      analyzer.invalidate();
      setAnalysis(null);
      setSource(null);
      setError(null);
      setStatus('checking');

      try {
        const result = await analyzer.analyze(payload);

        // null means a newer request superseded this one. Leave the state
        // alone; the newer call owns it.
        if (result === null) return;

        setAnalysis(result);
        setSource('server');
        setStatus('ready');
      } catch {
        // Gateway unreachable — run the same exported rules on-device.
        try {
          const local = analyzeLocally(payload);
          setAnalysis(local);
          setSource('local');
          setStatus('ready');
        } catch {
          setError('The privacy check could not complete. Nothing has been published.');
          setStatus('failed');
        }
      }
    },
    [analyzer],
  );

  return { status, analysis, source, error, analyze, invalidate };
}
