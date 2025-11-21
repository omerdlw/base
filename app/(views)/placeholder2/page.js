"use client";

import Template from "@/app/(views)/template";
import { usePageConfig } from "@/hooks/use-page-config";
import { ITEMS } from "@/modules/nav/config";

export default function Placeholder() {
  usePageConfig({
    nav: ITEMS.placeholder2,
  });

  return (
    <Template>
      <div className="w-screen h-screen center flex flex-col gap-4">
        <h1>Page 2</h1>
      </div>
    </Template>
  );
}
