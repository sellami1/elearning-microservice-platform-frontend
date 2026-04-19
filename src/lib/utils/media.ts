import { env } from "@/src/lib/config/env";

const COURSE_PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23e2e8f0'/%3E%3Cstop offset='100%25' stop-color='%23cbd5e1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='675' fill='url(%23g)'/%3E%3Cpath d='M240 472l171-171 129 129 181-181 239 239' fill='none' stroke='%2394a3b8' stroke-width='28' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='390' cy='230' r='54' fill='%2394a3b8'/%3E%3Ctext x='600' y='575' text-anchor='middle' font-family='Arial, sans-serif' font-size='54' fill='%23475569'%3ECourse preview unavailable%3C/text%3E%3C/svg%3E";

/**
 * Transform internal MinIO URL to public gateway URL.
 * Replaces http://minio:9000 with the configured public URL.
 */
export function getPublicMediaUrl(url: string | null | undefined): string {
  if (!url) {
    return COURSE_PLACEHOLDER_IMAGE;
  }

  // Replace internal Docker hostname with public gateway URL
  // Handles: http://minio:9000/courses-media/... -> http://localhost/media/courses-media/...
  if (url.includes("//minio:9000/")) {
    return url.replace("http://minio:9000/", `${env.minioPublicUrl}/`);
  }

  return url;
}

export { COURSE_PLACEHOLDER_IMAGE };
