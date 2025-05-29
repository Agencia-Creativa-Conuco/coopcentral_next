"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./formulario.module.scss";
import {
  useClientReady,
  useIntersectionObserver,
} from "@/hooks/useClientReady";

// Carga diferida del componente HubSpot
const HubspotForm = dynamic(() => import("react-hubspot-form"), {
  ssr: false,
  loading: () => (
    <div className={styles.formLoading}>Cargando formulario...</div>
  ),
});

interface FormProps {
  formId?: string;
  loadingHeight?: string;
  [key: string]: any;
}

export default function Form({
  formId = "",
  loadingHeight = "100%",
  ...props
}: FormProps) {
  const hs_id = "20235970";

  const [submited, setSubmited] = useState(false);
  const [hubspotReady, setHubspotReady] = useState(false);
  const isClientReady = useClientReady();
  const { isVisible, setElement } = useIntersectionObserver(0.1);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      setElement(formRef.current);
    }
  }, [setElement]);

  useEffect(() => {
    if (isClientReady && isVisible && formId) {
      const timer = setTimeout(() => {
        setHubspotReady(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClientReady, isVisible, formId]);

  if (!formId) return null;

  return (
    <div className={styles.formContainer} ref={formRef} {...props}>
      {!submited ? (
        <div className={styles.formCut}>
          {hubspotReady ? (
            <HubspotForm
              portalId={hs_id}
              formId={formId}
              onReady={() => {
                console.log("Form ready");
              }}
              onFormSubmitted={() => {
                setSubmited(true);
              }}
              loading={
                <div className={styles.formLoading}>Cargando formulario...</div>
              }
            />
          ) : (
            <div className={styles.formPlaceholder}>
              <div className={styles.formLoading}>
                <div className={styles.spinner}></div>
                <p>Preparando formulario...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className={styles.message}>Gracias por enviar el formulario</p>
      )}
    </div>
  );
}
