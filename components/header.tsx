"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";
import Navigation from "./navigation/navigation";
import { CustomContext } from "@/components/theme/custom-provider";
import { CloseIcon, MenuIcon } from "./ui/icons";

interface Props {
  settings: any;
  menu: any;
}

export default function Header({ settings, menu }: Props) {
  const logo = settings["site_logo"];

  const { setMenuOpen, isMenuOpen }: any = useContext(CustomContext);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src={logo.full_url}
            alt="Coopcentral logo"
            width={800}
            height={800}
          />
          <div className={styles.deco} />
        </Link>
        <div className={`${styles.menu} ${isMenuOpen ? "active" : ""}`}>
          <Navigation items={menu.items} isHeader color="white" />
        </div>
        <div className={styles.gadgets}>
          {/* <SearchButton /> */}
          <button
            className={styles.menuButton}
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          >
            {!isMenuOpen ? <MenuIcon /> : <CloseIcon />}
          </button>
        </div>
      </div>
      {/* <SearchModal /> */}
    </header>
  );
}
