import React from "react";
import styles from "./pagination.module.scss";
import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: Props) {
  if (totalPages <= 1) return null;

  const generatePageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}?page=${page}`;
  };

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={styles.container}>
      {hasPrevious && (
        <Link href={generatePageUrl(currentPage - 1)} className={styles.link}>
          <em className={styles.text}>Anterior</em>
        </Link>
      )}

      <div className={styles.pageNumbers}>
        {/* Mostrar números de página */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={generatePageUrl(pageNum)}
              className={`${styles.pageLink} ${isActive ? styles.active : ""}`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {hasNext && (
        <Link href={generatePageUrl(currentPage + 1)} className={styles.link}>
          <em className={styles.text}>Siguiente</em>
        </Link>
      )}
    </div>
  );
}
