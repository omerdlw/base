"use client";

import Icon from "@/components/icon";
import { CN } from "@/lib/utils";

const MESSAGE_STYLES = {
  error: {
    base: "bg-error/60 border border-error text-skin-error",
    icon: "solar:danger-circle-bold",
    iconBg: "bg-error",
    role: "alert",
  },
  success: {
    base: "bg-success/60 border border-success text-skin-success",
    icon: "solar:check-circle-bold",
    iconBg: "bg-success",
    role: "status",
  },
  warning: {
    base: "bg-warning/60 border border-warning text-skin-warning",
    icon: "solar:danger-triangle-bold",
    iconBg: "bg-warning",
    role: "alert",
  },
  info: {
    base: "bg-info/60 border border-info text-skin-info",
    icon: "solar:info-circle-bold",
    iconBg: "bg-info",
    role: "status",
  },
};

const BASE_CLASS =
  "w-auto flex items-center p-1 rounded-secondary font-semibold backdrop-blur-md";

export function Message({ type, message, className, messageClassName }) {
  const styles = MESSAGE_STYLES[type] ?? MESSAGE_STYLES.info;

  return (
    <div className={CN(BASE_CLASS, styles.base, className)} role={styles.role}>
      <div
        className={CN(
          "size-10 shrink-0 rounded-tertiary center",
          styles.iconBg,
        )}
      >
        <Icon icon={styles.icon} className="text-white" size={20} />
      </div>
      <p className={CN("leading-relaxed px-3", messageClassName)}>{message}</p>
    </div>
  );
}

export const ErrorMessage = (props) => <Message type="error" {...props} />;
export const SuccessMessage = (props) => <Message type="success" {...props} />;
export const WarningMessage = (props) => <Message type="warning" {...props} />;
export const InfoMessage = (props) => <Message type="info" {...props} />;
