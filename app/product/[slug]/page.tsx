import React from "react";
import styles from "./page.module.scss";
import { getProductBySlug } from "@/lib/wordpress";
import Cover from "./cover";
import Info from "./info";
import Requirements from "./requirements";
import Guide from "./guide";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Get information about the current URL.
  const page = await getProductBySlug(slug);

  // Load the post, but only if the data is ready.
  return (
    <main className={styles.container}>
      <Cover page={page} />
      <Info page={page} />
      <Requirements page={page} />
      <Guide page={page} />
    </main>
  );
}
