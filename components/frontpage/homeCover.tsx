"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./homeCover.module.scss";
import Carousel from "react-slick";
import Link from "next/link";
import Image from "next/image";
import CTA from "../CTA";

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
  let slider1: any = [];
  let slider2: any = [];

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  return (
    <section className={styles.section}>
      <div className={styles.carouselContainer}>
        {/* @ts-ignore */}
        <Carousel
          arrows={false}
          fade
          asNavFor={nav2}
          ref={(slider: any) => (slider1 = slider)}
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
      </div>
      <div className={styles.carouselContainer}>
        {/* @ts-ignore */}
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
          ref={(slider: any) => (slider2 = slider)}
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
      </div>
    </section>
  );
}
