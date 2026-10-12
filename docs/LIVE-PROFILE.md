# Live Profile System

The Live Profile System enhances the Ask Arun AI portfolio assistant by supplementing authoritative, verified static data with recent, public activity from external sources (e.g., GitHub, Instagram, LinkedIn, and the Portfolio Website).

## Core Principles

1. **Static Data is Authoritative**: Live data never overrides verified facts about identity, employment, education, or skills.
2. **Untrusted External Data**: All fetched content (commit messages, post captions, READMEs) is treated as untrusted and normalized to prevent prompt injection.
3. **No Unofficial Scraping**: Only official APIs are used. If an API is not configured (e.g. Instagram/LinkedIn), the adapter gracefully reports `not_configured`.
4. **Performance via Stale-While-Revalidate**: External APIs are never fetched synchronously during a chat request. The system relies on a cache (Upstash Redis) backed by background cron synchronization.

## Architecture

The system lives in `src/lib/live-profile` and is composed of:

- **Source Adapters**: Implementations that connect to specific external APIs (`github.ts`, `instagram.ts`, `linkedin.ts`, `website.ts`).
- **Aggregator**: `aggregator.ts` coordinates all adapters, queries the cache, and triggers background revalidation if data is stale.
- **Normalization**: `normalize.ts` sanitizes all text to strip instruction-like language and neutralizes markdown issues.
- **Cache**: `cache.ts` uses Upstash Redis in production, falling back to a memory Map in local development.
- **Freshness**: `freshness.ts` computes the exact age and staleness of each source using environment variable TTLs.

## Source Statuses

* **ACTIVE**: GitHub (using public API), Website (using local data)
* **NOT CONFIGURED**: Instagram, LinkedIn (require specific OAuth credentials)

## Environment Variables

### Core
- `LIVE_PROFILE_ENABLED`: Enable or disable the entire live profile system.

### TTL Configuration (seconds)
- `LIVE_GITHUB_TTL_SECONDS`: (Default: 900)
- `LIVE_INSTAGRAM_TTL_SECONDS`: (Default: 3600)
- `LIVE_LINKEDIN_TTL_SECONDS`: (Default: 21600)
- `LIVE_WEBSITE_TTL_SECONDS`: (Default: 900)

### GitHub Configuration
- `GITHUB_TOKEN`: (Optional) Provide a server-side PAT to increase GitHub API rate limits.
- `LIVE_GITHUB_ENABLED`: Set to `false` to disable just the GitHub source.

### Instagram Configuration
- `INSTAGRAM_ACCESS_TOKEN`: Required for Instagram data. Must be a valid long-lived Instagram Graph API token.
- `INSTAGRAM_USER_ID`: Required for Instagram data. The Business/Creator account ID.
- `LIVE_INSTAGRAM_ENABLED`: Set to `false` to disable just the Instagram source.

### LinkedIn Configuration
- `LINKEDIN_ACCESS_TOKEN`: Required for LinkedIn data. Must be obtained through a LinkedIn Developer Application OAuth2 flow.
- `LIVE_LINKEDIN_ENABLED`: Set to `false` to disable just the LinkedIn source.

## Endpoints

* `GET /api/cron/sync-profile`: Vercel cron endpoint that executes the background sync. (Secured by Vercel `CRON_SECRET`).
* `GET /api/profile/health`: Exposes a safe diagnostic endpoint for developers to check source health without exposing sensitive keys.

## Adding a New Source

1. Create a new file in `src/lib/live-profile/sources/newsource.ts`.
2. Implement the `LiveSourceAdapter` interface.
3. Ensure all fetched data is normalized via `normalize.ts`.
4. Register the adapter in `src/lib/live-profile/sources/index.ts`.
5. Update `types.ts` and `freshness.ts` to include the new source name.
