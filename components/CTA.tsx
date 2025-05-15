import React from "react";
import Link from "next/link";
import styles from "./CTA.module.scss";

interface Props {
  data: any;
  prefix?: string;
}

export default function CTA({ data, prefix = "", ...props }: Props) {
  const cta = data[prefix + "cta"];
  const cta_type = data[prefix + "cta_type"];
  const cta_text = data[prefix + "cta_text"];
  const cta_url = data[prefix + "cta_url"];
  const cta_form = data[prefix + "cta_form"];

  return parseInt(cta) ? (
    <>
      {cta_type == "link" ? (
        <Link href={cta_url} {...props} className={styles.cta}>
          {cta_text}
        </Link>
      ) : (
        <button
          onClick={(e) => {
            // openModal({
            //   body: <Form formId={cta_form} cardStyle={false} />,
            // });
          }}
          {...props}
        >
          {cta_text}
        </button>
      )}
    </>
  ) : null;
}
