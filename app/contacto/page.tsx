import React from "react";
import styles from "./page.module.scss";
import ContactCover from "./contactCover";
import { getPageBySlug } from "@/lib/wordpress";

export default async function Page() {
  const page = await getPageBySlug("contacto");

  return (
    <main>
      <ContactCover page={page} />
    </main>
  );
}
