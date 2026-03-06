import { defineCollection, z } from 'astro:content';

const ideas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    features: z.array(z.string()).default([]),
    cta: z.string().default('Get early access'),
    status: z.enum(['gauging-interest', 'building', 'launched']).default('gauging-interest'),
    accentColor: z.string().optional(),
    ogImage: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
});

export const collections = { ideas };
