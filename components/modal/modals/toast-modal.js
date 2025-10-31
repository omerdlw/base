import Icon from "@/components/icon";
import { useEffect } from "react";

const TOAST_TYPES = {
  SUCCESS: {
    icon: "solar:check-square-linear",
    className: "text-success",
  },
  ERROR: {
    icon: "solar:close-square-linear",
    className: "text-error",
  },
  WARNING: {
    icon: "solar:danger-square-linear",
    className: "text-warning",
  },
  INFO: {
    icon: "solar:info-square-linear",
    className: "text-info",
  },
};

export default function ToastModal({ close, data }) {
  const { message, type = "INFO", duration = 2000 } = data;
  const toastConfig = TOAST_TYPES[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, duration);

    return () => clearTimeout(timer);
  }, [close, duration]);

  return (
    <div className="min-w-[300px] max-w-[500px] p-4 flex items-center space-x-3">
      <Icon icon={toastConfig.icon} className={toastConfig.className} />
      <p>{message}</p>
    </div>
  );
}
