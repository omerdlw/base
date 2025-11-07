"use client";

import { Button, Selectbox } from "@/components/shared/elements";
import { useControlsContext } from "@/contexts/controls-context";
import { DynamicNavUpdater } from "@/components/nav/updater";
import { navConfigs } from "@/config/nav-configs";
import Template from "@/app/(views)/template";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function Placeholder() {
  const { setControls } = useControlsContext();
  const toast = useToast();
  useEffect(() => {
    setControls({
      left: (
        <>
          <Button
            onClick={() => toast.error("Error: 404 Not found")}
            blurry
            icon="solar:archive-bold"
            text="Test"
          />
          <Button
            onClick={() => toast.success("Error: 404 Not found")}
            blurry
            icon="solar:add-folder-bold"
            text="Test"
          />
          <Button
            onClick={() => toast.info("Error: 404 Not found")}
            blurry
            icon="solar:archive-bold"
            description="asddsa"
            text="Test"
          />
          <Button
            onClick={() => toast.warning("Error: 404 Not found")}
            blurry
            tinted
            text="Test"
          />
        </>
      ),
      right: (
        <>
          <Selectbox
            options={[{ label: "Test", value: "test" }]}
            icon="solar:sort-by-time-bold"
            onChange={() => {}}
            direction="top"
            description="asddsa"
            text="Test"
            blurry
          />
          <Selectbox
            options={[
              { label: "Placeholder1", value: "placeholder1" },
              { label: "Placeholder2", value: "placeholder2" },
              { label: "Placeholder3", value: "placeholder3" },
              { label: "Placeholder4", value: "placeholder4" },
              { label: "Placeholder5", value: "placeholder5" },
              { label: "Placeholder6", value: "placeholder6" },
              { label: "Placeholder7", value: "placeholder7" },
              { label: "Placeholder8", value: "placeholder8" },
            ]}
            icon="solar:adhesive-plaster-2-bold"
            onChange={() => {}}
            direction="top"
            text="Test"
            blurry
          />
        </>
      ),
    });

    return () => setControls({ left: null, right: null });
  }, [setControls]);

  return (
    <Template>
      <div
        style={{
          backgroundImage:
            "url(https://sm.ign.com/ign_tr/screenshot/default/gta-6-ucuncu-fragmani-ign-turkiye-1920_v755.jpg)",
        }}
        className="w-screen h-screen center flex flex-col gap-4 bg-cover bg-center bg-no-repeat"
      >
        <DynamicNavUpdater config={navConfigs.placeholder} />
        <h1>Page 1</h1>
      </div>
    </Template>
  );
}
