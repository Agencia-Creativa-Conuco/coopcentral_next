import React from "react";
import styles from "./homeInfo.module.scss";
import Image from "next/image";
import { ShortDecoLine } from "../icons/decorations";

interface Props {
  data: any;
}

export default async function HomeInfo({ data }: Props) {
  return (
    <section id="beneficios" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.media}>
              <div className={styles.mediaWrapper}>
                <Image
                  src={data.info_image.full_url}
                  alt="Servicios CoopCentral"
                  width={1920}
                  height={1080}
                />
              </div>
              <ShortDecoLine />
            </div>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{data.info_title}</h2>
            <div
              className={styles.copy}
              dangerouslySetInnerHTML={{ __html: data.info_copy }}
            />
          </div>
        </div>
      </div>

      <div className={styles.decoOval} />
      <div className={styles.decoRoundLInes} />
    </section>
  );
}
