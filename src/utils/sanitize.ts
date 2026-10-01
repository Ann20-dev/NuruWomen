import DOMPurify from 'dompurify';

/**
 * Strips HTML and script tags from text inputs to prevent XSS attacks
 */
export const sanitizeText = (dirtyInput: string): string => {
  return DOMPurify.sanitize(dirtyInput, { ALLOWED_TAGS: [] });
};