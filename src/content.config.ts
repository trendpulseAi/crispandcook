import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Accepts either date or pubDate smoothly
      date: z.coerce.date().optional(),
      pubDate: z.coerce.date().optional(),
      // Draft mode flag
      draft: z.boolean().default(false),
      appliance: z.string().default('Air Fryer'),
      category: z.string().default('dinner'),
      cuisine: z.string().default('American'),
      keywords: z.array(z.string()).default([]),
      // Accepts both Astro local image assets or direct string paths
      image: z.union([image(), z.string()]).optional(),
      imageAlt: z.string().default('Delicious crisp recipe photo'),
      prepMinutes: z.number().optional(),
      cookMinutes: z.number().optional(),
      prepTime: z.string().optional(),
      cookTime: z.string().optional(),
      servings: z.number().default(4),
      calories: z.number().optional(),
      whyItWorks: z.array(z.string()).default([]),
      ingredients: z.array(z.any()).default([]),
      substitutions: z.array(z.any()).default([]),
      steps: z.array(z.any()).default([]),
      proTips: z.array(z.string()).default([]),
      storage: z.string().optional().default(''),
      faqs: z.array(z.any()).default([]),
      equipment: z.any().default([]),
    }),
});

export const collections = { recipes };
