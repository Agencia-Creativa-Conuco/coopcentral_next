"use client";
import React, { useContext } from "react";
import Link from "next/link";
import styles from "./CTA.module.scss";
import { getURL } from "@/lib/utils";
import Form from "./formulario";
import { CustomContext } from "@/components/theme/custom-provider";

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

  const { openModal, setModalBody }: any = useContext(CustomContext);

  return parseInt(cta) ? (
    <>
      {cta_type == "link" ? (
        <Link href={getURL(cta_url)} {...props} className={styles.cta}>
          {cta_text}
        </Link>
      ) : (
        <button
          onClick={(e) => {
            setModalBody(<Form formId={cta_form} />);
            openModal(true);
          }}
          className={styles.cta}
          {...props}
        >
          {cta_text}
        </button>
      )}
    </>
  ) : null;
}
