import React, { useState } from "react";
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
export default function CartItem({
  item,
  onChangeQuantity,
  onDelete,
  onPress,
}) {
  const [loading, setLoading] = useState(true);

  return (
    // ******************* CONTAINER *******************
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* ******************* PRODUCT IMAGE + LOADER ******************* */}
      <View style={styles.imageWrapper}>
        {loading && (
          <ActivityIndicator size="small" color="#999" style={styles.loader} />
        )}
        <Image
          uri={item.image}
          style={styles.image}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      {/* ******************* PRODUCT INFO ******************* */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>Price: €{item.price}</Text>

        {/* ******************* QUANTITY CONTROLS ******************* */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => onChangeQuantity(item.id, -1)}>
            <Ionicons name="remove-circle-outline" size={24} color="#4B2E83" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onChangeQuantity(item.id, 1)}>
            <Ionicons name="add-circle-outline" size={24} color="#4B2E83" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={styles.deleteBtn}
          >
            <Ionicons name="trash-outline" size={22} color="crimson" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ******************* STYLING *******************
// ******************* STYLING *******************
// ******************* STYLING *******************
const styles = StyleSheet.create({
  // ******************* CONTAINER *******************
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  // ******************* PRODUCT IMAGE *******************
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    position: "absolute",
  },
  // ******************* PRODUCT INFO *******************
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-around",
  },
  // ******************* PRODUCT TITLE *******************
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // ******************* PRODUCT PRICE *******************
  price: {
    fontSize: 14,
    color: "#333",
  },
  // ******************* QUANTITY CONTROLS *******************
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  // ******************* DELETE BUTTON *******************
  deleteBtn: {
    marginLeft: "auto",
    paddingHorizontal: 8,
  },
  // ******************* IMAGE WRAPPER *******************
  imageWrapper: {
    width: 100,
    height: 100,
    margin: 2,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  // ******************* LOADER *******************
  loader: {
    position: "absolute",
    zIndex: 1,
  },
});
