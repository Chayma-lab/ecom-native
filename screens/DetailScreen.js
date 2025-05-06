import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import { addToCart } from "../utils/addToCart";
import { navigateTo } from "../utils/navigation";

export default function DetailScreen({ route, setCartCount }) {
  // ******************* PRODUCT DATA *******************
  // ******************* PRODUCT DATA *******************
  // ******************* PRODUCT DATA *******************
  const { product } = route.params;

  // ******************* ADD TO CART *******************
  const handleAdd = async () => {
    const success = await addToCart(product);
    if (success) {
      const saved = await AsyncStorage.getItem("cart");
      const cart = saved ? JSON.parse(saved) : [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    }
  };

  return (
    // ******************* CONTAINER *******************
    // ******************* CONTAINER *******************
    // ******************* CONTAINER *******************
    <Layout contentContainerStyle={styles.container}>
      {/* ******************* PRODUCT IMAGE ******************* */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* ******************* PRODUCT INFO ******************* */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.chip}>
          <Text style={styles.chipText}>{product.category}</Text>
        </View>

        <Text style={styles.price}>€{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* ******************* BUTTONS ******************* */}
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Ionicons name="cart-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Put it in the bag</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigateTo("Cart")}
        >
          <Ionicons name="bag-outline" size={18} color="#4B2E83" />
          <Text style={[styles.buttonText, { color: "#4B2E83" }]}>
            See what's in my bag
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

// ******************* STYLES *******************
// ******************* STYLES *******************
// ******************* STYLES *******************
const styles = StyleSheet.create({
  // ******************* CONTAINER *******************
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  // ******************* PRODUCT IMAGE *******************
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  // ******************* PRODUCT INFO *******************
  content: {
    marginTop: 16,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  chip: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  chipText: {
    fontSize: 12,
    color: "#444",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#4B2E83",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
    lineHeight: 20,
  },
  // ******************* BUTTONS *******************
  button: {
    flexDirection: "row",
    backgroundColor: "#4B2E83",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#f0eefe",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
