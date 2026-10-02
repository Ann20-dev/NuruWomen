import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 15 minutes in milliseconds
const TIMEOUT_DURATION = 15 * 60 * 1000; 

export const useInactivityTimeout = () => {
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimeout = () => {
    // Clear temporary unsaved draft session data
    sessionStorage.removeItem('unsaved_question_draft');
    sessionStorage.removeItem('unsaved_post_draft');

    // Redirect to home page
    navigate('/');
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(handleTimeout, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Activity listeners to track user engagement
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    // Start initial timer
    resetTimer();

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup listeners on component unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);
};