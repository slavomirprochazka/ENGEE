import { defineCollection, z } from "astro:content";

// Blog collection schema
const blogCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
};

export async function getStaticPaths() {
  const pages = await getCollection('blog')

  const paths = pages.map(page => {
    const [lang, ...slug] = page.slug.split('/');
    return { params: { lang, slug: slug.join('/') || undefined }, props: page }
  })

  return paths;
}

const { lang, slug } = Astro.params;
const page = Astro.props;
const formattedDate = page.data.date.toLocaleString(lang);

const { Content } = await page.render();
