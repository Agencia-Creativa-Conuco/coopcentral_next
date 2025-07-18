"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./homeCover.module.scss";
import Link from "next/link";
import Image from "next/image";
import CTA from "../CTA";
import {
  useClientReady,
  useIntersectionObserver,
} from "@/hooks/useClientReady";
import Carousel from "react-slick";

interface Props {
  slides: any[];
  title: any;
  content: any;
  featured_media: string;
  meta_box: any;
}

export default function HomeCover({
  slides = [],
  title,
  content,
  featured_media,
  meta_box,
}: Props) {
  const items = slides.length
    ? slides.sort((a, b) => a.menu_order - b.menu_order)
    : [{ featured_media, title, content, meta_box }];

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [carouselReady, setCarouselReady] = useState(false);
  const isClientReady = useClientReady();
  const { isVisible, setElement } = useIntersectionObserver(0.1);
  const sectionRef = useRef<HTMLElement>(null);

  const [slider1, setSlider1] = useState();
  const [slider2, setSlider2] = useState();

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  useEffect(() => {
    if (isClientReady && isVisible) {
      // Cargar CSS de Slick solo cuando sea necesario
      import("slick-carousel/slick/slick.css");
      import("slick-carousel/slick/slick-theme.css");

      const timer = setTimeout(() => {
        setCarouselReady(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isClientReady, isVisible]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.carouselContainer}>
        {carouselReady ? (
          <Carousel
            arrows={false}
            fade
            asNavFor={nav2}
            ref={(slider: any) => {
              setSlider1(slider);
              return slider;
            }}
          >
            {items.map((slide, index) => {
              const { featured_media, meta_box } = slide;

              const cta = meta_box["cta"];
              const cta_type = meta_box["cta_type"];
              const cta_url = meta_box["cta_url"];

              return (
                <div className={styles.media} key={index}>
                  {parseInt(cta) && cta_type === "link" ? (
                    <Link href={cta_url}>
                      <div className={styles.mediaWrapper}>
                        <Image
                          className={styles.image}
                          src={featured_media}
                          width={1920}
                          height={1536}
                          alt={title.rendered}
                          priority
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className={styles.mediaWrapper}>
                      <Image
                        src={featured_media}
                        width={1920}
                        height={1536}
                        alt={title.rendered}
                      />
                    </div>
                  )}

                  <svg
                    className={styles.shortLine}
                    xmlns="http://www.w3.org/2000/svg"
                    width="177.713"
                    height="194.41"
                    viewBox="0 0 177.713 194.41"
                  >
                    <path
                      id="Trazado_3"
                      data-name="Trazado 3"
                      d="M1222.418,775.959s-50.251,63.508-118.062,92.912"
                      transform="translate(1215.002 -775.79) rotate(107)"
                      fill="none"
                      stroke="#ffe70e"
                      strokeLinecap="round"
                      strokeWidth="32"
                    />
                  </svg>

                  <svg
                    className={styles.longLine}
                    xmlns="http://www.w3.org/2000/svg"
                    width="655.535"
                    height="259.437"
                    viewBox="0 0 655.535 259.437"
                  >
                    <path
                      id="Trazado_1"
                      data-name="Trazado 1"
                      d="M1719.281,775.959s-261.734,149.574-614.925,218.827"
                      transform="translate(-1085.577 -754.128)"
                      fill="none"
                      stroke="#ffe70e"
                      strokeLinecap="round"
                      strokeWidth="32"
                    />
                  </svg>
                </div>
              );
            })}
          </Carousel>
        ) : (
          <div className={styles.fallbackContent}>
            {items.map((slide, index) => {
              const { featured_media, meta_box } = slide;
              const cta = meta_box["cta"];
              const cta_type = meta_box["cta_type"];
              const cta_url = meta_box["cta_url"];

              return index === 0 ? (
                <div className={styles.media} key={index}>
                  {parseInt(cta) && cta_type === "link" ? (
                    <Link href={cta_url}>
                      <div className={styles.mediaWrapper}>
                        <Image
                          className={styles.image}
                          src={featured_media}
                          width={1920}
                          height={1536}
                          alt={title.rendered}
                          priority
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className={styles.mediaWrapper}>
                      <Image
                        src={featured_media}
                        width={1920}
                        height={1536}
                        alt={title.rendered}
                      />
                    </div>
                  )}
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      <div className={styles.carouselContainer}>
        {carouselReady ? (
          <Carousel
            fade
            arrows={false}
            autoplay
            autoplaySpeed={8000}
            pauseOnHover
            dots
            appendDots={(dots: any) => (
              <ul className={styles.dots}>
                {dots.map((item: any, index: number) => {
                  return (
                    <div className={styles.dot} key={index}>
                      {item}
                    </div>
                  );
                })}
              </ul>
            )}
            asNavFor={nav1}
            ref={(slider: any) => {
              setSlider2(slider);
              return slider;
            }}
          >
            {items.map((slide, index) => {
              const { title, meta_box } = slide;

              const { copy } = meta_box;

              return (
                <div className={styles.content} key={index}>
                  <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                      <h2 className={styles.title}>{title.rendered}</h2>
                      <p className={styles.copy}>{copy}</p>
                      <CTA data={meta_box} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        ) : (
          <div className={styles.fallbackContent}>
            {items.map((slide, index) => {
              const { title, meta_box } = slide;
              const { copy } = meta_box;

              return index === 0 ? (
                <div className={styles.content} key={index}>
                  <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                      <h2 className={styles.title}>{title.rendered}</h2>
                      <p className={styles.copy}>{copy}</p>
                      <CTA data={meta_box} />
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
