import {
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  MailIcon,
} from "@/components/ui/icons";
import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { getFeaturedMediaById, getSucursalBySlug } from "@/lib/wordpress";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSucursalBySlug(slug);

  const { title, featured_media, meta_box }: any = post;
  const image = await getFeaturedMediaById(featured_media);

  const {
    sucursal_direction,
    sucursal_tel = [],
    sucursal_mail,
    sucursal_schedule,
    sucursal_url_map,
    sucursal_code_map,
  } = meta_box;

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.media}>
          <Image
            src={image.source_url}
            alt={title}
            width={1920}
            height={1080}
          />
          <div
            className={styles.bgSection}
            // image={featured_media}
            // beforeBg={colors.primary.light}
            // afterBg={colors.primary.dark}
          ></div>
        </div>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.mapWrapper}>
              <div className={styles.map}>
                <iframe
                  className={styles.iframe}
                  src={sucursal_code_map}
                  width="800"
                  height="200"
                  //   allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{title.rendered}</h1>

              {sucursal_direction ? (
                <div className={styles.info}>
                  <span className={styles.icon}>
                    <LocationIcon />
                  </span>
                  <span className={styles.text}>{sucursal_direction}</span>
                </div>
              ) : null}
              {sucursal_tel.length ? (
                <div className={styles.info}>
                  <span className={styles.icon}>
                    <PhoneIcon />
                  </span>
                  {sucursal_tel.map((tel: string, index: number) => {
                    return (
                      <Link
                        className={styles.telLink}
                        key={index}
                        href={`tel:${tel}`}
                      >
                        <span className={styles.text}>{tel}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
              {sucursal_schedule ? (
                <div className={styles.info}>
                  <span className={styles.icon}>
                    <ClockIcon />
                  </span>
                  <span className={styles.text}>{sucursal_schedule}</span>
                </div>
              ) : null}

              {sucursal_mail.length ? (
                <div className={styles.info}>
                  <span className={styles.icon}>
                    <MailIcon />
                  </span>
                  {sucursal_mail.map((email: string, index: number) => {
                    return (
                      <Link
                        className={styles.telLink}
                        key={index}
                        href={`mailto:${email}`}
                      >
                        <span className={styles.text}>{email}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              {sucursal_url_map ? (
                <Link className={styles.link} href={sucursal_url_map}>
                  Ubicación en maps
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
