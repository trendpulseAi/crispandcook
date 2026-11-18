import { getCollection } from 'astro:content';

/** Published posts only: not drafts, and date is not in the future (drip-feed scheduling). */
export async function getPublishedRecipes() {
  const now = new Date();
  const all = await getCollection('recipes', ({ data }) => {
    // 1. Exclude if explicitly marked as draft
    if (data.draft === true) return false;

    // 2. Resolve whichever date property is provided (date or pubDate)
    const postDate = data.date ? new Date(data.date) : data.pubDate ? new Date(data.pubDate) : null;

    // 3. In production, exclude future-dated posts
    if (import.meta.env.PROD && postDate && postDate > now) {
      return false;
    }

    return true;
  });

  return all.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : (a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0);
    const dateB = b.data.date ? new Date(b.data.date).getTime() : (b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0);
    return dateB - dateA;
  });
}

export const isoDuration = (min: number) => `PT${min}M`;

export function withAmazonTag(url: string, tag: string) {
  if (!tag || !/amazon\./.test(url)) return url;
  const u = new URL(url);
  u.searchParams.set('tag', tag);
  return u.toString();
}

/**
 * Normalises the fields the templates need, so both post formats render:
 *  - rich format:  date + prepMinutes/cookMinutes (numbers) + ingredients/steps lists
 *  - simple format (n8n): pubDate + prepTime/cookTime ("10 mins") + Markdown body only
 */
export function recipeMeta(d: any) {
  const toMin = (n: unknown, s: unknown) => {
    if (typeof n === 'number' && !Number.isNaN(n)) return n;
    const m = String(s ?? '').match(/\d+/);
    return m ? parseInt(m[0], 10) : 0;
  };
  const prep = toMin(d.prepMinutes, d.prepTime);
  const cook = toMin(d.cookMinutes, d.cookTime);
  const date: Date | null = d.date ?? d.pubDate ?? null;
  return { prep, cook, total: prep + cook, date };
}
