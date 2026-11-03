import { getCollection } from 'astro:content';

/** Published posts only: not drafts, and date is not in the future (drip-feed scheduling). */
export async function getPublishedRecipes() {
  const now = new Date();
  const all = await getCollection('recipes', ({ data }) => !data.draft && data.date <= now);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const isoDuration = (min: number) => `PT${min}M`;

export function withAmazonTag(url: string, tag: string) {
  if (!tag || !/amazon\./.test(url)) return url;
  const u = new URL(url);
  u.searchParams.set('tag', tag);
  return u.toString();
}
