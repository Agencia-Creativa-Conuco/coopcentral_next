import { Suspense } from "react";
import SearchResults from "./SearchResults";
import styles from "./page.module.scss";

export default function SearchPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div className={styles.loading}>Buscando...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}

export const metadata = {
  title: "Búsqueda - Coopcentral",
  description: "Resultados de búsqueda en Coopcentral",
};
