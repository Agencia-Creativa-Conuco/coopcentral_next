import React from "react";
import styles from "./aboutTeam.module.scss";

interface Props {
  page: any;
}

export default function AboutTeam({ page }: Props) {
  const { meta_box } = page;

  const {
    about_administrative_title,
    about_administrative_show = "0",
    about_administrative_group = [],
  } = meta_box;
  return about_administrative_group.length &&
    parseInt(about_administrative_show) ? (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{about_administrative_title}</h2>
        <div className={styles.list}>
          {about_administrative_group.map((item: any, index: number) => {
            const { organization, members } = item;
            return (
              <div className={styles.card} key={index}>
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{organization}</h3>
                  <ul className={styles.members}>
                    {members.map((member: any, index: number) => {
                      const { name, jobtitle } = member;

                      return (
                        <li className={styles.member} key={index}>
                          <h4 className={styles.name}>{name}</h4>
                          <p className={styles.jobtitle}>{jobtitle}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;
}
