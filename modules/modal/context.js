"use client";

import { MODAL_POSITIONS } from "@/modules/modal/config";
import Modal from "@/modules/modal";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";

const ModalContext = createContext(null);

const initialState = {
  position: MODAL_POSITIONS.CENTER,
  description: null,
  modalType: null,
  isOpen: false,
  title: null,
  props: {},
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(initialState);

  const openModal = useCallback(
    (modalType, position = MODAL_POSITIONS.CENTER, props = {}) => {
      const { header, data, ...restProps } = props;
      setModalState({
        description: header?.description || null,
        title: header?.title || null,
        props: data || restProps,
        isOpen: true,
        modalType,
        position,
      });
    },
    []
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
    [modalState, openModal, closeModal]
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
