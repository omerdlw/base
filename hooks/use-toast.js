import { useModal } from "@/contexts/modal-context";

const useToast = () => {
  const { openModal } = useModal();

  const showToast = (message, type = "INFO", duration = 3000) => {
    openModal("TOAST_MODAL", { message, type, duration }, "top");
  };

  const toast = {
    success: (message, duration) => showToast(message, "SUCCESS", duration),
    error: (message, duration) => showToast(message, "ERROR", duration),
    warning: (message, duration) => showToast(message, "WARNING", duration),
    info: (message, duration) => showToast(message, "INFO", duration),
  };

  return toast;
};

export default useToast;
