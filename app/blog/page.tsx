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

import React, { use } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getFeaturedMediaById } from "@/lib/wordpress";
import { ClockIcon } from "@/components/ui/icons";
import Pagination from "@/components/pagination";
import { getURL } from "@/lib/utils";

export default async function Page() {
  const posts = await Promise.all(
    (
      await getAllPosts()
    ).map(async (post) => {
      const featured_media = await getFeaturedMediaById(post.featured_media);

      return {
        ...post,
        featured_media: featured_media,
      };
    })
  );
  const headers = (await fetch(`${host}/wp-json/wp/v2/posts`)).headers;

  return posts.length ? (
    <main>
      <section className={styles.section}>
        <div className={styles.container}>
          {posts.map((post, index: number) => {
            const { title, excerpt, link, featured_media } = post;
            // Get a human readable date.
            const date = new Date(post.date);

            const isPrincipal = index == 0;

            return (
              <div className={styles.card} key={index}>
                <Link className={styles.link} href={getURL(link)}>
                  <div className={styles.cardImage}>
                    <div className={styles.image}>
                      <Image
                        src={featured_media.source_url}
                        alt={title.rendered}
                        width={1920}
                        height={1080}
                        priority={isPrincipal ?? false}
                      />
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.title}>{title.rendered}</h2>
                    <div
                      className={styles.excerpt}
                      dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                    />

                    <div className={styles.meta}>
                      <span className={styles.metaIcon}>
                        <ClockIcon />
                      </span>
                      <span
                        className={styles.metaText}
                      >{` ${date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          <Pagination />
        </div>
      </section>
    </main>
  ) : null;
}
