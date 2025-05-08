import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { navigationRef } from "./utils/navigation";

import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CartScreen from "./screens/CartScreen";
import PerformanceTestScreen from "./screens/PerformanceTestScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ cartCount, setCartCount }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Cart") {
            iconName = "cart";
          } else if (route.name === "PerformanceTest") {
            iconName = "speedometer";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <HomeScreen {...props} setCartCount={setCartCount} />
        )}
      />
      <Tab.Screen
        name="Cart"
        children={(props) => (
          <CartScreen {...props} setCartCount={setCartCount} />
        )}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen
        name="PerformanceTest"
        component={PerformanceTestScreen}
        options={{
          tabBarLabel: "Performance",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const saved = await AsyncStorage.getItem("cart");
        const cart = saved ? JSON.parse(saved) : [];
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(count);
      } catch (err) {
        console.error("Error when loading cart:", err);
      }
    };

    loadCartCount();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            options={{ headerShown: false }}
            children={() => (
              <TabNavigator cartCount={cartCount} setCartCount={setCartCount} />
            )}
          />
          <Stack.Screen
            name="Detail"
            children={(props) => (
              <DetailScreen {...props} setCartCount={setCartCount} />
            )}
          />
          <Stack.Screen
            name="PerformanceTest"
            component={PerformanceTestScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
