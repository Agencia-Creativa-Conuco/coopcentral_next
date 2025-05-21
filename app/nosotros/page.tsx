import React from "react";
import styles from "./page.module.scss";
import AboutCover from "./aboutCover";
import { getPageBySlug } from "@/lib/wordpress";
import AboutObjetive from "./aboutObjetive";
import AboutHistory from "./aboutHistory";

export default async function Page() {
  const page = await getPageBySlug("nosotros");
  return (
    <main>
      <AboutCover page={page} />
      <AboutObjetive page={page} />
      <AboutHistory page={page} />
    </main>
  );
}
