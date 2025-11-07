"use client";

import { useNavigationContext } from "@/contexts/navigation-context";
import { useEffect } from "react";

export function DynamicNavUpdater({ config }) {
    const { setDynamicNavItem } = useNavigationContext();

    useEffect(() => {
        const navItem = {
            ...config,
            path: config.path || "#",
            icon: config.icon,
            description: config.description || "",
            name: config.name,
        };

        setDynamicNavItem(navItem);
        return () => setDynamicNavItem(null);
    }, [config, setDynamicNavItem]);

    return null;
}
