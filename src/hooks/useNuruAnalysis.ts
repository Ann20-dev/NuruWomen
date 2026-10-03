import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  createLatestAnalyzer,
  type NuruAnalysis,
  type NuruRequest,
} from '@/lib/nuru/aiClient';

type Status = 'idle' | 'checking' | 'ready' | 'failed';

/**
 * Runs the server-side privacy and safety check.
 *
 * A failed or stale check must never look like a passed one, so the result
 * is cleared the moment the text changes. Callers invalidate on every edit.
 */
export function useNuruAnalysis() {
  const analyzer = useMemo(() => createLatestAnalyzer(), []);

  const [status, setStatus] = useState<Status>('idle');
  const [analysis, setAnalysis] = useState<NuruAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Abort any in-flight request when the component unmounts.
  useEffect(() => () => analyzer.invalidate(), [analyzer]);

  const invalidate = useCallback(() => {
    analyzer.invalidate();
    setStatus('idle');
    setAnalysis(null);
    setError(null);
  }, [analyzer]);

  const analyze = useCallback(
    async (payload: NuruRequest) => {
      analyzer.invalidate();
      setAnalysis(null);
      setError(null);
      setStatus('checking');

      try {
        const result = await analyzer.analyze(payload);

        // null means a newer request superseded this one. Leave the state
        // alone; the newer call owns it.
        if (result === null) return;

        setAnalysis(result);
        setStatus('ready');
      } catch {
        setError('The privacy check could not complete. Nothing has been published.');
        setStatus('failed');
      }
    },
    [analyzer],
  );

  return { status, analysis, error, analyze, invalidate };
}