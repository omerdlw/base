"use client";

import Modal from "@/components/modal";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";

const ModalContext = createContext(null);

const initialState = {
  position: "center",
  modalType: null,
  isOpen: false,
  props: {},
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(initialState);

  const openModal = useCallback(
    (modalType, props = {}, position = "center") => {
      setModalState({
        isOpen: true,
        modalType,
        position,
        props,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
  }, []);

  const value = useMemo(
    () => ({
      ...modalState,
      closeModal,
      openModal,
    }),
    [modalState, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
