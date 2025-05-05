import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigateTo(screen, params = {}) {
  if (!navigationRef.isReady()) return;

  const tabScreens = ["Home", "Cart"];

  if (tabScreens.includes(screen)) {
    navigationRef.navigate("Tabs", {
      screen,
      params,
    });
  } else {
    navigationRef.navigate(screen, params);
  }
}
