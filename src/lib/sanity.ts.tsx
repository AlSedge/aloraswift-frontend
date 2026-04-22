import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '2fs2ltni', // Replace this!
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

export interface SanityBook {
  _id: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  coverUrl?: string;
}

export async function fetchSanityBooks(): Promise<SanityBook[]> {
  const query = `*[_type == "book"] | order(_createdAt asc) {
    _id,
    title,
    description,
    "color": colorClass,
    "textColor": textClass,
    "coverUrl": coverImage.asset->url
  }`;
  
  const books = await sanityClient.fetch(query);
  return books;
}