# Saia Labs — LLM Instructions for Automated Page Creation

This document is a reference for LLMs (via cron jobs or other automation) to create new idea landing pages on saialabs.com.

## Project Overview

- **Site**: saialabs.com (hosted on GitHub Pages)
- **Framework**: Astro (static site generator)
- **Repo**: https://github.com/michaelsaia/saialabs-site
- **Deployment**: Pushing to `main` triggers a GitHub Actions build → deploys to GitHub Pages automatically

## How Idea Pages Work

Each idea gets its own URL at `saialabs.com/ideas/{slug}`. These are "stealth" landing pages — not linked from the home page — meant to be shared directly on Reddit, X, forums, etc. to gauge interest via email signups.

## Creating a New Idea Page (Markdown)

### Step 1: Create the markdown file

Create a new file at `src/content/ideas/{slug}.md` where `{slug}` is a kebab-case identifier.

**File naming rules:**
- Use kebab-case (lowercase, hyphens between words)
- No underscores, spaces, or special characters
- Keep it short but descriptive
- Examples: `auto-receipt-tracker.md`, `pet-food-optimizer.md`, `code-review-bot.md`

### Step 2: Fill in the frontmatter

Every idea page **must** have this frontmatter at the top:

```markdown
---
title: "Your Idea Name"
tagline: "One compelling sentence that hooks the reader"
description: "2-3 sentences explaining what this is and why it matters. Be specific about the problem you're solving and who it's for."
features:
  - "Key benefit or feature #1"
  - "Key benefit or feature #2"
  - "Key benefit or feature #3"
cta: "Get early access"
status: "gauging-interest"
---
```

### Frontmatter Schema Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | Yes | — | The idea name, displayed as the main heading |
| `tagline` | string | Yes | — | One-liner hook, shown below the title |
| `description` | string | Yes | — | 2-3 sentences about the problem and solution |
| `features` | string[] | No | `[]` | List of key benefits/features (3-5 recommended) |
| `cta` | string | No | `"Get early access"` | Button text for the email signup |
| `status` | enum | No | `"gauging-interest"` | One of: `gauging-interest`, `building`, `launched` |
| `accentColor` | string | No | `#6d5cff` | CSS hex color for the page accent (e.g., `"#7c3aed"`) |
| `ogImage` | string | No | default OG image | Path to Open Graph image (e.g., `"/images/my-idea-og.png"`) |
| `publishedAt` | string | No | — | ISO date string (e.g., `"2026-03-05"`) |

### Step 3: Optional markdown body

After the frontmatter closing `---`, you can add markdown content that renders below the features section:

```markdown
---
title: "Example"
tagline: "Example tagline"
description: "Example description"
features:
  - "Feature 1"
cta: "Sign up"
status: "gauging-interest"
---

## How It Works

Additional details in markdown...

### Technical Details

More content here...
```

### Step 4: Commit and push

```bash
git add src/content/ideas/your-idea-slug.md
git commit -m "Add idea page: your-idea-slug"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy. The page will be live at `saialabs.com/ideas/your-idea-slug` within ~2 minutes.

## Creating a Custom Idea Page (Astro)

For ideas that need a unique, custom layout beyond what the markdown template provides:

1. Create `src/pages/ideas/your-idea-slug.astro` (or `src/pages/your-idea-slug.astro` for a top-level route)
2. Import the `EmailForm` component for email capture consistency:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import EmailForm from '../../components/EmailForm.astro';
---

<BaseLayout title="Your Idea — Saia Labs" description="Your tagline" noindex={true}>
  <Header minimal />
  <main class="flex-1 pt-16">
    <!-- Your custom layout here -->

    <!-- Always include email capture -->
    <EmailForm source="your-idea-slug" ctaText="Get early access" />
  </main>
  <Footer />
</BaseLayout>
```

**Important:** The `source` prop on `EmailForm` must match the slug/identifier you want to use in the KV store. Keep it consistent with the file name.

## Email Signup Integration

- The `EmailForm` component POSTs to the Cloudflare Worker at `https://saialabs-email.michaelsaia97.workers.dev/api/subscribe`
- It sends `{ email, source }` where `source` is the idea slug (or `"general"` for the home page)
- Emails are stored in Cloudflare KV with key pattern `{source}:{email}`
- The form includes a honeypot field for bot detection

## Writing Tips for Idea Pages

1. **Title**: Keep it under 5 words. Be descriptive, not clever.
2. **Tagline**: One sentence, under 15 words. State the value proposition clearly.
3. **Description**: Address: What is it? Who is it for? Why does it matter?
4. **Features**: 3-5 bullet points. Start with the strongest benefit. Use action verbs.
5. **CTA**: Match the status — "Get early access" for gauging interest, "Try it now" for launched.

## Project Structure Reference

```
saialabs-site/
├── src/
│   ├── content/
│   │   └── ideas/           ← Markdown idea pages go here
│   │       └── _template.md ← Copy this for new ideas
│   ├── pages/
│   │   ├── index.astro      ← Home page (don't modify)
│   │   └── ideas/
│   │       └── [...slug].astro ← Dynamic route for markdown ideas
│   ├── layouts/
│   │   ├── BaseLayout.astro ← Shared HTML shell
│   │   └── IdeaLayout.astro ← Template for markdown idea pages
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── EmailForm.astro  ← Reusable email form
│   └── styles/
│       └── global.css       ← Global styles and design tokens
├── worker/
│   └── email-worker.js      ← Cloudflare Worker (deployed separately)
└── public/
    └── images/              ← Static images
```

## Verification

After pushing a new idea page, verify:
1. The GitHub Actions build passes (check the Actions tab)
2. The page is accessible at `saialabs.com/ideas/{slug}`
3. The email form renders and submits successfully
4. The page looks correct on mobile
