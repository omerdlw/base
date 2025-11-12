"use client";

import { memo, useEffect } from "react";
import Icon from "@/components/icon";
import { LoadingSpinner } from "@/components/shared/loadings";
import { CN } from "@/lib/utils";
import {
    COMPONENT_STYLES,
    CONFIG,
    isImageUrl,
    useImageWithRetry,
} from "./helpers";

const IconWrapper = memo(
    ({ rounded, className, loading, icon, color, onError }) => {
        const { currentSrc, handleError, hasError } = useImageWithRetry(
            icon,
            CONFIG.imageRetry.maxRetries,
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
                        className,
                    )}
                >
                    {icon ? (
                        <Icon
                            className="animate-spin"
                            color={color}
                            icon={icon}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            );
        }

        if (isImageUrl(icon)) {
            return (
                <img
                    className={CN(
                        COMPONENT_STYLES.iconContainer,
                        rounded && `rounded-${rounded}`,
                        className,
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
                    className,
                )}
            >
                {icon && <Icon color={color} icon={icon} />}
            </div>
        );
    },
);

IconWrapper.displayName = "IconWrapper";

export default IconWrapper;
