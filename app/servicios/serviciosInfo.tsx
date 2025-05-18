import Image from "next/image";
import styles from "./serviciosInfo.module.scss";

interface Props {
  page: any;
}

export default async function ServiceInfo({ page }: Props) {
  const { services = [], title } = page;

  return services.length ? (
    <section className={styles.section} id="servicios">
      <div className={styles.container}>
        <h1 className={styles.title}> {title.rendered}</h1>
        <div className={styles.services}>
          {services.map((item: any, index: number) => {
            const { title, image, copy } = item;

            return (
              <div className={styles.service} key={index}>
                <Image
                  className={styles.image}
                  src={image.full_url}
                  alt={title}
                  width={800}
                  height={800}
                />
                <div className={styles.content}>
                  <h3 className={styles.name}> {title} </h3>
                  <div dangerouslySetInnerHTML={{ __html: copy }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;
}
