import { defineCollection } from 'astro:content';
import { ghostLoader } from '@matthiesenxyz/astro-ghostcms/loaders';

const post = defineCollection({
  loader: ghostLoader({
    url: import.meta.env.GHOST_URL,
    key: import.meta.env.GHOST_CONTENT_API_KEY,
  }),
});

export const collections = { post };