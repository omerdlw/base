"use client";

import HomeControls from "./views/home-controls";
import { usePathname } from "next/navigation";

export default function Controls() {
  const pathname = usePathname();

  const renderViewSpecificControls = () => {
    if (pathname === "/") {
      return <HomeControls />;
    }
    return null;
  };

  return (
    <div className="fixed left-0 right-0 bottom-[13px] w-auto h-auto">
      {renderViewSpecificControls()}
    </div>
  );
}
