# Saia Labs — LLM Instructions for Automated Page Creation & Promotion

This document is a reference for LLMs (via cron jobs or other automation) to create new idea landing pages on saialabs.com and promote them across social platforms to gauge product-market fit.

## Project Overview

- **Site**: saialabs.com (hosted on GitHub Pages)
- **Framework**: Astro (static site generator)
- **Repo**: https://github.com/michaelsaia/saialabs-site
- **Deployment**: Pushing to `main` triggers a GitHub Actions build → deploys to GitHub Pages automatically
- **Brand**: Saia Labs — builds software, automations, and tools that solve niche problems

## How Idea Pages Work

Each idea gets its own URL at `saialabs.com/ideas/{slug}`. These are "stealth" landing pages — not linked from the home page — meant to be shared directly on Reddit, X, forums, etc. to gauge interest via email signups.

---

## Part 1: Finding Ideas Worth Testing

### What makes a good idea to validate

1. **Recurring pain point** — Look for problems people complain about repeatedly in forums, subreddits, and X threads. If the same frustration shows up across multiple posts/threads over weeks, it's real.
2. **Existing workarounds** — If people are cobbling together spreadsheets, scripts, or multiple tools to solve a problem, there's an opportunity to build a clean solution.
3. **Narrow audience** — Target specific communities (e.g., "physical therapists switching practice management software" not "healthcare"). Niche = easier to reach, easier to validate.
4. **Buildable in weeks, not months** — Prefer ideas where a useful MVP could ship in 2-4 weeks. If it requires months of development before anyone can use it, skip it.
5. **No big incumbents caring** — The best niches are too small for big companies to bother with but painful enough for the people affected.

### Where to find ideas

- Reddit: r/SideProject, r/Entrepreneur, r/smallbusiness, niche subreddits for specific industries
- X/Twitter: Search for "I wish there was" / "why is there no" / "someone should build"
- Hacker News: "Ask HN" threads, Show HN comments with feature requests
- Product Hunt: Read comments on launched products — what are people asking for that doesn't exist?
- Personal experience: What has Mike complained about or hacked together?

### Validating before building the page

