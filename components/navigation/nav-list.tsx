import React from "react";
import NavItem from "./nav-item";
import styles from "./nav-list.module.scss";

interface NavListProps {
  items?: any[];
  isMain?: boolean;
  isHeader?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

const NavList = ({
  items,
  isMain = false,
  isHeader = false,
  color,
  bgColor,
  borderColor,
  ...props
}: NavListProps) => {
  return (
    <ul
      className={`${styles.list} ${isMain ? "isMain" : ""} ${
        isHeader ? "isHeader" : ""
      }`}
      {...props}
    >
      {items?.map((item?: any, index?: number) => {
        return (
          <NavItem
            key={index}
            el={item}
            isMain={isMain}
            isHeader={isHeader}
            color={color}
            bgColor={bgColor}
            borderColor={borderColor}
          />
        );
      })}
    </ul>
  );
};

export default NavList;
