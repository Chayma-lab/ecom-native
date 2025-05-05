import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Layout from "../components/Layout";
import CartTotal from "../components/CartTotal";
import CartItem from "../components/CartItem";
import { navigateTo } from "../utils/navigation";

// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
export default function CartScreen() {
  const [cart, setCart] = useState([]);

  // ******************* LOAD CART *******************
  // ******************* LOAD CART *******************
  // ******************* LOAD CART *******************
  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const saved = await AsyncStorage.getItem("cart");
        if (saved) {
          setCart(JSON.parse(saved));
        }
      };
      loadCart();
    }, [])
  );

  // ******************* UPDATE QUANTITY *******************
  // ******************* UPDATE QUANTITY *******************
  // ******************* UPDATE QUANTITY *******************
  const updateQuantity = useCallback(
    async (id, change) => {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
      setCart(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    [cart]
  );

  // ******************* DELETE ITEM *******************
  // ******************* DELETE ITEM *******************
  // ******************* DELETE ITEM *******************
  const deleteItem = useCallback(
    async (id) => {
      const filteredCart = cart.filter((item) => item.id !== id);
      setCart(filteredCart);
      await AsyncStorage.setItem("cart", JSON.stringify(filteredCart));
    },
    [cart]
  );

  // ******************* RENDER ITEM *******************
  // ******************* RENDER ITEM *******************
  // ******************* RENDER ITEM *******************
  const renderItem = ({ item }) => (
    <CartItem
      item={item}
      onChangeQuantity={updateQuantity}
      onDelete={deleteItem}
      onPress={() => navigateTo("Detail", { product: item })}
    />
  );

  // ******************* RENDER *******************
  return (
    <Layout>
      {cart.length === 0 ? (
        // ******************* EMPTY CART *******************
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>You bag is empty.</Text>
        </View>
      ) : (
        <>
        {/* ******************* CART ITEMS ******************* */}
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <CartTotal cart={cart} />
        </>
      )}
    </Layout>
  );
}

// ******************* STYLING *******************
// ******************* STYLES *******************
// ******************* STYLES *******************
const styles = StyleSheet.create({
  // ******************* CONTAINER *******************
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  // ******************* EMPTY CART *******************
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // ******************* EMPTY CART TEXT *******************
  empty: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
});
