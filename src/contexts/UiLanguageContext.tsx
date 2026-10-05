import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UI_LANGS, UI_STRINGS, type UiKey, type UiLang } from '@/lib/nuru/i18n';

interface UiLanguageContextType {
  /** Active interface language. */
  lang: UiLang;
  setLang: (lang: UiLang) => void;
  /** Translate a UI string key into the active language. */
  t: (key: UiKey) => string;
}

const UiLanguageContext = createContext<UiLanguageContextType | undefined>(undefined);

/**
 * Interface language for the site chrome. Independent from the analysis
 * language chosen on the Ask page - a writer can keep the interface in
 * English while requesting Kiswahili analysis, or the reverse.
 *
 * The choice persists in localStorage and never leaves the device.
 */
export function UiLanguageProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage<string>('nuru:ui-lang', 'en');
  const lang: UiLang = (UI_LANGS as readonly string[]).includes(stored) ? (stored as UiLang) : 'en';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<UiLanguageContextType>(
    () => ({
      lang,
      setLang: setStored,
      t: (key) => UI_STRINGS[lang][key] ?? UI_STRINGS.en[key] ?? key,
    }),
    [lang, setStored],
  );

  return <UiLanguageContext.Provider value={value}>{children}</UiLanguageContext.Provider>;
}

export function useUiLanguage(): UiLanguageContextType {
  const ctx = useContext(UiLanguageContext);
  if (!ctx) throw new Error('useUiLanguage must be used within UiLanguageProvider');
  return ctx;
}
