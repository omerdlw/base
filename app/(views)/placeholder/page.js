"use client";

import { Button, Selectbox } from "@/components/shared/elements";
import { useControlsContext } from "@/contexts/controls-context";
import { DynamicNavUpdater } from "@/components/nav/updater";
import { navConfigs } from "@/config/nav-configs";
import { useEffect } from "react";
import Template from "@/app/(views)/template";

export default function Placeholder() {
  const { setControls } = useControlsContext();

  useEffect(() => {
    setControls({
      left: (
        <>
          <Button icon="solar:archive-bold" text="Test" />
          <Button icon="solar:add-folder-bold" text="Test" />
        </>
      ),
      right: (
        <>
          <Selectbox
            options={[{ label: "Test", value: "test" }]}
            icon="solar:sort-by-time-bold"
            onChange={() => {}}
            direction="top"
            text="Test"
          />
          <Selectbox
            options={[{ label: "Test", value: "test" }]}
            icon="solar:adhesive-plaster-2-bold"
            onChange={() => {}}
            direction="top"
            text="Test"
          />
        </>
      ),
    });

    return () => setControls({ left: null, right: null });
  }, [setControls]);

  return (
    <Template>
      <div className="w-screen h-screen center flex flex-col gap-4">
        <DynamicNavUpdater config={navConfigs.placeholder} />
        <h1>Page 1</h1>
      </div>
    </Template>
  );
}
