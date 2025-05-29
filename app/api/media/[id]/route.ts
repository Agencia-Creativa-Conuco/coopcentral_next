import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  process.env.WORDPRESS_URL ||
  "https://coopcentral.do";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(`${API_URL}/wp-json/wp/v2/media/${id}`, {
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const media = await response.json();

    // Redirigir a la URL de la imagen
    return NextResponse.redirect(media.source_url);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
