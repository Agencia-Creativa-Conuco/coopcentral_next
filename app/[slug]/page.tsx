import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPosts,
} from "@/lib/wordpress";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn, getURL } from "@/lib/utils";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

import Balancer from "react-wrap-balancer";

import type { Metadata } from "next";
import { CalendarIcon, UserIcon } from "@/components/ui/icons";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", post.title.rendered);
  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  ogUrl.searchParams.append("description", description);

  return {
    title: post.title.rendered,
    description: description,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;

  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
    // <Section>
    //   <Container>
    //     <Prose>
    //       <h1>
    //         <Balancer>
    //           <span
    //             dangerouslySetInnerHTML={{ __html: post.title.rendered }}
    //           ></span>
    //         </Balancer>
    //       </h1>
    //       <div className="flex justify-between items-center gap-4 text-sm mb-4">
    //         <h5>
    //           Published {date} by{" "}
    //           {author.name && (
    //             <span>
    //               <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
    //             </span>
    //           )}
    //         </h5>

    //         <Link
    //           href={`/posts/?category=${category.id}`}
    //           className={cn(
    //             badgeVariants({ variant: "outline" }),
    //             "!no-underline"
    //           )}
    //         >
    //           {category.name}
    //         </Link>
    //       </div>
    //       {featuredMedia?.source_url && (
    //         <div className="h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
    //           {/* eslint-disable-next-line */}
    //           <img
    //             className="w-full h-full object-cover"
    //             src={featuredMedia.source_url}
    //             alt={post.title.rendered}
    //           />
    //         </div>
    //       )}
    //     </Prose>

    //     <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    //   </Container>
    // </Section>

    <main>
      <article className={styles.section}>
        <div className={styles.container}>
          <header className={styles.header}>
            {/* Look at the settings to see if we should include the featured image */}
            {featuredMedia && (
              <div className={styles.media}>
                <Image
                  src={featuredMedia.source_url}
                  alt={post.title.rendered}
                  width={1920}
                  height={1080}
                  style={{
                    borderRadius: "100rem",
                    overflow: "hidden",
                  }}
                />

                <svg
                  className={styles.leftLine}
                  xmlns="http://www.w3.org/2000/svg"
                  width="349.463"
                  height="450.2"
                  viewBox="0 0 349.463 450.2"
                >
                  <path
                    id="Trazado_1"
                    data-name="Trazado 1"
                    d="M1370.966,665.735s-75.181,66.875-171.754,99.162c-96.821,28.163-190.3,16.151-214.672,4.673"
                    transform="translate(1388.068 -435.08) rotate(120)"
                    fill="none"
                    stroke="#ffe70e"
                    strokeLinecap="round"
                    strokeWidth="32"
                  />
                </svg>

                <svg
                  className={styles.rightLine}
                  xmlns="http://www.w3.org/2000/svg"
                  width="349.463"
                  height="450.2"
                  viewBox="0 0 349.463 450.2"
                >
                  <path
                    id="Trazado_1"
                    data-name="Trazado 1"
                    d="M1370.966,665.735s-75.181,66.875-171.754,99.162c-96.821,28.163-190.3,16.151-214.672,4.673"
                    transform="translate(1388.068 -435.08) rotate(120)"
                    fill="none"
                    stroke="#ffe70e"
                    strokeLinecap="round"
                    strokeWidth="32"
                  />
                </svg>
              </div>
            )}

            <div>
              {/* Only display author and date on posts */}
              {
                <div className={styles.meta}>
                  {author && (
                    <Link href={author.link}>
                      <p className={styles.author}>
                        <span className={styles.metaIcon}>
                          <UserIcon />
                        </span>
                        <span className={styles.metaText}>
                          <b> {author.name} </b>
                        </span>
                      </p>
                    </Link>
                  )}
                  <p className={styles.fecha}>
                    <span className={styles.metaIcon}>
                      <CalendarIcon />
                    </span>
                    {/* <span className={styles.metaText}>
                      <b>{` ${date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`}</b>
                    </span> */}
                  </p>
                </div>
              }

              <h1
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>
          </header>
          <Article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </article>
    </main>
  );
}
