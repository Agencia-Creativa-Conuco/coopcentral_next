import Image from "next/image";
import {
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  MailIcon,
} from "@/components/ui/icons";
import Link from "next/link";
import styles from "./page.module.scss";
import { getURL } from "@/lib/utils";
import { getAllSucursals, getFeaturedMediaById } from "@/lib/wordpress";

interface SucursalProps {
  sucursal: any;
  index: number;
}

async function Sucursal({ sucursal, index, ...props }: SucursalProps) {
  const { title, meta_box } = sucursal;

  const featured_media = await getFeaturedMediaById(sucursal.featured_media);

  const {
    sucursal_direction,
    sucursal_tel,
    sucursal_mail,
    sucursal_schedule,
    sucursal_url_map,
  } = meta_box;

  const isPrincipal = index == 0;

  return (
    <article
      className={`${styles.sucursal} ${
        (index == 1 || index % 12 == 0) && !isPrincipal ? "decoLeft" : ""
      } ${(index == 5 || index % 15 == 0) && !isPrincipal ? "decoRight" : ""}`}
      key={index}
      {...props}
    >
      <div
        className={`${styles.sucursalContainer} ${
          isPrincipal ? "isPrincipal" : ""
        }`}
      >
        <div className={`${styles.top} ${isPrincipal ? "isPrincipal" : ""}`}>
          <div className={styles.media}>
            <Image
              src={featured_media.source_url}
              alt={title}
              width={1920}
              height={1080}
              priority={isPrincipal}
            />
          </div>
          <svg
            className={styles.longLine}
            xmlns="http://www.w3.org/2000/svg"
            width="318.311"
            height="324.809"
            viewBox="0 0 318.311 324.809"
          >
            <path
              id="Trazado_708"
              data-name="Trazado 708"
              d="M1349.12,775.959s-104.181,162.084-244.764,237.13"
              transform="matrix(0.139, 0.99, -0.99, 0.139, 873.984, -1177.085)"
              fill="none"
              stroke="#ffe70e"
              strokeLinecap="round"
              strokeWidth="32"
            />
          </svg>
          <svg
            className={styles.shortLine}
            xmlns="http://www.w3.org/2000/svg"
            width="182.42"
            height="119.832"
            viewBox="0 0 182.42 119.832"
          >
            <path
              id="Trazado_2410"
              data-name="Trazado 2410"
              d="M1159.362,775.959s-23.412,87.863-55.006,128.544"
              transform="matrix(0.139, 0.99, -0.99, 0.139, 767.36, -1176.644)"
              fill="none"
              stroke="#ffe70e"
              strokeLinecap="round"
              strokeWidth="32"
            />
          </svg>
        </div>
        <div className={`${styles.body} ${isPrincipal ? "isPrincipal" : ""}`}>
          <Link className={styles.link} href={getURL(sucursal.link)}>
            <h2 className={styles.title}>{title.rendered}</h2>
          </Link>

          {sucursal_direction ? (
            <div className={styles.info}>
              <div className={styles.icon}>
                <LocationIcon />
              </div>
              <span className={styles.text}>{sucursal_direction}</span>
            </div>
          ) : null}
          {sucursal_tel.length ? (
            <div className={styles.info}>
              <div className={styles.icon}>
                <PhoneIcon />
              </div>
              <div>
                {sucursal_tel.map((tel: any, index: number) => {
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
            </div>
          ) : null}
          {sucursal_schedule ? (
            <div className={styles.info}>
              <div className={styles.icon}>
                <ClockIcon />
              </div>
              <span className={styles.text}>{sucursal_schedule}</span>
            </div>
          ) : null}

          {sucursal_mail.length ? (
            <div className={styles.info}>
              <div className={styles.icon}>
                <MailIcon />
              </div>
              {sucursal_mail.map((email: any, index: number) => {
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
    </article>
  );
}

export default async function Page() {
  const sucursals = (await getAllSucursals()).reverse();

  return sucursals.length ? (
    <section className={styles.section}>
      <div className={styles.mainContainer}>
        {sucursals.map((sucursal, index) => {
          return index == 0 ? (
            <Sucursal key={index} {...{ sucursal, index }} />
          ) : null;
        })}
      </div>
      <div className={styles.container}>
        {sucursals.map((sucursal, index) => {
          return index != 0 ? (
            <Sucursal key={index} {...{ sucursal, index }} />
          ) : null;
        })}
      </div>
    </section>
  ) : null;
}
