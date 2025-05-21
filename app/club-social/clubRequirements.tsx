import React from "react";
import styles from "./clubRequirements.module.scss";
import { File } from "@/components/ui/icons";

interface Props {
  page: any;
}

export default async function ClubRequirements({ page }: Props) {
  const { meta_box } = page;

  const { social_club_partner_title, social_club_partner_requirements = [] } =
    meta_box;
  return social_club_partner_requirements.length ? (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.divIcon}>
            <File />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{social_club_partner_title}</h2>
            <ul className={styles.list}>
              {social_club_partner_requirements.map(
                (item: any, index: number) => (
                  <li className={styles.item} key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
