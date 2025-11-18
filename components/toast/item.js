import { useEffect } from "react";
import Icon from "@/components/icon";
import { CN } from "@/lib/utils";

const TOAST_TYPES = {
  SUCCESS: {
    icon: "solar:check-circle-linear",
    className: "text-success border border-success",
  },
  ERROR: {
    icon: "solar:close-circle-linear",
    className: "text-error border border-error",
  },
  WARNING: {
    icon: "solar:danger-circle-linear",
    className: "text-warning border border-warning",
  },
  INFO: {
    icon: "solar:info-circle-linear",
    className: "text-info border border-info",
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
    <div
      className={CN(
        "relative w-full bg-white dark:bg-black rounded-secondary shadow-lg",
        toastConfig.className
      )}
    >
      <div className="px-4 py-3 w-full flex items-start gap-3">
        <Icon icon={toastConfig.icon} className="shrink-0 mt-0.5" />
        <p className="font-semibold w-full">{message}</p>
      </div>
    </div>
  );
}
