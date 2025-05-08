import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
export default function ProductCard({ product, onPress, onAddToCart }) {
  const [loading, setLoading] = useState(true);

  return (
    // ******************* CONTAINER *******************
    // ******************* CONTAINER *******************
    // ******************* CONTAINER *******************
    <View style={styles.card}>
      {/* ******************* PRODUCT IMAGE + LOADER ******************* */}
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageWrapper}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#999"
              style={styles.loader}
            />
          )}
          <Image
            uri={product.image}
            style={styles.image}
            resizeMode="contain"
            onLoadEnd={() => setLoading(false)}
          />
        </View>

        {/* ******************* PRODUCT INFO ******************* */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          {/* ******************* PRODUCT CHIP ******************* */}
          <View style={styles.chip}>
            <Text style={styles.chipText}>{product.category}</Text>
          </View>

          {/* ******************* PRODUCT PRICE + RATING ******************* */}
          <Text style={styles.price}>€ {product.price}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" color="gold" size={16} />
            <Text style={styles.rating}>
              {product.rating.rate} ({product.rating.count} reviews)
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* ******************* ADD TO CART BUTTON ******************* */}
      <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
        <Ionicons name="cart-outline" size={16} color={"#fff"} />
        <Text style={styles.cartButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// ******************* STYLES *******************
// ******************* STYLES *******************
// ******************* STYLES *******************
const styles = StyleSheet.create({
  // ******************* CARD *******************
  card: {
    borderRadius: 16,
    backgroundColor: "#fff",
    margin: 10,
    overflow: "hidden",
    elevation: 2,
  },
  // ******************* PRODUCT IMAGE + LOADER *******************
  imageWrapper: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
  },
  // ******************* PRODUCT INFO *******************
  content: {
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  // ******************* PRODUCT CHIP *******************
  chip: {
    backgroundColor: "#f0eefe",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12,
    color: "#4B2E83",
  },
  // ******************* PRODUCT PRICE + RATING *******************
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  rating: {
    marginLeft: 4,
    color: "gray",
  },
  // ******************* ADD TO CART BUTTON *******************
  cartButton: {
    flexDirection: "row",
    backgroundColor: "#4B2E83",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  cartButtonText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontWeight: "500",
  },
});