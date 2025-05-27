import React from "react";
import NavList from "./nav-list";
import styles from "./navigation.module.scss";
/**
 * Navigation Component
 *
 * It renders the navigation links
 */

interface NavigationProps {
  items?: any[];
  split?: boolean;
  isMain?: boolean;
  isHeader?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

const Navigation = ({
  items = [],
  split = false,
  isMain = true,
  isHeader = false,
  color,
  bgColor,
  borderColor,
  ...props
}: NavigationProps) => {
  return items.length ? (
    <div className={`${styles.menu}`} {...props}>
      <div
        className={`${styles.container} ${isHeader ? "isHeader" : ""} ${
          split ? "split" : ""
        }`}
      >
        {!split ? (
          <div className={styles.block}>
            <>
              <NavList
                items={items}
                isMain={isMain}
                isHeader={isHeader}
                color={color}
                bgColor={bgColor}
                borderColor={borderColor}
              />
            </>
          </div>
        ) : (
          items.map((el, index) => {
            const children = el.child_items;
            return children ? (
              <div key={index} className={styles.block}>
                <span className={styles.label}>{el?.title}</span>

                <NavList
                  items={children}
                  isMain={isMain}
                  isHeader={isHeader}
                  color={color}
                  bgColor={bgColor}
                  borderColor={borderColor}
                />
              </div>
            ) : null;
          })
        )}
      </div>
    </div>
  ) : null;
};

export default Navigation;
