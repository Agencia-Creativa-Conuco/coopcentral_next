import React from "react";
import ServicioSocialCover from "./servicioSocialCover";
import { getFeaturedMediaById, getPageBySlug } from "@/lib/wordpress";
import ServicioSocialContent from "./servicioSocialContent";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  // { params, searchParams }: Props, // Descomenta si necesitas usar parámetros
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Obtener datos de la página
  const page = await getPageBySlug("servicio-social");
  const featured_media_url = page.featured_media
    ? (await getFeaturedMediaById(page.featured_media)).source_url
    : "/default-og-image.png";

  return {
    title: page.title?.rendered
      ? `${page.title.rendered} - Coopcentral`
      : "Servicio Social - Coopcentral",
    description:
      page.excerpt?.rendered ||
      "Conoce los programas de servicio social de Coopcentral. Iniciativas comunitarias, responsabilidad social y proyectos de impacto para el bienestar de nuestros asociados y la comunidad.",
    openGraph: {
      title: page.title?.rendered || "Servicio Social - Coopcentral",
      description:
        page.excerpt?.rendered ||
        "Conoce los programas de servicio social de Coopcentral. Iniciativas comunitarias, responsabilidad social y proyectos de impacto para el bienestar de nuestros asociados y la comunidad.",
      url: "https://www.coopcentral.do/servicio-social",
      siteName: "Coopcentral",
      images: [
        {
          url: featured_media_url,
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_DO",
      type: "website",
    },
    keywords: [
      "servicio social",
      "coopcentral",
      "responsabilidad social",
      "programas comunitarios",
      "iniciativas sociales",
      "bienestar",
      "comunidad",
      "proyectos sociales",
      "cooperativa",
    ],
    alternates: {
      canonical: "https://www.coopcentral.do/servicio-social",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function page() {
  const page: any = await getPageBySlug("servicio-social");

  return (
    <main>
      <ServicioSocialCover page={page} />
      <ServicioSocialContent page={page} />
    </main>
  );
}
