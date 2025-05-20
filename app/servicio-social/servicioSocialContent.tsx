import React from "react";
import styles from "./servicioSocialContent.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  page: any;
}

export default async function ServicioSocialContent({ page }: Props) {
  const { meta_box, socials = [] } = page;

  const { social_services_objetive_title } = meta_box;

  return socials.length ? (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>{social_services_objetive_title}</h3>
        <div className={styles.list}>
          {socials.map((social: any, index: number) => {
            const { title, excerpt, featured_media, link } = social;
            console.log(featured_media);

            return (
              <div className={styles.card} key={index}>
                <Link href={link} className={styles.link}>
                  <div className={styles.content}>
                    <div className={styles.media}>
                      <Image
                        src={featured_media.full_url}
                        alt={title.rendered}
                        width={1920}
                        height={1080}
                      />
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
        <div className={styles.greenDeco} />
      </div>
    </section>
  ) : null;
}
