import React from "react";
import ServicioSocialCover from "./servicioSocialCover";
import { getFeaturedMediaById, getPageBySlug } from "@/lib/wordpress";
import ServicioSocialContent from "./servicioSocialContent";

export default async function page() {
  const page: any = await getPageBySlug("servicio-social");

  return (
    <main>
      <ServicioSocialCover page={page} />
      <ServicioSocialContent page={page} />
    </main>
  );
}
