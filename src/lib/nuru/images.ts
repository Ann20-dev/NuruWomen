/**
 * Privacy-first image preparation for question attachments.
 *
 * Every image is decoded and re-encoded through a canvas before it leaves the
 * device. This is not a nice-to-have: phone photos carry EXIF metadata —
 * GPS coordinates, device model, timestamps — that would silently deanonymize
 * the writer. A canvas re-encode guarantees none of that survives.
 */

export const IMAGE_MAX_INPUT_BYTES = 10 * 1024 * 1024; // 10 MB input ceiling
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.86;

const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export interface PreparedImage {
  blob: Blob;
  /** Lowercase hex sha256 of the re-encoded file (Blossom `x` value). */
  sha256: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  /** Object URL for local preview — revoke when the attachment is removed. */
  previewUrl: string;
}

export function isAcceptedImage(file: File): boolean {
  return ACCEPTED_TYPES.has(file.type);
}

async function toJpegBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not process the image.'))),
      'image/jpeg',
      JPEG_QUALITY,
    );
  });
}

async function sha256Hex(blob: Blob): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer());
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate, downscale and metadata-strip an image file, then hash it.
 * Everything is always re-encoded to JPEG (flattening any alpha) so the
 * output is predictable, compact and free of embedded metadata.
 */
export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!isAcceptedImage(file)) {
    throw new Error('Only JPEG, PNG or WebP images can be attached.');
  }
  if (file.size > IMAGE_MAX_INPUT_BYTES) {
    throw new Error('That image is larger than 10 MB. Please choose a smaller one.');
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Could not process the image on this device.');
  }
  // Flatten transparency onto white before JPEG encoding.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await toJpegBlob(canvas);
  const sha256 = await sha256Hex(blob);

  return {
    blob,
    sha256,
    mime: 'image/jpeg',
    size: blob.size,
    width,
    height,
    previewUrl: URL.createObjectURL(blob),
  };
}
