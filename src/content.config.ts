import { defineCollection } from 'astro:content';
import GhostContentAPI from '@tryghost/content-api';

// Инициализируем официальный API Ghost
const api = new GhostContentAPI({
  url: import.meta.env.GHOST_URL,
  key: import.meta.env.GHOST_CONTENT_API_KEY,
  version: "v5.0"
});

const post = defineCollection({
  loader: async () => {
    // Получаем все посты через официальный SDK
    const posts = await api.posts.browse({ limit: 'all', include: ['tags', 'authors'] });
    
    // Превращаем их в формат, который понимает Astro
    return posts.map((p) => ({
      id: p.id,
      ...p
    }));
  },
});

export const collections = { post };