import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToCart = async (product) => {
  try {
    const saved = await AsyncStorage.getItem("cart");
    const cart = saved ? JSON.parse(saved) : [];

    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error("Fout bij toevoegen aan winkelmandje:", error);
    return false;
  }
};
