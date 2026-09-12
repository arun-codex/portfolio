# SEO & Search Engine Optimization Guide

This document outlines the technical SEO architecture, metadata strategy, structured data (JSON-LD), crawl configuration, and manual Google Search Console verification steps for **Arun Kumar's Portfolio** ([https://arunx.xyz](https://arunx.xyz)).

---

## 1. Core Production Identities

| Property | Value |
| :--- | :--- |
| **Domain** | `https://arunx.xyz` |
| **Canonical URL** | `https://arunx.xyz/` |
| **Sitemap URL** | `https://arunx.xyz/sitemap.xml` |
| **Robots URL** | `https://arunx.xyz/robots.txt` |
| **Portfolio Owner** | Arun Kumar |
| **Public Handle** | `arun-codex` |
| **Focus** | Cybersecurity, Linux, Networking & Secure Software Development |

---

## 2. Target Keyword Themes & Natural Intent

The portfolio targets legitimate, factual search queries without keyword stuffing:

### Personal Brand
- `Arun Kumar` (Personal entity discovery)
- `Arun Kumar cybersecurity` (Security profile)
- `Arun Kumar developer` (Development profile)
- `Arun Kumar cybersecurity student` (Academic & learning context)
- `Arun Kumar BCA student` (Education context)
- `Arun Kumar portfolio` (Direct site navigation)
- `arun-codex` (GitHub / online developer handle)

### Cybersecurity & Systems
- `cybersecurity student India`
- `cybersecurity student portfolio`
- `cybersecurity internship student`
- `Linux cybersecurity student`
- `network security student`
- `ethical hacking student`

### Development & Software
- `developer portfolio India`
- `BCA developer portfolio`
- `Next.js developer portfolio`
- `TypeScript developer portfolio`

---

## 3. Metadata Configuration

Implemented in [src/app/layout.tsx](file:///c:/Users/mraru/codes/portfolio/src/app/layout.tsx):

- **Title Template**: `%s | Arun Kumar`
- **Default Title**: `Arun Kumar | Cybersecurity Student & Developer`
- **Meta Description**: `Arun Kumar is a BCA student and cybersecurity-focused developer from India, building practical projects in cybersecurity, Linux, networking, and secure software development.`
- **Canonical**: `<link rel="canonical" href="https://arunx.xyz/" />`
- **Metadata Base**: `https://arunx.xyz`
- **Robots Directives**: `index: true`, `follow: true`, `googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 }`

---

## 4. Open Graph & Twitter Cards

- **og:title**: `Arun Kumar | Cybersecurity Student & Developer`
- **og:description**: Natural factual summary matching meta description.
- **og:url**: `https://arunx.xyz/`
- **og:type**: `website`
- **og:site_name**: `Arun Kumar Portfolio`
- **og:image**: `https://arunx.xyz/images/og-image.png` (1200x630 resolution, high-contrast dark cyberpunk styling)
- **twitter:card**: `summary_large_image`
- **twitter:creator**: `@itz_arun_1806`

---

## 5. Crawling Directives (`robots.txt` & `sitemap.xml`)

### Dynamic `robots.ts` ([src/app/robots.ts](file:///c:/Users/mraru/codes/portfolio/src/app/robots.ts))
```text
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://arunx.xyz/sitemap.xml
Host: https://arunx.xyz
```
- Ensures search engines index the public portfolio pages, styles, and scripts.
- Prevents crawling internal backend API endpoints like `/api/chat`.

### Dynamic `sitemap.ts` ([src/app/sitemap.ts](file:///c:/Users/mraru/codes/portfolio/src/app/sitemap.ts))
- Generates dynamic XML containing canonical URL `https://arunx.xyz`.
- Automatically responds with `lastModified`, `changeFrequency: "weekly"`, and `priority: 1.0`.

---

## 6. Structured Data (JSON-LD)

Implemented as a unified `@graph` in [src/app/layout.tsx](file:///c:/Users/mraru/codes/portfolio/src/app/layout.tsx):

1. **`WebSite`**:
   - Declares website name, description, canonical URL, and references publisher (`#person`).
2. **`ProfilePage`**:
   - Identifies the page as a personal profile page with `mainEntity` set to `#person`.
3. **`Person`**:
   - `name`: Arun Kumar
   - `alternateName`: arun-codex
   - `jobTitle`: Cybersecurity Student & Developer
   - `alumniOf`: Bachelor of Computer Applications (BCA)
   - `nationality`: India
   - `sameAs`: GitHub (`arun-codex`), LinkedIn (`arun-codex`), X (`@itz_arun_1806`)
   - `knowsAbout`: Cybersecurity, Linux System Administration, Computer Networking, Ethical Hacking Fundamentals, Secure Software Development, C, Python, JavaScript, TypeScript, Next.js.
   - `hasCredential`: Verified Google "Introduction to Generative AI" credential with official verification link.

---

## 7. Google Search Console Setup & Verification Checklist

To complete search engine onboarding, follow these manual steps:

### Step 1: Add Property to Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Choose **Domain** (recommended: `arunx.xyz`) or **URL prefix** (`https://arunx.xyz`).

### Step 2: Verify Domain Ownership
- **Option A (Domain - DNS TXT Record, Recommended)**:
  1. Copy the Google verification TXT record.
  2. Add the TXT record to your domain DNS provider (Cloudflare, Namecheap, Vercel DNS, etc.).
  3. Click **Verify**.
- **Option B (URL Prefix - HTML Tag)**:
  1. Add the meta verification token to `src/app/layout.tsx` under `verification.google`.
  2. Deploy to production and click **Verify**.

### Step 3: Submit the Sitemap
1. Navigate to **Sitemaps** in the Search Console sidebar.
2. Under "Add a new sitemap", enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. Confirm status changes to **Success**.

### Step 4: Inspect Homepage & Request Indexing
1. Use the URL Inspection tool on `https://arunx.xyz/`.
2. Click **Test Live URL** to confirm Googlebot can fetch and render the page.
3. Click **Request Indexing**.

---

## 8. Safe Maintenance & Expansion Guidelines

1. **Adding Projects**:
   - Update [src/data/projects.ts](file:///c:/Users/mraru/codes/portfolio/src/data/projects.ts).
   - Ensure title, description, skills, and links are factual and authentic.
2. **Adding Certifications**:
   - Only add verified certifications to [src/data/certifications.ts](file:///c:/Users/mraru/codes/portfolio/src/data/certifications.ts) with genuine verification URLs.
   - Update `hasCredential` in [src/app/layout.tsx](file:///c:/Users/mraru/codes/portfolio/src/app/layout.tsx) when new certificates are earned.
3. **No Keyword Stuffing**:
   - Keep heading text natural and descriptive.
   - Never inject hidden text or off-screen keyword dumps.
4. **Secret Protection**:
   - Never expose API keys or environment variables in JSON-LD or meta tags.
