import { useToastContext } from "@/contexts/toast-context";

export function useToast() {
  const { showToast } = useToastContext();

  const toast = {
    success: (message, duration) => showToast(message, "SUCCESS", duration),
    error: (message, duration) => showToast(message, "ERROR", duration),
    warning: (message, duration) => showToast(message, "WARNING", duration),
    info: (message, duration) => showToast(message, "INFO", duration),
  };

  return toast;
}
