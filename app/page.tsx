// Craft Imports
import { Section, Container, Prose } from "@/components/craft";
import HomeCover from "@/components/frontpage/homeCover";
import {
  getAllSlides,
  getFeaturedMediaById,
  getPageById,
  getPageBySlug,
} from "@/lib/wordpress";

// This page is using the craft.tsx component and design system
export default async function Home() {
  const page = await getPageBySlug("coopcentral");
  const slides = await Promise.all(
    (
      await getAllSlides()
    ).map(async (slide) => {
      const featured_media = await getFeaturedMediaById(slide.featured_media);
      return {
        ...slide,
        featured_media: featured_media.source_url,
      };
    })
  );
  const featured_media = (await getFeaturedMediaById(page.featured_media))
    .source_url;
  const { title, content, meta_box } = page;

  return (
    <Section>
      <Container>
        <main className="space-y-6">
          <HomeCover
            {...{ slides, page, featured_media, title, content, meta_box }}
          />
        </main>
      </Container>
    </Section>
  );
}
