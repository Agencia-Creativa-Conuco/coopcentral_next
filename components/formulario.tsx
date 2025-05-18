"use client";

import React, { useState, useEffect } from "react";
import HubspotForm from "react-hubspot-form";
import styles from "./formulario.module.scss";

export default function Form({
  formId = "",
  loadingHeight = "100%",
  ...props
}) {
  const hs_id = "20235970";

  const [submited, setSubmited] = useState(false);

  const [clienteCargado, setClienteCargado] = useState(false);

  useEffect(() => {
    setClienteCargado(true);
  }, []);

  if (!clienteCargado) {
    return <div>Cargando...</div>;
  }

  return formId ? (
    <div className={styles.formContainer} {...{ ...props }}>
      {!submited ? (
        <div className={styles.formCut}>
          <HubspotForm
            portalId={hs_id}
            formId={formId}
            onReady={() => {
              console.log("SUBMIETE");
            }}
            loading={<div>CARGANDO</div>}
          />
        </div>
      ) : (
        <p className={styles.message}>Gracias por enviar el formulario</p>
      )}
    </div>
  ) : null;
}
