import React from "react";
import styles from "./page.module.scss";
import ServiceCover from "./serviciosCover";
import { getPageBySlug } from "@/lib/wordpress";
import ServiceInfo from "./serviciosInfo";
import ServiceGuide from "./serviciosGuide";

export default async function ServicePage() {
  const page = await getPageBySlug("servicios");

  return (
    <main className={styles.container}>
      <ServiceCover page={page} />
      <ServiceInfo page={page} />
      <ServiceGuide page={page} />
    </main>
  );
}
