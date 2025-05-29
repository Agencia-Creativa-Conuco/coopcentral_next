"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { searchPosts, SearchResult } from "@/lib/wordpress";
import styles from "./SearchResults.module.scss";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      performSearch();
    } else {
      setLoading(false);
    }
  }, [query, page]);

  const performSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await searchPosts(query, page, 10);
      setResults(response.results);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Error al realizar la búsqueda");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      post: "Artículo",
      page: "Página",
      product: "Producto",
      social: "Proyecto Social",
      sucursal: "Sucursal",
    };
    return types[type] || type;
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").trim();
  };

  const getPostUrl = (result: SearchResult) => {
    // Usar directamente el link que proporciona WordPress
    if (result.link) {
      // Convertir URL completa a path relativo
      const url = new URL(result.link);
      return url.pathname;
    }

    // Fallback usando slug si no hay link
    const baseUrls: { [key: string]: string } = {
      post: "/blog",
      page: "",
      product: "/productos",
      social: "/proyectos-sociales",
      sucursal: "/sucursales",
    };

    const basePath = baseUrls[result.type] || "";
    return `${basePath}/${result.slug}`;
  };

  const getFeaturedImage = (result: SearchResult) => {
    // Intentar obtener la imagen desde _embedded primero
    if (result._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return result._embedded["wp:featuredmedia"][0].source_url;
    }
    if (result.featured_media) {
      return `/api/media/${result.featured_media}`;
    }
    return null;
  };

  if (!query) {
    return (
      <div className={styles.container}>
        <div className={styles.noResults}>
          <h2>Realizar búsqueda</h2>
          <p>Usa el botón de búsqueda para encontrar contenido.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Buscando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Resultados para: <span className={styles.query}>"{query}"</span>
        </h1>

        {!error && (
          <p className={styles.summary}>
            {total === 0
              ? "No se encontraron resultados"
              : `Se encontraron ${total} resultado${total === 1 ? "" : "s"}`}
          </p>
        )}
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {!error && total === 0 && (
        <div className={styles.noResults}>
          <h2>No se encontraron resultados</h2>
          <p>Intenta con otros términos de búsqueda o revisa la ortografía.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((result) => {
            const featuredImage = getFeaturedImage(result);

            return (
              <article
                key={`${result.type}-${result.id}`}
                className={styles.resultCard}
              >
                <div className={styles.cardContent}>
                  {featuredImage && (
                    <div className={styles.cardImage}>
                      <Image
                        src={featuredImage}
                        alt={stripHtml(result.title?.rendered || "")}
                        width={300}
                        height={200}
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardType} data-type={result.type}>
                        {getTypeLabel(result.type)}
                      </span>
                      {result.date && (
                        <span className={styles.cardDate}>
                          <Clock size={14} />
                          {formatDate(result.date)}
                        </span>
                      )}
                    </div>

                    <h2 className={styles.cardTitle}>
                      <Link href={getPostUrl(result)}>
                        {stripHtml(result.title?.rendered || "")}
                      </Link>
                    </h2>

                    {result.excerpt?.rendered && (
                      <p className={styles.cardExcerpt}>
                        {stripHtml(result.excerpt.rendered).substring(0, 150)}
                        ...
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <nav className={styles.pagination}>
          {page > 1 ? (
            <Link
              href={`/buscar?q=${encodeURIComponent(query)}&page=${page - 1}`}
              className={styles.paginationButton}
            >
              ← Anterior
            </Link>
          ) : (
            <span className={styles.paginationButtonDisabled}>← Anterior</span>
          )}

          <span className={styles.paginationInfo}>
            {page} de {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={`/buscar?q=${encodeURIComponent(query)}&page=${page + 1}`}
              className={styles.paginationButton}
            >
              Siguiente →
            </Link>
          ) : (
            <span className={styles.paginationButtonDisabled}>Siguiente →</span>
          )}
        </nav>
      )}
    </div>
  );
}
