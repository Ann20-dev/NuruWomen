import { useMutation } from '@tanstack/react-query';
import { finalizeEvent, generateSecretKey } from 'nostr-tools';

import { useAppContext } from '@/hooks/useAppContext';
import type { PreparedImage } from '@/lib/nuru/images';

export interface UploadedImage {
  url: string;
  sha256: string;
  mime: string;
  size: number;
}

const DEFAULT_BLOSSOM_SERVERS = ['https://blossom.ditto.pub/'];

function serversFromConfig(config: {
  blossomServerMetadata?: { servers: string[] };
  useAppBlossomServers?: boolean;
}): string[] {
  const servers = config.useAppBlossomServers === false ? [] : (config.blossomServerMetadata?.servers ?? []);
  return servers.length > 0 ? servers : DEFAULT_BLOSSOM_SERVERS;
}

/**
 * Uploads a prepared (metadata-stripped, hashed) image to a Blossom media
 * server (BUD-01/02). The authorization event is signed with a fresh one-time
 * keypair that is discarded immediately - uploading never reveals an
 * identity, matching the anonymous-question model.
 *
 * Each server is tried in order until one accepts the upload.
 */
export function useNuruImageUpload() {
  const { config } = useAppContext();

  return useMutation({
    mutationFn: async (image: PreparedImage): Promise<UploadedImage> => {
      const auth = finalizeEvent(
        {
          kind: 24242,
          content: 'Attach a non-graphic image to an anonymous NuruWomen question',
          tags: [
            ['t', 'upload'],
            ['expiration', String(Math.floor(Date.now() / 1000) + 600)],
            ['x', image.sha256],
          ],
          created_at: Math.floor(Date.now() / 1000),
        },
        generateSecretKey(),
      );

      // Unicode-safe base64 for the authorization event.
      const authB64 = btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(auth))));

      const errors: string[] = [];
      for (const server of serversFromConfig(config)) {
        try {
          const res = await fetch(new URL('/upload', server).href, {
            method: 'PUT',
            headers: {
              Authorization: `Nostr ${authB64}`,
              'Content-Type': image.mime,
            },
            body: image.blob,
          });
          if (!res.ok) {
            errors.push(`${server}: HTTP ${res.status}`);
            continue;
          }
          const descriptor = (await res.json()) as { url?: string; sha256?: string };
          if (!descriptor.url || !descriptor.url.startsWith('https://')) {
            errors.push(`${server}: invalid response`);
            continue;
          }
          return {
            url: descriptor.url,
            sha256: descriptor.sha256 ?? image.sha256,
            mime: image.mime,
            size: image.size,
          };
        } catch (err) {
          errors.push(`${server}: ${err instanceof Error ? err.message : 'network error'}`);
        }
      }
      throw new Error(`Image upload failed on all servers (${errors.join('; ') || 'no servers configured'}).`);
    },
  });
}
