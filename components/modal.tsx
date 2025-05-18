"use client";

import React, { useContext } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { CustomContext } from "@/components/theme/custom-provider";
import styles from "./modal.module.scss";

interface Props {
  title?: string;
}

export default function Modal({ title }: Props) {
  const { isModalOpen, openModal, modalBody }: any = useContext(CustomContext);

  /**
   * Keep a reference to the close button so we can focus on it when
   * the modal opens
   */
  // const closeButtonRef = useRef();

  // Focus on the close button when the mobile menu is open
  // useFocusEffect(closeButtonRef, isModalOpen);
  return true ? (
    <div
      className={`${styles.modal} ${isModalOpen ? "active" : ""}`}
      data-open={isModalOpen}
      role="dialog"
      aria-modal="true"
      onClick={() => {
        openModal(false);
      }}
    >
      <div className={styles.inner}>
        <div className={styles.container}>
          {/* Global styles to prevent body scroll when the menu is open */}
          <div
            className={styles.card}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.cardWrapper}>
              <div className={styles.header}>
                {title && <h4>{title}</h4>}
                <div
                  className={styles.button}
                  onClick={() => {
                    openModal(false);
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className={styles.body}>{modalBody ? modalBody : null}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
