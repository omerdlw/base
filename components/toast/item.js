import Icon from "@/components/icon";
import { CN } from "@/lib/utils";
import { useEffect } from "react";

const TOAST_TYPES = {
  SUCCESS: {
    icon: "solar:check-circle-linear",
    className: "text-success",
  },
  ERROR: {
    icon: "solar:close-circle-linear",
    className: "text-error",
  },
  WARNING: {
    icon: "solar:danger-circle-linear",
    className: "text-warning",
  },
  INFO: {
    icon: "solar:info-circle-linear",
    className: "text-info",
  },
};

export default function Item({ toast, onClose }) {
  const { message, type = "INFO", duration = 2000 } = toast;
  const toastConfig = TOAST_TYPES[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="relative bg-white dark:bg-black border border-black/15 dark:border-white/15 rounded-secondary shadow-lg">
      <div className="min-w-[300px] max-w-[500px] p-4 flex items-center space-x-3">
        <Icon icon={toastConfig.icon} className={toastConfig.className} />
        <p className={CN(toastConfig.className, "font-semibold")}>{message}</p>
      </div>
    </div>
  );
}
