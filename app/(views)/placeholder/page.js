"use client";

import { useEffect } from "react";
import Template from "@/app/(views)/template";
import { DynamicNavUpdater } from "@/components/nav/updater";
import { Button, Selectbox } from "@/components/shared/elements";
import { navConfigs } from "@/config/nav-configs";
import { useControlsContext } from "@/contexts/controls-context";
import { useToast } from "@/hooks/use-toast";

export default function Placeholder() {
    const { setControls } = useControlsContext();
    const toast = useToast();
    useEffect(() => {
        setControls({
            left: (
                <>
                    <Button icon="solar:archive-bold" text="Test" blurry />
                </>
            ),
            right: (
                <>
                    <Selectbox
                        options={[
                            {
                                label: "Placeholder1",
                                value: "placeholder1",
                                icon: "solar:add-circle-bold",
                            },
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
            <div className="w-screen h-screen center flex flex-col gap-4 bg-cover bg-center bg-no-repeat">
                <DynamicNavUpdater config={navConfigs.placeholder} />
                <h1>Page 1</h1>
            </div>
        </Template>
    );
}
