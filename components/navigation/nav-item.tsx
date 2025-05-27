"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import NavList from "./nav-list";
import { LeftArrowIcon } from "@/components/ui/icons";

import styles from "./nav-item.module.scss";
import { CustomContext } from "@/components/theme/custom-provider";
import { getURL } from "@/lib/utils";

interface NavItemProps {
  el?: any;
  isMain?: boolean;
  isHeader?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}
const NavItem = ({
  el,
  isMain,
  isHeader,
  color,
  borderColor,
  bgColor,
}: NavItemProps) => {
  const item = el;
  const children = el?.child_items || [];

  const hasChildren = children?.length > 0;
  const isCurrentPage = false;
  const isLink = item?.url;

  const [isOpen, setOpen] = useState(false);
  const { setMenuOpen }: any = useContext(CustomContext);

  return (
    <li
      className={`${styles.item} ${isHeader ? "isHeader" : ""}`}
      style={{
        fontWeight: isMain ? 600 : 400,
        color: color,
        backgroundColor: bgColor,
        outlineColor: isMain ? borderColor : "transparent",
        borderLeft: isMain ? "" : `0.1rem solid var(--primary-base)`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(hasChildren && !isLink ? !isOpen : false);
      }}
    >
      <div className={styles.labelWrapper}>
        {isLink ? (
          <Link href={getURL(item.url)} target={item?.target || ""}>
            <span
              className={`${styles.itemLink} ${isHeader ? "isHeader" : ""} ${
                children?.length && !isHeader ? "hasChildren" : ""
              }`}
              aria-current={isCurrentPage ? "page" : undefined}
              aria-label="Item de la navegacion..."
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {item?.title}
            </span>
          </Link>
        ) : (
          <span
            className={`${styles.itemLabel} ${isHeader ? "isHeader" : ""} ${
              children?.length && !isHeader ? "hasChildren" : ""
            }`}
            aria-current={isCurrentPage ? "page" : undefined}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!isOpen);
            }}
          >
            {item?.title}
          </span>
        )}

        {children?.length && !isHeader ? (
          <div
            className={`${styles.expand} ${isOpen ? "expanded" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!isOpen);
            }}
          >
            <div className={styles.expandWrapper}>
              <LeftArrowIcon />
            </div>
          </div>
        ) : null}
      </div>
      {hasChildren ? (
        <div className={`${styles.listWrapper} ${isOpen ? "active" : ""}`}>
          <div className={`${styles.list} ${isOpen ? "active" : ""}`}>
            <NavList items={children} color={color} />
          </div>
        </div>
      ) : null}
    </li>
  );
};

export default NavItem;
