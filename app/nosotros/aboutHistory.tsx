"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./aboutHistory.module.scss";

interface Props {
  page: any;
}

export default function AboutHistory({ page }: Props) {
  const [active, setActive] = useState(false);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentMedia}>
          <Image
            className={styles.media}
            src={page.meta_box.about_history_image.full_url}
            alt={page.meta_box.about_history_title}
            width={800}
            height={800}
          />

          <svg
            className={styles.longLine}
            xmlns="http://www.w3.org/2000/svg"
            width="271.665"
            height="303.341"
            viewBox="0 0 271.665 303.341"
          >
            <path
              id="Trazado_705"
              data-name="Trazado 705"
              d="M1275.63,665.735s-44.709,47.4-114.878,66.978c-70.349,17.073-120.772-.8-138.479-7.758"
              transform="translate(1395.051 -323.749) rotate(128)"
              fill="none"
              stroke="#ffe70e"
              strokeLinecap="round"
              strokeWidth="32"
            />
          </svg>

          <svg
            className={styles.shortLine}
            xmlns="http://www.w3.org/2000/svg"
            width="76.037"
            height="107.214"
            viewBox="0 0 76.037 107.214"
          >
            <path
              id="Trazado_704"
              data-name="Trazado 704"
              d="M1162.583,775.959a211.918,211.918,0,0,1-58.227,20.72"
              transform="translate(635.598 -1190.183) rotate(81)"
              fill="none"
              stroke="#ffe70e"
              strokeLinecap="round"
              strokeWidth="32"
            />
          </svg>
        </div>
        <h2 className={styles.title}>{page.meta_box.about_history_title}</h2>
        <div className={styles.contentWrapper}>
          <div
            className={`${styles.content} ${active ? "active" : ""}`}
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />

          <div className={styles.contentToggle}>
            <p className={styles.toggle} onClick={() => setActive(!active)}>
              {" "}
              {!active ? `Leer más` : `Leer menos`}{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
