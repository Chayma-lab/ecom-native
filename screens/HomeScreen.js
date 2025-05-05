import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { addToCart } from "../utils/addToCart";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleAdd = async (product) => {
    const success = await addToCart(product);
    if (success) alert("Toegevoegd aan winkelmandje!");
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Titel */}
      <Text style={styles.title}>My ecom</Text>

      {/* Zoekbalk */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Productlijst */}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B2E83",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  search: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  banner: {
    width: "100%",
    height: 180,
    marginBottom: 20,
    borderRadius: 12,
  },
});
