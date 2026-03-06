# Saia Labs — LLM Instructions for Automated Page Creation & Promotion

This document is a reference for LLMs (via Claude Cowork / cron jobs / other automation) to create new idea landing pages on saialabs.com and promote them across social platforms to gauge product-market fit.

## Project Overview

- **Site**: saialabs.com (hosted on GitHub Pages)
- **Framework**: Astro (static site generator)
- **Repo**: https://github.com/michaelsaia/saialabs-site
- **Deployment**: Pushing to `main` triggers a GitHub Actions build → deploys to GitHub Pages automatically
- **Brand**: Saia Labs — builds software, automations, and tools that solve niche problems
- **Tracking**: All created idea pages are logged to the **"PMF Validator"** Notion database

## Execution Environment

This workflow is designed to run via **Claude Cowork** (Claude in Chrome). You have access to:
- **Browser**: Navigate to sites, read forum threads, post content, interact with Notion
- **Terminal/CLI**: Run git commands, edit files, push to GitHub
- **File system**: Create and modify markdown files in the repo

## Account Safety

**CRITICAL: Before posting on any platform, verify you are logged into the correct account.**

| Platform | Account to use | How to verify |
|----------|---------------|---------------|
| Reddit | `magellanator3000` | Check the username in the top-right corner or profile dropdown. If it shows any other username, STOP. Do not post. |
| X | `magellanat0r` | Check the handle shown in the sidebar or profile. If it shows any other handle, STOP. Do not post. |

**If you are logged into Mike's personal account on either platform, do NOT post. Switch accounts first or flag this to Mike.**

---

## Part 1: Finding Ideas Worth Testing

### What makes a good idea to validate

Every idea MUST meet ALL of these criteria:

1. **Recurring pain point** — Look for problems people complain about repeatedly in forums, subreddits, and X threads. If the same frustration shows up across multiple posts/threads over weeks, it's real.
2. **Existing workarounds** — If people are cobbling together spreadsheets, scripts, or multiple tools to solve a problem, there's an opportunity to build a clean solution.
3. **Narrow audience** — Target specific communities (e.g., "physical therapists switching practice management software" not "healthcare"). Niche = easier to reach, easier to validate.
4. **Buildable in weeks, not months** — Prefer ideas where a useful MVP could ship in 2-4 weeks with Mike's skillset (Python, React/Expo, Cloudflare Workers, APIs). If it requires months of development before anyone can use it, skip it.
5. **Clear earning potential** — There must be a plausible path to revenue. People complaining = pain. People saying "I'd pay for this" or spending money on bad workarounds = earning potential.
6. **No big incumbents caring** — The best niches are too small for big companies to bother with but painful enough for the people affected.

### Where to find ideas

- Reddit: r/SideProject, r/Entrepreneur, r/smallbusiness, niche subreddits for specific industries
- X/Twitter: Search for "I wish there was" / "why is there no" / "someone should build"
- Hacker News: "Ask HN" threads, Show HN comments with feature requests
- Product Hunt: Read comments on launched products — what are people asking for that doesn't exist?

### Validating before building the page

