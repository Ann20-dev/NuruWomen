import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Anchor navigation: the target may render a tick later on lazy routes.
    const id = hash.slice(1);
    let attempts = 0;
    const jump = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
      } else if (attempts++ < 20) {
        setTimeout(jump, 50);
      }
    };
    jump();
  }, [pathname, hash]);

  return null;
}
