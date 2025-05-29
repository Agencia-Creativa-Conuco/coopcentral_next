"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chatbot.module.scss";
import { ChatIcon } from "@/components/ui/icons";
import { CloseIcon } from "@/components/ui/icons";
import { useClientReady } from "@/hooks/useClientReady";

interface Props {
  className?: string;
}

export default function Chatbot({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isClientReady = useClientReady();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isLoaded && !isOpen && isClientReady) {
      // Cargar el iframe solo cuando se abre por primera vez
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setIframeReady(true);
      }, 500);
    }
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeChatbot();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className={`${styles.chatbotContainer} ${className || ""}`}>
      {/* Botón flotante */}
      <button
        className={`${styles.chatbotButton} ${isOpen ? styles.active : ""}`}
        onClick={toggleChatbot}
        aria-label="Abrir chatbot"
        title="¿Necesitas ayuda? Chatea con nosotros"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {/* Ventana del chatbot */}
      <div
        className={`${styles.chatbotWindow} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.chatbotHeader}>
          <div className={styles.headerContent}>
            <button
              className={styles.closeButton}
              onClick={closeChatbot}
              aria-label="Cerrar chatbot"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className={styles.chatbotBody}>
          {isLoaded && iframeReady ? (
            <iframe
              ref={iframeRef}
              src="https://copilotstudio.microsoft.com/environments/Default-8485d054-e02c-43bf-ac43-6b7a0077c5b3/bots/crc25_coopAmigo/webchat?__version__=2"
              frameBorder="0"
              className={styles.chatbotIframe}
              title="CoopAmigo - Asistente virtual de Coopcentral"
              loading="lazy"
            />
          ) : (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p>Conectando con CoopAmigo...</p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para móvil */}
      {isOpen && (
        <div className={styles.chatbotOverlay} onClick={closeChatbot} />
      )}
    </div>
  );
}
