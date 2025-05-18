import Link from "next/link";
import styles from "./homeProducts.module.scss";
import Image from "next/image";

interface Props {
  page: any;
}

export default async function HomeProducts({ page }: Props) {
  const { meta_box, products = [] } = page;

  const { products_title } = meta_box;

  return products.length ? (
    <section className={styles.section} id="productos">
      <div className={styles.container}>
        <h2 className={styles.title}>{products_title}</h2>
        <div className={styles.products}>
          {products
            .sort((a, b) => {
              return (
                (parseInt(a.meta_box.product_home_order) || 1000000) -
                (parseInt(b.meta_box.product_home_order) || 1000000)
              );
            })
            .map((product, index) => {
              if (index > 2) {
                return null;
              }

              const { meta_box, title } = product;

              const { product_copy, product_icon } = meta_box;

              return (
                <div className={styles.product} key={index}>
                  <Link className={styles.link} href={product.link}>
                    <div className={styles.media}>
                      <div className={styles.mediaWrapper}>
                        <Image
                          src={product_icon.full_url}
                          alt={title.rendered}
                          width={800}
                          height={800}
                        />
                      </div>
                    </div>
                    <div className={styles.content}>
                      <h3 className={styles.name}>{title.rendered}</h3>
                      <p className={styles.copy}>{product_copy}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  ) : null;
}
