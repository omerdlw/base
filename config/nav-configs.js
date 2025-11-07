import TestAction from "@/components/nav/actions/test-action";
import { ROUTES } from "./constants";

export const navConfigs = {
    placeholder: {
        name: "Page 1",
        title: "Page 1",
        icon: "solar:test-tube-minimalistic-bold",
        description: "Page 1 description",
        path: ROUTES.PAGE_1,
        action: TestAction,
    },
    placeholder2: {
        name: "Page 2",
        title: "Page 2",
        icon: "solar:test-tube-minimalistic-bold",
        description: "Page 2 description",
        path: ROUTES.PAGE_2,
    },
    placeholder3: {
        name: "Page 3",
        title: "Page 3",
        icon: "solar:test-tube-minimalistic-bold",
        description: "Page 3 description",
        path: ROUTES.PAGE_3,
    },
};
