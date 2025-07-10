import React from "react";
import styles from "./servicioSocialContent.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  page: any;
  posts: any[];
}

export default async function ServicioSocialContent({ page, posts }: Props) {
  const { meta_box } = page;

  const { social_services_objetive_title } = meta_box;

  return posts.length ? (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>{social_services_objetive_title}</h3>
        <div className={styles.list}>
          {posts.map((social: any, index: number) => {
            const { title, excerpt, featured_media, link } = social;

            return (
              <div className={styles.card} key={index}>
                <Link href={link} className={styles.link}>
                  <div className={styles.content}>
                    <div className={styles.media}>
                      {featured_media && featured_media.source_url ? (
                        <Image
                          src={featured_media.source_url}
                          alt={title.rendered}
                          width={1920}
                          height={1080}
                        />
                      ) : null}
                    </div>
                    <h3 className={styles.title}>{title.rendered}</h3>
                    <div
                      className={styles.copy}
                      dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;
}
