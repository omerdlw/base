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
    title: null,
    description: null,
};

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState(initialState);

    const openModal = useCallback(
        (modalType, position = "center", props = {}) => {
            const { header, data, ...restProps } = props;
            setModalState({
                isOpen: true,
                modalType,
                position,
                props: data || restProps,
                title: header?.title || null,
                description: header?.description || null,
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
