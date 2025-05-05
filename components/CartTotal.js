import React from "react";
import { View, Text, StyleSheet } from "react-native";

// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
export default function CartTotal({ cart }) {
  const total = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    const price = Number(item.price) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Totaalbedrag:</Text>
      <Text style={styles.amount}>€{total.toFixed(2)}</Text>
    </View>
  );
}

// ******************* STYLES *******************
// ******************* STYLES *******************
// ******************* STYLES *******************
const styles = StyleSheet.create({
  // ******************* CONTAINER *******************
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // ******************* LABEL AND AMOUNT *******************
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4B2E83",
  },
});
