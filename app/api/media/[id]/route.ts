import { NextRequest, NextResponse } from "next/server";
import { getFeaturedMediaById } from "@/lib/wordpress";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID de media requerido" },
        { status: 400 }
      );
    }

    // Obtener la media desde WordPress
    const media = await getFeaturedMediaById(parseInt(id));

    if (!media || !media.source_url) {
      return NextResponse.json(
        { error: "Media no encontrada" },
        { status: 404 }
      );
    }

    // Redirigir a la URL de la imagen en WordPress
    return NextResponse.redirect(media.source_url);
  } catch (error) {
    console.error("Error al obtener media:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
