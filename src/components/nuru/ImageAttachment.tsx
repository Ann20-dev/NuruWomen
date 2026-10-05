import { useRef, useState } from 'react';
import { ImagePlus, Loader2, ShieldCheck, TriangleAlert, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useNuruImageUpload, type UploadedImage } from '@/hooks/useNuruImageUpload';
import { isAcceptedImage, prepareImage, type PreparedImage } from '@/lib/nuru/images';
import { cn } from '@/lib/utils';

export type AttachmentStatus = 'idle' | 'busy' | 'ready' | 'error';

interface ImageAttachmentProps {
  /** Uploaded image descriptor to include in the question event, or null. */
  onChange: (uploaded: UploadedImage | null) => void;
  onStatusChange?: (status: AttachmentStatus) => void;
}

/**
 * Optional image attachment for anonymous questions. The image is
 * re-encoded on-device first (stripping EXIF metadata like GPS and device
 * model), hashed, then uploaded to a Blossom server signed with a one-time
 * key - the same anonymity model as the question itself.
 */
export function ImageAttachment({ onChange, onStatusChange }: ImageAttachmentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useNuruImageUpload();
  const [prepared, setPrepared] = useState<PreparedImage | null>(null);
  const [status, setStatusState] = useState<AttachmentStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const setStatus = (s: AttachmentStatus) => {
    setStatusState(s);
    onStatusChange?.(s);
  };

  const reset = () => {
    if (prepared) URL.revokeObjectURL(prepared.previewUrl);
    setPrepared(null);
    setError(null);
    setStatus('idle');
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    if (!isAcceptedImage(file)) {
      setError('Only JPEG, PNG or WebP images can be attached.');
      setStatus('error');
      return;
    }
    let prep: PreparedImage | null = null;
    try {
      setStatus('busy');
      prep = await prepareImage(file);
      setPrepared(prep);
      const uploaded = await upload.mutateAsync(prep);
      onChange(uploaded);
      setStatus('ready');
    } catch (err) {
      if (prep) URL.revokeObjectURL(prep.previewUrl);
      setPrepared(null);
      setError(err instanceof Error ? err.message : 'Could not attach the image. Try again.');
      setStatus('error');
      onChange(null);
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Attach a non-graphic image"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      {!prepared ? (
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full bg-card"
            onClick={() => inputRef.current?.click()}
            disabled={status === 'busy'}
          >
            {status === 'busy' ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            Add a non-graphic image (optional)
          </Button>
          <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
            <ShieldCheck className="size-3.5 shrink-0 mt-0.5 text-clinical" />
            Photos are stripped of hidden metadata (location, device) before upload. Never attach
            medical records, faces, or anything that could identify you.
          </p>
          {error && (
            <p role="alert" className="text-xs text-destructive flex items-start gap-1.5">
              <TriangleAlert className="size-3.5 shrink-0 mt-0.5" /> {error}
            </p>
          )}
        </div>
      ) : (
        <figure
          className={cn(
            'relative w-fit max-w-full overflow-hidden rounded-xl border bg-card',
            status === 'busy' && 'opacity-80',
          )}
        >
          <img
            src={prepared.previewUrl}
            alt="Preview of the attached image"
            className="max-h-56 w-auto object-contain"
          />
          <figcaption className="flex items-center justify-between gap-3 px-3 py-2 text-xs text-muted-foreground border-t">
            {status === 'busy' ? (
              <span className="inline-flex items-center gap-1.5">
                <Loader2 className="size-3.5 animate-spin" /> Removing metadata &amp; uploading…
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-clinical">
                <ShieldCheck className="size-3.5" /> Metadata removed · attached anonymously
              </span>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove attached image"
            >
              <X className="size-3.5" /> Remove
            </button>
          </figcaption>
        </figure>
      )}
    </div>
  );
}
