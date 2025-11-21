"use client";

import { HEX_TO_RGB, RGB_TO_HEX, RGB_TO_HSV, HSV_TO_RGB } from "./utils";
import { useState, useEffect, useRef, useCallback } from "react";
import { COMPONENT_STYLES } from "./constants";
import { useInteractiveMove } from "./hooks";
import { CN } from "@/lib/utils";

const getLuminance = (r, g, b) => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

const MAX_LUMINANCE = 200;
const MIN_LUMINANCE = 40;

const InteractiveArea = ({ className, style, onMove, children }) => {
  const containerRef = useRef(null);
  const { handleMouseDown } = useInteractiveMove(containerRef, onMove);

  return (
    <div
      ref={containerRef}
      className={CN(
        "relative cursor-pointer touch-none select-none",
        className
      )}
      style={style}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export const ColorPicker = ({ value, onChange, presets = [] }) => {
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 100 });
  const [isInternalUpdate, setIsInternalUpdate] = useState(false);
  const [localHex, setLocalHex] = useState("");

  const rgb = HSV_TO_RGB(hsv.h / 360, hsv.s / 100, hsv.v / 100);
  const displayHex = RGB_TO_HEX(rgb.r, rgb.g, rgb.b);

  useEffect(() => {
    if (!isInternalUpdate) {
      const rgbVal = HEX_TO_RGB(value || "#ffffff");
      const newHsv = RGB_TO_HSV(rgbVal.r, rgbVal.g, rgbVal.b);
      setHsv((prev) => {
        if (prev.h === newHsv.h && prev.s === newHsv.s && prev.v === newHsv.v)
          return prev;
        return newHsv;
      });
    }
    setIsInternalUpdate(false);
  }, [value]);

  useEffect(() => {
    setLocalHex(displayHex.replace("#", "").toUpperCase());
  }, [displayHex]);

  const updateColor = useCallback(
    (newHsv) => {
      setIsInternalUpdate(true);

      let rgbVal = HSV_TO_RGB(newHsv.h / 360, newHsv.s / 100, newHsv.v / 100);
      const luminance = getLuminance(rgbVal.r, rgbVal.g, rgbVal.b);

      let adjustedHsv = { ...newHsv };

      if (luminance > MAX_LUMINANCE) {
        const correctionFactor = MAX_LUMINANCE / luminance;
        adjustedHsv.v *= correctionFactor;
      } else if (luminance < MIN_LUMINANCE) {
        const safeLuminance = Math.max(0.1, luminance);
        const correctionFactor = MIN_LUMINANCE / safeLuminance;
        adjustedHsv.v = Math.min(100, adjustedHsv.v * correctionFactor);

        const minV = (MIN_LUMINANCE / 255) * 100;
        if (adjustedHsv.v < minV) adjustedHsv.v = minV;
      }

      if (adjustedHsv.v !== newHsv.v) {
        rgbVal = HSV_TO_RGB(
          adjustedHsv.h / 360,
          adjustedHsv.s / 100,
          adjustedHsv.v / 100
        );
      }

      setHsv(adjustedHsv);
      const hex = RGB_TO_HEX(rgbVal.r, rgbVal.g, rgbVal.b);
      onChange(hex);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      <InteractiveArea
        className="w-full h-40 rounded-secondary overflow-hidden relative bg-default/5"
        style={{
          backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
          backgroundImage: `
            linear-gradient(to top, #000, transparent), 
            linear-gradient(to right, #fff, transparent)
          `,
        }}
        onMove={(x, y) => {
          updateColor({ ...hsv, s: x * 100, v: (1 - y) * 100 });
        }}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: displayHex,
          }}
        />
      </InteractiveArea>

      <InteractiveArea
        className="w-full h-4 rounded-secondary relative overflow-hidden border border-default/10"
        style={{
          background:
            "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
        }}
        onMove={(x) => updateColor({ ...hsv, h: x * 360 })}
      >
        <div
          className="absolute top-0 bottom-0 w-2 bg-white border border-black/20 shadow-sm -translate-x-1/2 pointer-events-none rounded-full my-0.5"
          style={{ left: `${(hsv.h / 360) * 100}%` }}
        />
      </InteractiveArea>

      <div className="grid grid-cols-[1.5fr_2fr] gap-3">
        <div
          className={CN(
            COMPONENT_STYLES.base,
            "flex items-center px-2 h-9 rounded-secondary bg-black/20"
          )}
        >
          <span className="text-xs opacity-50 font-mono mr-1">#</span>
          <input
            type="text"
            value={localHex}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();

              if (/^[0-9A-F]{0,6}$/.test(val)) {
                setLocalHex(val);

                if (val.length === 6) {
                  const rgbVal = HEX_TO_RGB("#" + val);
                  updateColor(RGB_TO_HSV(rgbVal.r, rgbVal.g, rgbVal.b));
                }
              }
            }}
            className="w-full bg-transparent text-xs font-mono outline-none uppercase"
            maxLength={6}
          />
        </div>
        <div className="flex gap-1">
          {["r", "g", "b"].map((channel) => (
            <div
              key={channel}
              className={CN(
                COMPONENT_STYLES.base,
                "flex-1 flex items-center justify-center h-9 rounded-secondary bg-black/20 text-center"
              )}
            >
              <input
                type="number"
                min={0}
                max={255}
                value={rgb[channel]}
                onChange={(e) => {
                  const val = Math.max(
                    0,
                    Math.min(255, parseInt(e.target.value) || 0)
                  );
                  const newRgb = { ...rgb, [channel]: val };
                  updateColor(RGB_TO_HSV(newRgb.r, newRgb.g, newRgb.b));
                }}
                className="w-full bg-transparent text-xs font-mono text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
