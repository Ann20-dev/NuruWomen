import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, GitBranch } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t bg-card mt-24">
      <div className="container py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="size-8 rounded-lg" />
            <span className="font-display font-semibold text-lg">NuruWomen</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            An open, privacy-first women’s health commons for Africa. Anonymous questions,
            real stories and reviewed evidence — clearly separated, always.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 shrink-0" />
            Educational only — never a substitute for personal medical care. In an emergency call 999 / 112 (Kenya).
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground transition-colors" to="/ask">Ask a question</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/questions">Community questions</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/library">Knowledge library</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/blind-spots">Research coverage</Link></li>
            <li><Link className="hover:text-foreground transition-colors" to="/about">How it works</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Open by design</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <GitBranch className="size-3.5" /> Open documentation for developers
            </li>
            <li>Articles exportable as Markdown</li>
            <li className="flex items-center gap-1.5">
              <HeartHandshake className="size-3.5" /> Built for Hack4Freedom
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>NuruWomen — a digital public good for women’s health.</span>

        </div>
      </div>
    </footer>
  );
}
