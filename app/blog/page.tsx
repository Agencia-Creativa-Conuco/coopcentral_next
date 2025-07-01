import { Metadata } from "next";

const host = process.env.WORDPRESS_URL;

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "Blog - Coopcentral";
  const pageDescription =
    "Descubre las últimas noticias, artículos y consejos en el blog de Coopcentral.";
  const siteUrl = "https://www.coopcentral.do/blog";
  const defaultOgImage = "/default-og-image.png";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: siteUrl,
      siteName: "Coopcentral",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_DO",
      type: "website",
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getFeaturedMediaById } from "@/lib/wordpress";
import { ClockIcon } from "@/components/ui/icons";
import Pagination from "@/components/pagination";
import { getURL } from "@/lib/utils";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || "1");
  const {
    posts: postsData,
    totalPages,
    currentPage: actualPage,
  } = await getAllPosts({
    page: currentPage,
    per_page: 9, // Número de posts por página
  });

  const posts = await Promise.all(
    postsData.map(async (post) => {
      if (post.featured_media === 0) {
        return post;
      }
      // Si no hay featured_media, lo dejamos como n
      const featured_media = await getFeaturedMediaById(post.featured_media);
      return {
        ...post,
        featured_media: featured_media,
      };
    })
  );

  return posts.length ? (
    <main>
      <section className={styles.section}>
        <div className={styles.container}>
          {posts.map((post, index: number) => {
            const { title, excerpt, link, featured_media } = post;
            // Get a human readable date.
            const date = new Date(post.date);

            const isPrincipal = index === 0 && actualPage === 1; // Solo el primer post de la primera página

            return (
              <div className={styles.card} key={`${post.id}-${index}`}>
                <Link className={styles.link} href={getURL(link)}>
                  <div className={styles.cardImage}>
                    <div className={styles.image}>
                      {/* @ts-ignore */}
                      {featured_media?.source_url ? (
                        <Image
                          src={
                            // @ts-ignore
                            featured_media?.source_url || "/default-image.jpg"
                          }
                          alt={title?.rendered || "Post"}
                          width={1920}
                          height={1080}
                          priority={isPrincipal}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.title}>
                      {title?.rendered || "Sin título"}
                    </h2>
                    <div
                      className={styles.excerpt}
                      dangerouslySetInnerHTML={{
                        __html: excerpt?.rendered || "",
                      }}
                    />

                    <div className={styles.meta}>
                      <span className={styles.metaIcon}>
                        <ClockIcon />
                      </span>
                      <span className={styles.metaText}>
                        {date.toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={actualPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </section>
    </main>
  ) : (
    <main>
      <section className={styles.section}>
        <div className={styles.container}>
          <p>No se encontraron posts.</p>
        </div>
      </section>
    </main>
  );
}
