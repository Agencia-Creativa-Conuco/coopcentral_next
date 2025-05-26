import React from "react";
import styles from "./pagination.module.scss";
import Link from "next/link";

interface Props {
  next?: string;
  previous?: string;
}

export default async function Pagination({ next, previous }: Props) {
  return (
    <div className={styles.container}>
      {next && (
        <Link href={next}>
          <em className={styles.text}>Anterior</em>
        </Link>
      )}
      {previous && (
        <Link href={previous}>
          <em className={styles.text}>Recientes</em>
        </Link>
      )}
    </div>
  );
}
