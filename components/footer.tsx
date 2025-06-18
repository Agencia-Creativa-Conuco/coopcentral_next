import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/navigation/navigation";
import { Facebook2Icon, InstagramIcon, WhatsappIcon } from "./ui/icons";

interface Props {
  settings: any;
  menu: any;
}

export default function Footer({ menu, settings }: Props) {
  const logo = settings["site_logo_footer"];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src={logo.full_url}
              className={styles.logo}
              alt="Coopcentral logo"
              width={1920}
              height={1080}
            />
          </Link>
          <Navigation items={menu.items} split isMain color="#565656" />
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <div className={styles.social}>
              {settings.url_facebook ? (
                <Link className={styles.iconLink} href={settings.url_facebook}>
                  <Facebook2Icon />
                </Link>
              ) : null}

              {settings.url_instagram ? (
                <Link className={styles.iconLink} href={settings.url_instagram}>
                  <InstagramIcon />
                </Link>
              ) : null}
              {settings.num_ws ? (
                <Link
                  className={styles.iconLink}
                  href={`https://api.whatsapp.com/send?phone=+1${settings.num_ws}&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios.`}
                >
                  <WhatsappIcon />
                </Link>
              ) : null}
            </div>
            <div>
              <p className={styles.copy}>{settings.copy_foot}</p>
            </div>
          </div>
          <div className={styles.certification}>
            <span id="CertificacionUAF">
              <Link
                href="https://certificaciones.uaf.gob.do/certificaciones_so_view.php?editid1=105"
                target="_blank"
                rel="nofollow"
                hrefLang="es"
                title="Cerficación Sujeto Obligado - Unidad de Análisis Financiero"
              >
                <Image
                  src="https://certificaciones.uaf.gob.do/certificados/UAF00105JM7H.png"
                  alt="Sello de Certificación de Sujeto Obligado"
                  width="83"
                  height="100"
                  lang="es"
                  unoptimized
                />
              </Link>
            </span>
            <p></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
