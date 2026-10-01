/**
 * Strips EXIF metadata (GPS location, device info) from uploaded images using HTML5 Canvas
 */
export const stripImageMetadata = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Image processing failed'));
        }, file.type);
      }
    };
    img.onerror = (err) => reject(err);
  });
};