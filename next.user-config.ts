// @polsia:user-owned — your Next.js customizations, merged into next.config.ts by the
// framework. Edit freely (no slot markers). next.config.ts stays framework-owned: don't
// put security headers / CSP / a full `images` block here.
import type { NextConfig } from 'next';
import type { CspExtraSources } from '@/lib/csp';
import type { AppCapabilities } from '@/lib/permissions-policy';

type RemotePatterns = NonNullable<NonNullable<NextConfig['images']>['remotePatterns']>;

/** Remote hosts you load <Image> from. e.g. { protocol: 'https', hostname: 'images.unsplash.com' } */
export const userRemotePatterns: RemotePatterns = [];

/** Package-level Next options (transpilePackages, experimental.optimizePackageImports, …). */
export const userNextConfig: NextConfig = { images: { unoptimized: true } };

export type ConfigPlugin = (config: NextConfig) => NextConfig;

/**
 * Next plugins that must WRAP the whole config (next-intl, Sentry, MDX,
 * bundle-analyzer). Each entry is a `(config) => config` wrapper — pre-bind
 * options. next.config.ts applies these and re-asserts the security headers
 * afterward, so a plugin can extend the build but never drop the day-1 posture.
 * For i18n, install the `i18n` module and add its plugin here per its AGENT.md.
 *
 *   export const userConfigPlugins: ConfigPlugin[] = [
 *     createNextIntlPlugin('./src/i18n/request.ts'),
 *     (config) => withSentryConfig(config, { silent: true }),
 *   ];
 */
export const userConfigPlugins: ConfigPlugin[] = [];

/**
 * Per-app CSP source allow-lists (frame/connect/media/font/img). Each flipped
 * direction appends the listed origins to the corresponding CSP directive —
 * `frame-src` covers <iframe> hosts (Stripe, YouTube, reCAPTCHA, Calendly);
 * `connect-src` covers fetch/XHR/WebSocket/SSE; etc. Default `{}` keeps every
 * directive at `'self'`/single-origin. Wildcards and the script-src/style-src
 * ramparts are deliberately NOT exposed by this seam.
 */
export const cspExtraSources: CspExtraSources = {};

/**
 * Browser capabilities the app actively needs. Each `true` emits
 * `<feature>=(self)` in the Permissions-Policy header so the app *can*
 * prompt for it; the browser's own permission prompt is still the gate.
 * Default `{}` keeps every feature disabled — `getUserMedia` will not even
 * prompt, which is the reason "recording won't start" without this set.
 * Leave unused features off: declaring unused device permissions is flagged
 * by security audits and reduces defense-in-depth against XSS.
 * `browsing-topics` is intentionally NOT exposed here — it stays hard-off.
 */
export const appCapabilities: AppCapabilities = {};
