"use client";

import { usePageConfig } from "@/hooks/use-page-config";
import { Button, Selectbox } from "@/ui/elements";
import { useToast } from "@/modules/toast/hooks";
import Template from "@/app/(views)/template";
import { ITEMS } from "@/modules/nav/config";
import { useMemo } from "react";

export default function Placeholder() {
  const toast = useToast();

  const controls = useMemo(
    () => ({
      left: (
        <Button
          onClick={() => toast.info("Test butonu tıklandı")}
          icon="solar:archive-bold"
          text="Test"
        />
      ),
      right: (
        <Selectbox
          options={[
            { label: "Seçenek 1", value: "opt1" },
            { label: "Seçenek 2", value: "opt2" },
          ]}
          icon="solar:adhesive-plaster-2-bold"
          onChange={() => {}}
          direction="top"
          text="Seçim"
        />
      ),
    }),
    [toast]
  );

  usePageConfig({
    nav: ITEMS.placeholder,
    controls,
  });

  return (
    <Template>
      <div className="center flex h-screen w-screen flex-col gap-4 bg-cover bg-center bg-no-repeat">
        <h1>Page 1 - Gelişmiş Yapı</h1>
      </div>
    </Template>
  );
}
