"use client";

import React from "react";
import styles from "./clubCarousel.module.scss";
import Carousel from "react-slick";
import Image from "next/image";
import { mqVal } from "@/lib/constanst";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  page: any;
}

export default function ClubCarousel({ page }: Props) {
  const { meta_box } = page;

  const { social_club_carrousel_images } = meta_box;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* @ts-ignore */}
        <Carousel
          autoplay
          slidesToShow={4}
          responsive={[
            {
              breakpoint: mqVal.sm,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: mqVal.md,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: mqVal.lg,
              settings: {
                slidesToShow: 3,
              },
            },
          ]}
        >
          {social_club_carrousel_images.map((image: any, index: number) => {
            return (
              <div className={styles.media} key={index}>
                <Image
                  src={image.full_url}
                  alt={`Club Social imagen ${index}`}
                  width={1920}
                  height={1080}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
