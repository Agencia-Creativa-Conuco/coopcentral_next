import Image from "next/image";
import Formulario from "@/components/formulario";
import styles from "./homeNewsletter.module.scss";

interface Props {
  page: any;
}

export default async function HomeNewsletter({ page }: Props) {
  const { meta_box } = page;

  const {
    newsletter_image,
    newsletter_title,
    newsletter_copy,
    newsletter_form_id,
  } = meta_box;

  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.media}>
            <div className={styles.mediaWrapper}>
              <Image
                src={newsletter_image.full_url}
                alt={newsletter_title}
                width={800}
                height={800}
              />
            </div>
            <svg
              className={styles.shortLine}
              xmlns="http://www.w3.org/2000/svg"
              width="160.029"
              height="180.935"
              viewBox="0 0 160.029 180.935"
            >
              <path
                id="Trazado_673"
                data-name="Trazado 673"
                d="M1222.418,775.959s-50.251,63.508-118.062,92.912"
                transform="translate(-913.674 1111.696) rotate(-81)"
                fill="none"
                stroke="#ffe70e"
                strokeLinecap="round"
                strokeWidth="32"
              />
            </svg>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{newsletter_title}</h2>
            <p className={styles.description}>{newsletter_copy}</p>
            <Formulario formId={newsletter_form_id} />
          </div>
        </div>
      </div>
    </section>
  );
}
