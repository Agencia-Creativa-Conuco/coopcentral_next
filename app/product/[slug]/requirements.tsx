import { File } from "@/components/ui/icons";
import styles from "./requirements.module.scss";

interface Props {
  page: any;
}

export default async function ProductRequirements({ page }: Props) {
  const { meta_box } = page;

  const { product_requirements_title, product_requirements_copy = [] } =
    meta_box;

  return product_requirements_copy.length ? (
    <section className={styles.section} id="requisitos">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.icon}>
            <div className={styles.iconMedia}>
              <File />
            </div>
          </div>
          <h2 className={styles.title}>{product_requirements_title}</h2>
        </div>
        <div className={styles.content}>
          <ul className={styles.list}>
            {product_requirements_copy.map((item: any, index: number) => (
              <li className={styles.item} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  ) : null;
}
