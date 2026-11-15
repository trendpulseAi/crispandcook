import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(500),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      appliance: z.enum(['Air Fryer', 'Rice Cooker', 'Stovetop', 'Oven', 'No-Cook']),
      category: z.string(),
      cuisine: z.string().default('American'),
      keywords: z.array(z.string()).default([]),
      image: image(),
      imageAlt: z.string(),
      prepMinutes: z.number(),
      cookMinutes: z.number(),
      servings: z.number(),
      calories: z.number().optional(),
      whyItWorks: z.array(z.string()).length(3),
      ingredients: z.array(
        z.object({ amount: z.string(), item: z.string(), why: z.string().optional() })
      ),
      substitutions: z.array(z.object({ swap: z.string(), with: z.string() })).default([]),
      steps: z.array(z.object({ title: z.string(), text: z.string() })),
      proTips: z.array(z.string()).default([]),
      storage: z.string(),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).length(3),
      equipment: z.array(
        z.union([
          z.string(),
          z.object({ name: z.string(), url: z.string().url().optional() })
        ])
      ).default([]),
    }),
});

export const collections = { recipes };
