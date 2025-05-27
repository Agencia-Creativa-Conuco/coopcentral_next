import React from "react";
import ProductsCover from "./productCover";
import styles from "./page.module.scss";
import { getPageBySlug } from "@/lib/wordpress";
import ProductsInfo from "./productInfo";
import ProductsBeneficts from "./productBeneficts";
import ProductsCalcultor from "./productCalculator";

export default async function ProductsPage() {
  const page = await getPageBySlug("productos");
  return (
    <main className={styles.container}>
      <ProductsCover page={page} />
      <ProductsInfo page={page} />
      <ProductsBeneficts page={page} />
      <ProductsCalcultor page={page} />
    </main>
  );
}
