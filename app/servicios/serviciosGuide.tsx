import Form from "@/components/formulario";
import Link from "next/link";
import { CloudIcon } from "@/components/ui/icons";
import styles from "./serviciosGuide.module.scss";

interface Props {
  page: any;
}

export default async function ServiceGuide({ page }: Props) {
  const { meta_box } = page;

  const { service_guide_title, service_guide_cta, form_id } = meta_box;

  return (
    <section className={styles.section}>
      {service_guide_cta && service_guide_title ? (
        <div className={styles.decoSection} id="oferta">
          <div className={styles.container}>
            <div className={styles.downloadCard}>
              <div className={styles.content}>
                <h2 className={styles.title}>{service_guide_title}</h2>
              </div>
              <div className={styles.downloadBox}>
                <div className={styles.downloadIcon}>
                  <CloudIcon />
                </div>
                <div className={styles.contentLink}>
                  <Link
                    href={service_guide_cta}
                    className={styles.link}
                    download
                  >
                    DESCARGAR
                  </Link>
                </div>
              </div>
            </div>
            {/* <SectionGReenDeco /> */}
          </div>
        </div>
      ) : null}
      {form_id ? (
        <section className={styles.formContainer} id="contacto">
          <div className={styles.container}>
            <h2 className={styles.formTitle}>Contáctanos</h2>
            <div className={styles.form}>
              <Form formId={form_id} />
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
}
