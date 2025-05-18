"use client";

import { createContext, useState } from "react";

const f: any = () => {};

export const CustomContext = createContext({});

interface providerProps {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: providerProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("");
  const [hsFormLoaded, setHsFormLoaded] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [isModalOpen, openModal] = useState(false);
  const [modalBody, setModalBody] = useState(false);

  return (
    <CustomContext.Provider
      value={{
        isMenuOpen,
        setMenuOpen,
        token,
        setToken,
        startTime,
        isModalOpen,
        openModal,
        modalBody,
        setModalBody,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
}
