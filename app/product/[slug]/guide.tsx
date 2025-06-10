import Form from "@/components/formulario";
import { CloudIcon } from "@/components/ui/icons";
import styles from "./guide.module.scss";
import Link from "next/link";
import { getURL } from "@/lib/utils";

interface Props {
  page: any;
}

export default async function ProductGuide({ page }: Props) {
  const { meta_box } = page;

  const {
    product_guide_title = "",
    product_guide_cta = "",
    product_form_id,
  } = meta_box;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.decoRoundLines} />
      {product_guide_title && product_guide_cta ? (
        <section className={styles.section} id="oferta">
          <div className={styles.container}>
            <div className={styles.downloadCard}>
              <div className={styles.content}>
                <h2 className={styles.title}>{product_guide_title}</h2>
              </div>
              <div className={styles.downloadBox}>
                <div className={styles.downloadIcon}>
                  <CloudIcon />
                </div>
                <Link
                  href={getURL(product_guide_cta)}
                  download
                  className={styles.link}
                >
                  DESCARGAR
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {product_form_id ? (
        <section className={styles.section} id="contacto">
          <div className={styles.container}>
            <h2 className={styles.formTitle}>Contáctanos</h2>
            <div className={styles.form}>
              <Form formId={product_form_id} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
