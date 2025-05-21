import Image from "next/image";
import styles from "./clubInfo.module.scss";

interface Props {
  page: any;
}

export default async function SocialClubInfo({ page }: Props) {
  const data = page.meta_box;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.divTitle}>
            <h2 className={styles.title}>{data.social_club_info_title}</h2>
          </div>
          <ul className={styles.list}>
            {data.social_club_info_copy.map((item: any, index: number) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
        <div className={styles.mediaLogo}>
          <Image
            src={data.social_club_info_image.full_url}
            alt={data.social_club_info_title}
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </section>
  );
}
