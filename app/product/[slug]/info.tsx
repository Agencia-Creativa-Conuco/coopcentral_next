import Image from "next/image";
import styles from "./info.module.scss";

interface Props {
  page: any;
}

export default async function ProductInfo({ page }: Props) {
  const { meta_box, title, content } = await page;

  const { product_description, product_image, product_icon } = meta_box;

  return (
    <section className={styles.section} id="producto">
      <div className={styles.container}>
        <div className={styles.media}>
          <div className={styles.mediaWrapper}>
            <Image
              className={styles.image}
              src={product_image.full_url}
              alt={title.rendered}
              width={1920}
              height={1080}
            />
          </div>

          <svg
            className={styles.shortLine}
            xmlns="http://www.w3.org/2000/svg"
            width="245.029"
            height="118.471"
            viewBox="0 0 245.029 118.471"
          >
            <path
              id="Trazado_675"
              data-name="Trazado 675"
              d="M1302.879,775.959s-84.5,42.459-198.523,62.117"
              transform="matrix(-0.998, -0.07, 0.07, -0.998, 1268.504, 946.858)"
              fill="none"
              stroke="#ffe70e"
              strokeLinecap="round"
              strokeWidth="32"
            />
          </svg>

          <div className={styles.icon}>
            <div className={styles.iconWrapper}>
              <Image
                src={product_icon.full_url}
                alt={title.rendered + "icon"}
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: product_description }} />
        </div>
      </div>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
      </div>
    </section>
  );
}
