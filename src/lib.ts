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
