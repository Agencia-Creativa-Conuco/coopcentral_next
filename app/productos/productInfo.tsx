import Image from "next/image";
import styles from "./productInfo.module.scss";
import Link from "next/link";

interface Props {
  page: any;
}

export default async function ProductsInfo({ page }: Props) {
  const { meta_box, title, products } = page;

  return products.length ? (
    <section className={styles.section} id="productos">
      <div className={styles.container}>
        <h1 className={styles.title}>{title.rendered}</h1>

        <div className={styles.products}>
          {products.map((product: any, index: number) => {
            const { title, meta_box, link } = product;

            const { product_copy, product_icon } = meta_box;

            return (
              <Link className={styles.link} href={link} key={index}>
                <div className={styles.card}>
                  <Image
                    alt={title.rendered}
                    src={product_icon.full_url}
                    width={800}
                    height={800}
                  />
                  <div className={styles.content}>
                    <h6 className={styles.name}>{title.rendered} </h6>
                    <div dangerouslySetInnerHTML={{ __html: product_copy }} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;
}
