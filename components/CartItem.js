import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartItem({
  item,
  onDelete,
  onChangeQuantity,
  onPress,
}) {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="#999" />
          </View>
        )}
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>Price: €{item.price}</Text>
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

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
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
  deleteBtn: {
    marginLeft: "auto",
    paddingHorizontal: 8,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  loader: {
    position: "absolute",
    zIndex: 1,
  },
});
