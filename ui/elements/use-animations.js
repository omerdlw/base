"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/**
 * Adds a subtle scale effect on hover.
 * @param {React.RefObject} ref - The element to animate
 * @param {boolean} disabled - Whether animation should be disabled
 */
export const useHoverEffect = (ref, disabled = false) => {
  useGSAP(() => {
    if (disabled || !ref.current) return;

    const el = ref.current;

    // Set will-change to hint browser for optimization
    gsap.set(el, { willChange: "transform" });

    const animation = gsap.to(el, {
      scale: 1.05, // Slightly increased scale for better visibility
      duration: 0.4, // Slower duration
      paused: true,
      ease: "power2.out",
      force3D: true, // Force hardware acceleration
    });

    const onEnter = () => animation.play();
    const onLeave = () => animation.reverse();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      // Clean up will-change
      gsap.set(el, { willChange: "auto" });
    };
  }, [disabled, ref]);
};

/**
 * Adds a press-down scale effect on click.
 * @param {React.RefObject} ref - The element to animate
 * @param {boolean} disabled - Whether animation should be disabled
 */
export const useClickEffect = (ref, disabled = false) => {
  useGSAP(() => {
    if (disabled || !ref.current) return;

    const el = ref.current;

    const onDown = () => {
      gsap.to(el, {
        scale: 0.95,
        duration: 0.2, // Slower
        ease: "power2.out",
        force3D: true,
      });
    };

    const onUp = () => {
      gsap.to(el, {
        scale: 1, // Return to 1 (hover effect will take over if still hovering)
        duration: 0.2, // Slower
        ease: "power2.out",
        force3D: true,
      });
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [disabled, ref]);
};

/**
 * Animates a menu opening and closing.
 * @param {React.RefObject} ref - The menu element
 * @param {boolean} isOpen - Whether the menu is open
 * @param {function} onComplete - Callback when animation completes
 */
export const useMenuAnimation = (ref, isOpen, onComplete) => {
  useGSAP(() => {
    if (!ref.current) return;

    if (isOpen) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.95,
          willChange: "transform, opacity",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          force3D: true,
        }
      );
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        force3D: true,
        onComplete: onComplete,
      });
    }
  }, [isOpen, ref, onComplete]);
};

/**
 * Animates menu options with a stagger effect.
 * @param {React.RefObject} containerRef - The container of the options
 * @param {boolean} isOpen - Whether the menu is open
 */
export const useMenuOptionsAnimation = (containerRef, isOpen) => {
  useGSAP(() => {
    if (!containerRef.current || !isOpen) return;

    const items = containerRef.current.children;

    gsap.set(items, { opacity: 0, x: -10 });

    gsap.to(items, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.out",
      force3D: true,
      delay: 0.1, // Wait slightly for menu to start opening
    });
  }, [isOpen, containerRef]);
};

/**
 * Animates a toggle switch knob.
 * @param {React.RefObject} knobRef - The knob element
 * @param {boolean} checked - Whether the toggle is checked
 * @param {object} sizeConfig - Size configuration for translation distance
 */
export const useToggleAnimation = (knobRef, checked, sizeConfig) => {
  // We need to manually handle the translation because we are removing the class-based translation
  // to let GSAP handle it for smoother physics.
  useGSAP(() => {
    if (!knobRef.current) return;

    // Extract the numeric value from the translate class (e.g., "translate-x-6" -> 24px approx)
    // Or better, use the sizeConfig to determine the pixel value if possible,
    // but since we use Tailwind classes, we might want to rely on GSAP's x property.

    // Alternative: We can just use the class change but add a transition.
    // BUT the user asked for GSAP.

    // Let's use a simple heuristic:
    // sm: 20px (5 * 4)
    // md: 24px (6 * 4)
    // lg: 28px (7 * 4)

    let xVal = 0;
    if (checked) {
      if (sizeConfig.translate.includes("translate-x-5")) xVal = 20;
      else if (sizeConfig.translate.includes("translate-x-6")) xVal = 24;
      else if (sizeConfig.translate.includes("translate-x-7")) xVal = 28;
    }

    gsap.to(knobRef.current, {
      x: xVal,
      duration: 0.5, // Slower
      ease: "power3.out", // Less bouncy, more smooth
      force3D: true,
    });
  }, [checked, knobRef, sizeConfig]);
};
