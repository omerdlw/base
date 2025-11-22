"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useHoverAnimation = (ref, disabled = false) => {
  const { contextSafe } = useGSAP({ scope: ref });

  const onMouseEnter = contextSafe(() => {
    if (disabled || !ref.current) return;
    gsap.to(ref.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  });

  const onMouseLeave = contextSafe(() => {
    if (disabled || !ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  });

  return { onMouseEnter, onMouseLeave };
};

export const useClickAnimation = (ref, disabled = false) => {
  const { contextSafe } = useGSAP({ scope: ref });

  const onMouseDown = contextSafe(() => {
    if (disabled || !ref.current) return;
    gsap.to(ref.current, {
      scale: 0.95,
      duration: 0.15,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  });

  const onMouseUp = contextSafe(() => {
    if (disabled || !ref.current) return;
    gsap.to(ref.current, {
      scale: 1.05,
      duration: 0.15,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  });

  return { onMouseDown, onMouseUp };
};

export const useMenuAnimation = (ref, isOpen, onComplete) => {
  useGSAP(() => {
    if (!ref.current) return;

    if (isOpen) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
        onComplete,
      });
    }
  }, [isOpen, onComplete]);
};

export const useMenuOptionsAnimation = (containerRef, isOpen) => {
  useGSAP(() => {
    if (!containerRef.current || !isOpen) return;
    const items = containerRef.current.children;

    gsap.fromTo(
      items,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.25,
        stagger: 0.02,
        ease: "power2.out",
        delay: 0.05,
        overwrite: "auto",
      }
    );
  }, [isOpen]);
};

export const useToggleAnimation = (knobRef, checked, sizeConfig) => {
  useGSAP(() => {
    if (!knobRef.current) return;

    let xVal = 0;
    if (checked) {
      if (sizeConfig.translate.includes("translate-x-5")) xVal = 20;
      else if (sizeConfig.translate.includes("translate-x-6")) xVal = 24;
      else if (sizeConfig.translate.includes("translate-x-7")) xVal = 28;
    }

    gsap.to(knobRef.current, {
      x: xVal,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [checked, sizeConfig]);
};

export const useCheckboxAnimation = (checkRef, checked) => {
  useGSAP(() => {
    if (!checkRef.current) return;

    if (checked) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          overwrite: "auto",
          force3D: true,
        }
      );
    } else {
      gsap.to(checkRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
        force3D: true,
      });
    }
  }, [checked]);
};

export const useRadioAnimation = (dotRef, checked) => {
  useGSAP(() => {
    if (!dotRef.current) return;

    if (checked) {
      gsap.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
          force3D: true,
        }
      );
    } else {
      gsap.to(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
        force3D: true,
      });
    }
  }, [checked]);
};

export const useTooltipAnimation = (
  tooltipRef,
  containerRef,
  disabled,
  content
) => {
  useGSAP(() => {
    if (disabled || !content || !tooltipRef.current || !containerRef.current)
      return;

    const tooltip = tooltipRef.current;
    const container = containerRef.current;

    const onEnter = () => {
      gsap.fromTo(
        tooltip,
        { opacity: 0, scale: 0.95, y: 5 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
          force3D: true,
        }
      );
    };

    const onLeave = () => {
      gsap.to(tooltip, {
        opacity: 0,
        scale: 0.95,
        y: 5,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
        force3D: true,
      });
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [disabled, content]);
};
