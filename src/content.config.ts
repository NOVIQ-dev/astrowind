import { defineCollection } from 'astro:content';
import GhostContentAPI from '@tryghost/content-api';

const post = defineCollection({
  loader: async () => {
    try {
      const api = new GhostContentAPI({
        url: import.meta.env.GHOST_URL || '',
        key: import.meta.env.GHOST_CONTENT_API_KEY || '',
        version: "v5.0"
      });
      
      // Загружаем посты с тегами и авторами
      const posts = await api.posts.browse({ limit: 'all', include: ['tags', 'authors'] });
      
      // Мапим (переводим) поля Ghost под формат AstroWind
      return posts.map((p) => ({
        id: p.id,
        slug: p.slug || '',                     // Важно: гарантируем, что это строка
        title: p.title || '',
        publishDate: p.published_at ? new Date(p.published_at) : new Date(),
        excerpt: p.excerpt || p.custom_excerpt || '',
        image: p.feature_image || '',
        category: p.primary_tag?.name || 'Blog',
        tags: p.tags?.map(t => t.name) || [],
        author: p.primary_author?.name || 'Admin',
        draft: false,
        metadata: {
          title: p.meta_title || p.title,
          description: p.meta_description || p.excerpt,
        }
      }));
    } catch (e) {
      console.error("Ghost API Error:", e);
      return []; 
    }
  }
});

export const collections = { post };