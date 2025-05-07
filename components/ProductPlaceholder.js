import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProductPlaceholder() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.text} />
      <View style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  image: {
    height: 120,
    backgroundColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
  },
  text: {
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginBottom: 8,
  },
  button: {
    height: 30,
    width: 80,
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
});
