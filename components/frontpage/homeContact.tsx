import Form from "../formulario";
import styles from "./homeContact.module.scss";

interface Props {
  page: any;
}

export default async function HomeContact({ page }: Props) {
  const { meta_box } = page;

  const { form_id } = meta_box;

  return form_id ? (
    <section className={styles.section} id="contacto">
      <div className={styles.container}>
        <h2 className={styles.title}>Contáctanos</h2>
        <div className={styles.form}>
          <Form formId={form_id} />
        </div>
      </div>
    </section>
  ) : null;
}
