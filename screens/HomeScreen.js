import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { addToCart } from "../utils/addToCart";

// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
export default function HomeScreen({ navigation, setCartCount }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // ******************* FETCH PRODUCTS *******************
  // ******************* LOAD PRODUCTS *******************
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setProducts)
      .catch((error) => {
        console.error("Fout bij ophalen producten:", error);
      });
  }, []);

  // ******************* ADD TO CART *******************
  const handleAdd = async (product) => {
    const success = await addToCart(product);
    if (success) {  
      const saved = await AsyncStorage.getItem("cart");
      const cart = saved ? JSON.parse(saved) : [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
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
      {/* ******************** TITLE ******************* */}
      <Text style={styles.title}>My ecom</Text>

      {/* ******************** SEARCHBAR ******************* */}
      <SearchBar value={search} onChange={setSearch} />

      {/* ******************** PRODUCTS ******************* */}
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
