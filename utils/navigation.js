import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

/**
 * Slimme navigate functie
 * @param {string} screen - Naam van het scherm
 * @param {object} params - Optionele parameters
 */
export function navigateTo(screen, params = {}) {
  if (!navigationRef.isReady()) return;

  const tabScreens = ["Home", "Cart"]; // Voeg hier je tab screens toe

  if (tabScreens.includes(screen)) {
    navigationRef.navigate("Tabs", {
      screen,
      params,
    });
  } else {
    navigationRef.navigate(screen, params);
  }
}
