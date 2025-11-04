"use client";

import { useNavigationContext } from "@/contexts/navigation-context";
import { Input } from "@/components/shared/elements";

export default function SearchAction({ placeholder }) {
  const { searchQuery, setSearchQuery } = useNavigationContext();

  return (
    <Input
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={placeholder}
      value={searchQuery}
      rounded="secondary"
      className="mt-2.5"
      type="text"
    />
  );
}
