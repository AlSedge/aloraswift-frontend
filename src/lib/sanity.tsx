import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '2fs2ltni',
  dataset: 'production',
  useCdn: false, // Set to false to ensure we get fresh data immediately
  apiVersion: '2024-04-22', // Today's date
});

export interface SanityBook {
  _id: string;
  title: string;
  description: string;
  coverUrl?: string;
  backgroundColor: string;
  textColor: string;
  order: number;
}

// Fetch all books, ordered by the custom "order" field
export async function fetchSanityBooks(): Promise<SanityBook[]> {
  const query = `*[_type == "book"] | order(order asc) {
    _id,
    title,
    description,
    "coverUrl": coverImage.asset->url,
    backgroundColor,
    textColor,
    order
  }`;
  
  return sanityClient.fetch(query);
}