import React from "react";
import LoanCalculator from "@/components/loanCalculator";
import styles from "./productCalculator.module.scss";

interface Props {
  page: any;
}

export default async function ProductsCalcultor({ page }: Props) {
  const { meta_box } = page;

  const { products_calculator_title = "Calculadora de préstamos" } = meta_box;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{products_calculator_title}</h2>
        <div className={styles.wrapper}>
          <LoanCalculator />
        </div>
      </div>
    </section>
  );
}
