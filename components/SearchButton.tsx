"use client";
import React from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/searchStore";
import styles from "./SearchButton.module.scss";

export default function SearchButton() {
  const { openSearch } = useSearchStore();

  return (
    <button
      className={styles.button}
      onClick={openSearch}
      aria-label="Abrir búsqueda"
    >
      <Search size={20} />
    </button>
  );
}
