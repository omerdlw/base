export function createNavItem(type, data) {
  switch (type) {
    case "skeleton": {
      return {
        description: "please wait",
        title: "Loading",
        name: "loading",
        href: "loading",
        skeleton: true,
        icon: "solar:loading-bold",
      };
    }
    default:
      return null;
  }
}
