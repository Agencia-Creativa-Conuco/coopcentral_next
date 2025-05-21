import React from "react";
import styles from "./clubPartner.module.scss";
import Image from "next/image";

interface Props {
  page: any;
}
export default async function ClubPartner({ page }: Props) {
  const data = page.meta_box;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.wrapper}
          style={{ backgroundColor: "#81D977", color: "white" }}
        >
          <div className={styles.content}>
            <div className={styles.media}>
              <Image
                src={data.social_club_partner_beneficts_icon.full_url}
                alt={data.social_club_partner_beneficts_title}
                width={800}
                height={800}
              />
            </div>
            <h2 className={styles.title}>
              {data.social_club_partner_beneficts_title}
            </h2>
            <ul className={styles.list}>
              {data.social_club_partner_beneficts_copy.map(
                (item: any, index: number) => (
                  <li className={styles.item} key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div
          className={styles.wrapper}
          style={{ backgroundColor: "var(--primary-dark)", color: "white" }}
        >
          <div className={styles.content}>
            <div className={styles.media}>
              <Image
                src={data.social_club_partner_must_icon.full_url}
                alt={data.social_club_partner_must_title}
                width={800}
                height={800}
              />
            </div>
            <h2 className={styles.title}>
              {data.social_club_partner_must_title}
            </h2>
            <ul className={styles.list}>
              {data.social_club_partner_must_copy.map(
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

      <div className={styles.container} style={{ gap: "3rem" }}>
        <div className={styles.wrapper}>
          <div
            className={`${styles.content} ${styles.card}`}
            style={{ backgroundColor: "white" }}
          >
            <div className={styles.media}>
              <Image
                src={data.social_club_partner_right_icon.full_url}
                alt={data.social_club_partner_right_title}
                width={800}
                height={800}
              />
            </div>
            <h2
              className={styles.title}
              style={{ color: "var(--primary-base)" }}
            >
              {data.social_club_partner_right_title}
            </h2>
            <ul
              className={styles.list}
              style={{ color: "var(--text-color-main)" }}
            >
              {data.social_club_partner_right_copy.map(
                (item: any, index: number) => (
                  <li className={styles.item} key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className={styles.wrapper}>
          <div
            className={`${styles.content} ${styles.card}`}
            style={{ backgroundColor: "white" }}
          >
            <div className={styles.media}>
              <Image
                src={data.social_club_partner_perdition_icon.full_url}
                alt={data.social_club_partner_perdition_title}
                width={800}
                height={800}
              />
            </div>
            <h2
              className={styles.title}
              style={{ color: "var(--primary-base)" }}
            >
              {data.social_club_partner_perdition_title}
            </h2>
            <ul
              className={styles.list}
              style={{ color: "var(--text-color-main)" }}
            >
              {data.social_club_partner_perdition_copy.map(
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
  );
}