Before creating a landing page, verify:
- At least 3-5 independent instances of people expressing this pain point
- No obvious existing solution that already solves it well
- The target audience is reachable online (you know which subreddits/forums they're in)
- A realistic path to building an MVP with existing skills/tools

---

## Part 2: Creating a New Idea Page

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
| `accentColor` | string | No | `#6d5cff` | CSS hex color for the page accent (e.g., `"#059669"`) |
| `ogImage` | string | No | default OG image | Path to Open Graph image (e.g., `"/images/my-idea-og.png"`) |
| `publishedAt` | string | No | — | ISO date string (e.g., `"2026-03-05"`) |

### Step 3: Optional markdown body

After the frontmatter closing `---`, you can add markdown content that renders below the features section. Usually not needed for gauging interest — keep it short.

### Step 4: Commit and push

```bash
git add src/content/ideas/your-idea-slug.md
git commit -m "Add idea page: your-idea-slug"
git push origin main
```

The page will be live at `saialabs.com/ideas/your-idea-slug` within ~2 minutes.

---

## Part 3: Posting & Promotion

### General principles

**The #1 rule: Sound like a real person, not a marketer or a bot.**

People on Reddit, HN, and X can smell promotional content instantly. The goal is to start a genuine conversation about the problem, not to pitch a product. You're gauging interest, not selling.

### Platform-specific guidelines

#### Reddit

**Before posting:**
- Read the top 20 posts in the target subreddit. Understand the tone, what gets upvoted, what gets removed.
- Check subreddit rules. Many ban self-promotion or require specific flair.
- Look at how others share projects — usually as "I built this" or "would this be useful?" posts.

**How to write the post:**
- Lead with the problem, not your solution. "Does anyone else deal with X?" or "I've been frustrated by Y and started building something"
- Use the language the community uses. If they say "clients" don't say "customers." If they're casual, be casual. If they're technical, be technical.
- Be honest about the stage: "I'm exploring whether this is worth building" is more authentic than "check out our product"
- Include the link naturally, not as the main focus: "I put up a quick page if anyone wants to follow along: [link]"
- Ask a genuine question to invite discussion: "Would you actually use something like this? What's missing?"

**What NOT to do on Reddit:**
- Don't use marketing language ("revolutionary", "game-changing", "disrupting")
- Don't post the same thing to 10 subreddits — each post should be tailored
- Don't reply to every comment with "thanks for the feedback!" — engage substantively
- Don't use exclamation marks excessively
- Don't start with "Hey everyone!" or "Hi [subreddit]!"
- Don't use emojis in text posts (comments are sometimes ok depending on the sub)

**Example Reddit post tone:**
```
Title: Built a tool to auto-migrate client data between PT platforms — would anyone actually use this?

Body:
I run a physical therapy practice and just went through the nightmare of switching from [Platform A] to [Platform B]. Spent 3 weeks manually re-entering client records.

Started building something that uses AI to pull data from exports, PDFs, even screenshots and formats it for import into the new system. Basically zero manual data entry.

Curious if anyone else has dealt with this pain point or if I'm just bad at spreadsheets.

Early page if anyone's interested: saialabs.com/ideas/client-migration
```

#### X / Twitter

**How to write the post:**
- Keep it conversational and short. Thread format works well.
- First tweet: State the problem in a relatable way
- Second tweet: What you're building/exploring
- Third tweet: Link + ask for thoughts
- Use lowercase, casual tone. Contractions. Short sentences.
- No hashtags (they look spammy on X now)

**Example X thread:**
```
just spent 3 weeks manually migrating client records between practice management systems

there has to be a better way to do this

---

started building an AI tool that reads your exports/CSVs/even screenshots and reformats everything for your new platform

thinking about offering free migrations to get the first users

would anyone actually use this? saialabs.com/ideas/client-migration
```

**What NOT to do on X:**
- Don't use corporate tone or buzzwords
- Don't tag random people hoping for engagement
- Don't use "🚀 Excited to announce..." energy
- Don't thread more than 3-4 tweets for a simple idea validation

#### Hacker News

**How to write the post:**
- HN values technical depth, intellectual honesty, and genuine curiosity
- "Show HN" format requires a working demo or at minimum a clear explanation
- For gauging interest, "Ask HN" may be better: "Ask HN: Would you use X?"
- Be direct, no fluff. HN users skim aggressively.
- Acknowledge limitations and what you don't know
- Technical details earn credibility

**Example HN post:**
```
Title: Ask HN: Is automated client data migration between SaaS platforms a real problem?

Body:
I recently switched practice management platforms and spent weeks manually re-entering client data. The export formats were incompatible, some data was only in PDFs.

I'm exploring building a tool that uses LLMs to parse arbitrary export formats and map fields to the target platform's schema. Thinking of offering it free as a growth channel for new platforms.

Before I invest time: has anyone else hit this problem? Is there an existing solution I'm not finding?

Early landing page: https://saialabs.com/ideas/client-migration
```

**What NOT to do on HN:**
- Don't use marketing speak — HN will downvote you into oblivion
- Don't post "Show HN" without something to actually show
- Don't ask for upvotes or shares
- Don't respond defensively to criticism — engage thoughtfully

### Measuring success

After posting, track:
- **Email signups** — The primary signal. Check via the Cloudflare Worker API.
- **Comments/engagement** — Are people adding their own pain points? Asking when it launches? This is strong signal.
- **Upvotes/likes** — Weak signal but indicates topic resonance.
- **"I'd pay for this"** — Strongest possible signal. Note these.

**Thresholds for proceeding:**
- 10+ email signups from a single post = strong interest, consider building
- 5-10 signups = moderate interest, post to 1-2 more communities
- <5 signups = weak signal, iterate on the positioning or move on
- 0 signups but lots of comments = the problem resonates but the solution might be wrong

---

## Part 4: Technical Reference

### Creating a Custom Idea Page (Astro)

For ideas that need a unique, custom layout beyond what the markdown template provides:

1. Create `src/pages/ideas/your-idea-slug.astro`
2. Import the `EmailForm` component for email capture consistency:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import EmailForm from '../../components/EmailForm.astro';
---

<BaseLayout title="Your Idea — Saia Labs" description="Your tagline" noindex={true}>
  <Header minimal />
  <main class="flex-1 pt-16">
    <!-- Your custom layout here -->
    <EmailForm source="your-idea-slug" ctaText="Get early access" />
  </main>
</BaseLayout>
```

**Important:** The `source` prop on `EmailForm` must match the slug/identifier you want to use in the KV store. Keep it consistent with the file name.

### Email Signup Integration

- The `EmailForm` component POSTs to the Cloudflare Worker at `https://saialabs-email.michaelsaia97.workers.dev/api/subscribe`
- It sends `{ email, source }` where `source` is the idea slug (or `"general"` for the home page)
- Emails are stored in Cloudflare KV with key pattern `{source}:{email}`
- The form includes a honeypot field for bot detection

### Checking Subscribers

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  "https://saialabs-email.michaelsaia97.workers.dev/api/subscribers?source=client-migration"
```

### Writing Tips for Idea Pages

1. **Title**: Keep it under 5 words. Be descriptive, not clever.
2. **Tagline**: One sentence, under 15 words. State the value proposition clearly.
3. **Description**: Address: What is it? Who is it for? Why does it matter?
4. **Features**: 3-5 bullet points. Start with the strongest benefit. Use action verbs.
5. **CTA**: Match the status — "Get early access" for gauging interest, "Try it now" for launched.

### Project Structure Reference

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

### Verification

After pushing a new idea page, verify:
1. The GitHub Actions build passes (check the Actions tab)
2. The page is accessible at `saialabs.com/ideas/{slug}`
3. The email form renders and submits successfully
4. The page looks correct on mobile
