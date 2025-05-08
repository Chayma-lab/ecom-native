import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import ProductPlaceholder from "../components/ProductPlaceholder";
import { addToCart } from "../utils/addToCart";

export default function HomeScreen({ navigation, setCartCount }) {
  // ******************* STATE *******************
  // ******************* STATE *******************
  // ******************* STATE *******************
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // ******************* FETCH PRODUCTS *******************
  // ******************* LOAD PRODUCTS *******************
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const cached = await AsyncStorage.getItem("products");
        if (cached) {
          setProducts(JSON.parse(cached));
        }

        const netState = await Network.getNetworkStateAsync();
        if (!netState.isInternetReachable) {
          setIsOffline(true);
          return;
        }

        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        await AsyncStorage.setItem("products", JSON.stringify(data));
        setIsOffline(false);
      } catch (err) {
        console.warn("Fout bij laden:", err.message);
        setIsOffline(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isOffline]);

  // ******************* ADD TO CART *******************
  const handleAdd = async (product) => {
    const success = await addToCart(product);
    if (success) {
      const saved = await AsyncStorage.getItem("cart");
      const cart = saved ? JSON.parse(saved) : [];
      const totalItems = cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      setCartCount(totalItems);
    }
  };

  // ******************* FILTER PRODUCTS *******************
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // ******************* RENDER *******************
  return (
    <Layout>
      <Text style={styles.title}>My ecom</Text>
      <SearchBar value={search} onChange={setSearch} />

      {isLoading || isOffline ? (
        Array.from({ length: 6 }).map((_, index) => (
          <ProductPlaceholder key={index} />
        ))
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("Detail", { product: item })}
              onAddToCart={() => handleAdd(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </Layout>
  );
}

// ******************* STYLES *******************
// ******************* STYLES *******************
// ******************* STYLES *******************
const styles = StyleSheet.create({
  // ******************* TITLE *******************
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B2E83",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  // ******************* SEARCHBAR *******************
  search: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
});