Before creating a landing page, verify:
- At least 3-5 independent instances of people expressing this pain point (save the thread URLs)
- Clear signals of willingness to pay or existing spending on workarounds
- No obvious existing solution that already solves it well
- The target audience is reachable online (you know which subreddits/forums they're in)
- A realistic path to building an MVP in 2-4 weeks

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

**Rule #1: Sound like a real person, not a marketer or a bot.**

People on Reddit and X can smell promotional content instantly. The goal is to start a genuine conversation about the problem, not to pitch a product. You're gauging interest, not selling.

Match the tone of the community you're posting in. Read how other people write in that subreddit or on that topic on X. Mirror their style — sentence length, vocabulary, level of formality, use of slang. If they're casual and short, be casual and short. If they write paragraphs, it's ok to write paragraphs. Don't be excessively verbose. Don't overexplain. Say what a real person would say, nothing more.

**Rule #2: NEVER promise anything for free.**

Do not offer free migrations, free trials, free anything on landing pages or in posts. The purpose is to gauge whether people care about the *problem* and would be interested in a *solution*. Promising free stuff attracts the wrong signal — you get signups from people who want free things, not people willing to pay for a real product. Instead:
- Frame it as "exploring building a solution" or "gauging interest"
- CTA text should be things like "Get early access", "Stay updated", "Join the waitlist" — NOT "Get it free" or "Free migration"
- In posts, talk about the problem and ask if others experience it — don't lead with an offer

**Rule #3: Curate real engagement, not just self-promotion.**

For every promotional action you take for a Saia Labs idea (a post or comment linking to one of our pages), you MUST also make at least one genuine, non-promotional engagement:
- Comment helpfully on someone else's post or idea
- Answer a question in a relevant thread
- Share a useful resource or insight (not ours)

This builds credibility for the accounts and makes them look like real, active community members — not spam bots. Do this BEFORE posting your promotional content in each session.

**Rule #4: Verify account identity before every post.**

Before posting anything on Reddit or X, confirm you are logged in as the correct account (see Account Safety section above). Never post from Mike's personal accounts.

### Platform-specific guidelines

#### Reddit (post as `magellanator3000`)

**Before posting:**
- Verify you're logged in as `magellanator3000` (check username in profile dropdown)
- Read the top 20 posts in the target subreddit. Understand the tone, what gets upvoted, what gets removed.
- Check subreddit rules. Many ban self-promotion or require specific flair.
- Look at how others share projects — usually as "I built this" or "would this be useful?" posts.

**How to write the post:**
- Lead with the problem, not your solution. "Does anyone else deal with X?" or "I've been frustrated by Y and started building something"
- Use the language the community uses. If they say "clients" don't say "customers." If they're casual, be casual. If they're technical, be technical.
- Be honest about the stage: "I'm exploring whether this is worth building" is more authentic than "check out our product"
- Include the link naturally, not as the main focus: "I put up a quick page if anyone wants to follow along: [link]"
- Ask a genuine question to invite discussion: "Would you actually use something like this? What's missing?"
- Keep it the same length as other posts in the sub. Don't write an essay in a sub where people write 3 sentences.

**What NOT to do on Reddit:**
- Don't use marketing language ("revolutionary", "game-changing", "disrupting")
- Don't post the same thing to 10 subreddits — each post should be tailored
- Don't reply to every comment with "thanks for the feedback!" — engage substantively
- Don't use exclamation marks excessively
- Don't start with "Hey everyone!" or "Hi [subreddit]!"
- Don't use emojis in text posts (comments are sometimes ok depending on the sub)
- Don't be overly verbose — say what you need to say and stop

**Example Reddit post tone:**
```
Title: Built a tool to auto-migrate client data between PT platforms — would anyone actually use this?

Body:
I run a physical therapy practice and just went through the nightmare of switching from [Platform A] to [Platform B]. Spent 3 weeks manually re-entering client records.

Started building something that uses AI to pull data from exports, PDFs, even screenshots and formats it for import into the new system. Basically zero manual data entry.

Curious if anyone else has dealt with this pain point or if I'm just bad at spreadsheets.

Early page if anyone's interested: saialabs.com/ideas/client-migration
```

#### X / Twitter (post as `magellanat0r`)

**Before posting:**
- Verify you're logged in as `magellanat0r` (check handle in sidebar)

**How to write the post:**
- Keep it conversational and short. Thread format works well.
- First tweet: State the problem in a relatable way
- Second tweet: What you're building/exploring
- Third tweet: Link + ask for thoughts
- Use lowercase, casual tone. Contractions. Short sentences.
- No hashtags (they look spammy on X now)
- Match how other people on X talk about similar topics

**Example X thread:**
```
just spent 3 weeks manually migrating client records between practice management systems

there has to be a better way to do this

---

started building an AI tool that reads your exports/CSVs/even screenshots and reformats everything for your new platform

exploring whether this is something people actually need or if i'm just salty about my own experience

if you've dealt with this: saialabs.com/ideas/client-migration
```

**What NOT to do on X:**
- Don't use corporate tone or buzzwords
- Don't tag random people hoping for engagement
- Don't use "🚀 Excited to announce..." energy
- Don't thread more than 3-4 tweets for a simple idea validation
- Don't be verbose — X rewards brevity

### Non-promotional content

To build account credibility, you should also create non-promotional posts. These are full posts (not replies or comments), and they require Mike's approval before posting.

**At the end of each daily run, suggest 1-2 non-promotional post ideas to Mike.** Include:
- The platform (Reddit or X)
- The subreddit or topic
- The draft post text
- Why it's relevant to the account's overall persona

**Types of non-promotional content:**
- Sharing a useful tool, article, or resource relevant to the communities we post in
- Asking a genuine question you encountered during research
- Sharing an observation or insight about a trend in the niche
- Responding to trending topics in the communities

**Do NOT post these without Mike's approval. Save them as suggestions.**

### Following up on existing ideas

Not every run needs to produce a new idea. Check on existing ideas first:

1. **Check signups** — Hit the Cloudflare Worker API to see if any ideas have new signups
2. **Check post engagement** — Visit the Reddit/X posts you've made and read new comments
3. **Double down on traction** — If an idea has momentum (signups coming in, active comments), look for MORE places to post about it:
   - Find new relevant subreddits where the same pain point is discussed
   - Search X for people complaining about the same problem and reply naturally (as a comment, not self-promo — just engage with the topic)
   - If someone asks a question related to our idea, answer helpfully and mention you're exploring a solution
4. **Update Notion** — Update signup counts, signal strength, and add notes about engagement

**Prioritize doubling down on ideas with traction over creating new ideas.** If something is working, ride the wave.

### Measuring success

After posting, track:
- **Email signups** — The primary signal. Check via the Cloudflare Worker API.
- **Comments/engagement** — Are people adding their own pain points? Asking when it launches? This is strong signal.
- **Upvotes/likes** — Weak signal but indicates topic resonance.
- **"I'd pay for this"** — Strongest possible signal. Note these in Notion.

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

Use the **Admin Dashboard** at `saialabs.com/admin` to check signup counts for all ideas at once.

**Admin key:** `REPLACE_WITH_ADMIN_SECRET`

> **Mike**: Replace the placeholder above with the actual `ADMIN_SECRET` value you set on the Cloudflare Worker. The bot needs this to access the admin dashboard.

**How to check signups:**

1. Navigate to `https://saialabs.com/admin` in the browser
2. Enter the admin key in the password field and click "View Dashboard"
3. The dashboard shows:
   - **Summary table** — All idea slugs with their signup counts, sorted by count (highest first), with a total at the bottom
   - **Per-slug details** — Click any slug row to expand and see individual subscriber emails, dates, and countries
4. Use the **Export CSV** button to download all subscriber data as a CSV file

- The signup count for each slug is what you log in the **Email Signups** column in Notion
- Use counts to determine **Signal Strength**: Strong (10+), Moderate (5-10), Weak (<5)
- Sources match the idea's slug (e.g., `client-migration`, `general` for the home page)

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
│   │   ├── admin.astro      ← Admin dashboard (password-protected, noindexed)
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

After pushing a new idea page, verify using Claude in Chrome:
1. The GitHub Actions build passes (navigate to the repo Actions tab)
2. The page is accessible at `saialabs.com/ideas/{slug}` — open it in the browser and confirm it renders
3. The email form renders and the button is visible
4. Check on a mobile viewport (use Chrome DevTools responsive mode)

---

## Part 5: Notion Tracking (PMF Validator Database)

After creating each idea page and posting it, log it to the **"PMF Validator"** database in Notion. Use Claude in Chrome to navigate to Notion and create a new entry.

### Database columns

| Column | Type | How to fill it |
|--------|------|----------------|
| **Idea Name** | Title | The idea title from the frontmatter (e.g., "Client Migration") |
| **Idea Description** | Text | 2-3 sentences explaining why you chose this idea. What pain point did you observe? What threads/posts showed the need? Why is it practical to build? What's the earning potential? Be specific — cite the communities and signals you found. |
| **Research** | Text | Bullet list of the evidence threads/posts you found. Format each as: `[Platform] Subreddit/Topic - "Key quote or summary" - URL`. Example: `[Reddit] r/physicaltherapy - "Spent 3 weeks re-entering client data after switching to Jane App" - https://reddit.com/r/physicaltherapy/comments/abc123` |
| **Slug** | Text | The kebab-case slug (e.g., `client-migration`) |
| **URL** | URL | `https://saialabs.com/ideas/{slug}` |
| **Status** | Select | `Gauging Interest` / `Building` / `Launched` |
| **Date Created** | Date | Today's date |
| **Accent Color** | Text | The hex color code (e.g., `#059669`) |
| **Posted To** | Multi-select | Platforms posted to (e.g., `Reddit`, `X`) |
| **Post Links** | Text | One link per line, formatted as: `[Platform] r/subreddit or @handle - URL`. Examples below. |
| **Email Signups** | Number | Current count (update each run by checking the Cloudflare Worker API) |
| **Signal Strength** | Select | `Strong` (10+) / `Moderate` (5-10) / `Weak` (<5) / `Not yet measured` |
| **Notes** | Text | Notable comments, "I'd pay for this" signals, feedback themes. One observation per line. |

### Post Links format

Always format Post Links as one entry per line, with the platform tag, community/handle, and full URL:

```
[Reddit] r/physicaltherapy - https://reddit.com/r/physicaltherapy/comments/abc123
[Reddit] r/SideProject - https://reddit.com/r/SideProject/comments/def456
[X] @magellanat0r - https://x.com/magellanat0r/status/123456789
```

This makes it easy to scan which platforms have been covered and click through to each post.

---

## Part 6: Daily Run Workflow

Each daily run should follow this sequence:

### Phase 1: Check existing ideas (always do this first)

1. Open the PMF Validator database in Notion
2. For each idea with status "Gauging Interest":
   a. Check email signups via the Cloudflare Worker API
   b. Visit each post link — read new comments, note engagement
   c. Update the Notion row: signup count, signal strength, notes
3. Identify ideas with traction (new signups, active threads, positive comments)

### Phase 2: Double down on traction

For ideas showing momentum:
1. Search Reddit and X for NEW threads/posts where people are discussing the same pain point
2. If you find relevant threads:
   - On Reddit: Leave a helpful comment engaging with the topic. If it's natural, mention you're exploring a solution. Don't force it.
   - On X: Reply to people discussing the problem. Be conversational. Don't always link — sometimes just engaging is enough.
3. If there are new relevant subreddits you haven't posted to yet, consider a fresh post tailored to that community
4. Log any new posts/comments to the Post Links column in Notion

### Phase 3: Community engagement (credibility building)

Before doing any self-promotional posting:
1. Find 1-2 posts/threads in communities you're active in where you can contribute genuinely
2. Leave helpful comments, answer questions, or share useful non-Saia-Labs resources
3. This is not logged to Notion — it's just about building real account history

### Phase 4: New idea research (only if no existing ideas need attention)

If all existing ideas are either stable or dead:
1. Browse Reddit and X for new recurring pain points
2. Validate against all criteria in Part 1
3. If a strong candidate emerges, create the landing page (Part 2)
4. Post to 1-2 relevant communities (Part 3)
5. Log to Notion (Part 5)

### Phase 5: End-of-run summary

At the end of each run, prepare a summary for Mike:

1. **Idea status updates** — Which ideas gained signups, which threads are active
2. **New idea proposals** (if any) — What you found, why it's worth testing
3. **Suggested non-promotional posts** (1-2) — Draft text for Mike to approve. Include:
   - Platform and target community
   - Full draft text
   - Why it fits the account's persona
4. **Any flags** — Account issues, subreddit bans, interesting competitor activity

**Do NOT post the non-promotional content suggestions. Present them to Mike for approval.**
