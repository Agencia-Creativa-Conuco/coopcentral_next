import React from "react";
import styles from "./aboutObjetive.module.scss";
import Image from "next/image";

interface Props {
  page: any;
}

export default function AboutObjetive({ page }: Props) {
  const data = page.meta_box;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{data.about_objective_title}</h2>
        <div className={styles.cards}>
          <Card
            title={data.about_objective_title_vision}
            text={data.about_objective_copy_vision}
            icon={data.about_objective_image_vision.full_url}
          />
          <Card
            title={data.about_objective_title_mision}
            text={data.about_objective_copy_mision}
            icon={data.about_objective_image_mision.full_url}
          />
          <Card
            title={data.about_objective_title_values}
            text={data.about_objective_values.join("<br/>")}
            icon={data.about_objective_image_values.full_url}
          />
        </div>
      </div>
    </section>
  );
}

function Card({ title, text, icon }: { title: any; text: any; icon: any }) {
  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <Image src={icon} alt={title} width={800} height={800} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}
