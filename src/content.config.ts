import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // Removed max(170) limit entirely
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      appliance: z.string(),
      category: z.string(),
      cuisine: z.string().default('American'),
      keywords: z.array(z.string()).default([]),
      image: image(),
      imageAlt: z.string(),
      prepMinutes: z.number(),
      cookMinutes: z.number(),
      servings: z.number(),
      calories: z.number().optional(),
      whyItWorks: z.array(z.string()).default([]),
      ingredients: z.array(z.any()).default([]),
      substitutions: z.array(z.any()).default([]),
      steps: z.array(z.any()).default([]),
      proTips: z.array(z.string()).default([]),
      storage: z.string().optional().default(''),
      faqs: z.array(z.any()).default([]),
      equipment: z.any().default([]), // Accepts strings, objects, or empty arrays
    }),
});

export const collections = { recipes };
