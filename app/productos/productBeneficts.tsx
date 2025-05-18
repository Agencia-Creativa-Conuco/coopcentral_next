import Image from "next/image";
import styles from "./productBeneficts.module.scss";
import CTA from "@/components/CTA";

interface Props {
  page: any;
}

export default async function ProductsBeneficts({ page }: Props) {
  const { meta_box } = page;

  const {
    products_partner_title,
    products_partner_beneficts,
    products_partner_subtitle,
    products_partner_cta = "",
    products_partner_image,
  } = meta_box;

  return (
    <section className={styles.section} id="beneficios">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2 className={styles.title}>{products_partner_title}</h2>
            <ul className={styles.list}>
              {products_partner_beneficts.map((item: any, index: number) => (
                <li className={styles.item} key={index}>
                  {item}
                </li>
              ))}
            </ul>
            <h3 className={styles.name}> {products_partner_subtitle}</h3>
            <CTA data={meta_box} prefix="products_partner_" />
          </div>
          <div className={styles.media}>
            <div className={styles.mediaLogo}>
              <Image
                src={products_partner_image.full_url}
                alt={products_partner_subtitle}
                width={800}
                height={800}
              />
              <svg
                className={styles.shortLine}
                xmlns="http://www.w3.org/2000/svg"
                width="120.366"
                height="119.172"
                viewBox="0 0 120.366 119.172"
              >
                <path
                  id="Trazado_652"
                  data-name="Trazado 652"
                  d="M1148.8,775.959a277.146,277.146,0,0,1-44.447,36.367"
                  transform="matrix(-0.777, -0.629, 0.629, -0.777, 436.278, 1385.694)"
                  fill="none"
                  stroke="#ffe70e"
                  strokeLinecap="round"
                  strokeWidth="32"
                />
              </svg>

              <svg
                className={styles.longLine}
                xmlns="http://www.w3.org/2000/svg"
                width="195.833"
                height="179.686"
                viewBox="0 0 195.833 179.686"
              >
                <path
                  id="Trazado_3"
                  data-name="Trazado 3"
                  d="M1222.418,775.959s-50.251,63.508-118.062,92.912"
                  transform="translate(951.125 1231.053) rotate(-162)"
                  fill="none"
                  stroke="#ffe70e"
                  strokeLinecap="round"
                  strokeWidth="32"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
