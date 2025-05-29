"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/searchStore";
import { X } from "lucide-react";
import styles from "./SearchModal.module.scss";

export default function SearchModal() {
  const { isOpen, closeSearch } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = inputRef.current?.value.trim();

    if (searchTerm) {
      router.push(`/buscar?q=${encodeURIComponent(searchTerm)}`);
      closeSearch();
      window.scrollTo(0, 0);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="search"
              className={styles.input}
              placeholder="Buscar..."
              autoComplete="off"
            />
            <button type="submit" className={styles.submitButton}>
              Buscar
            </button>
          </form>

          <button
            className={styles.closeButton}
            onClick={closeSearch}
            aria-label="Cerrar búsqueda"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
