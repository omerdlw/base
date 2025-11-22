"use client";

import { COMPONENT_STYLES, CONFIG } from "./constants";
import { LoadingSpinner } from "../loadings/spinner";
import { useImageWithRetry } from "./hooks";
import { memo, useEffect } from "react";
import { IS_IMAGE_URL, arePropsEqual } from "./utils";
import { CN } from "@/lib/utils";
import Icon from "@/ui/icon";

const IconWrapper = memo(({ data = {}, visuals = {}, controls = {} }) => {
  const { icon, loading } = data;
  const { rounded, className, color } = visuals;
  const { onError } = controls;

  const { currentSrc, handleError, hasError } = useImageWithRetry(
    icon,
    CONFIG.imageRetry.maxRetries
  );

  useEffect(() => {
    if (hasError && onError) {
      onError();
    }
  }, [hasError, onError]);

  if (loading) {
    return (
      <div
        className={CN(
          COMPONENT_STYLES.iconContainer,
          rounded && `rounded-${rounded}`,
          className
        )}
      >
        {icon ? (
          <Icon className="animate-spin" color={color} icon={icon} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }

  if (IS_IMAGE_URL(icon)) {
    return (
      <img
        className={CN(
          COMPONENT_STYLES.iconContainer,
          rounded && `rounded-${rounded}`,
          className
        )}
        src={currentSrc}
        onError={handleError}
        alt="Icon"
      />
    );
  }

  return (
    <div
      className={CN(
        COMPONENT_STYLES.iconContainer,
        rounded && `rounded-${rounded}`,
        className
      )}
    >
      {icon && <Icon color={color} icon={icon} />}
    </div>
  );
}, arePropsEqual);

export default IconWrapper;
