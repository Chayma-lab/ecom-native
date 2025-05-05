import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
// ******************* COMPONENT *******************
export default function SearchBar({ value, onChange }) {
  return (
    // ******************* CONTAINER *******************
    // ******************* CONTAINER *******************
    // ******************* CONTAINER *******************
    <View style={styles.wrapper}>
      {/* ******************* SEARCH ICON ******************* */}
      <Ionicons name="search" size={20} color="#999" style={styles.icon} />

      {/* ******************* INPUT ******************* */}
      <TextInput
        style={styles.input}
        placeholder="Search for items, brands and inspiration"
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#999"
      />

      {/* ******************* CLEAR BUTTON ******************* */}
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange("")}>
          <Ionicons
            name="close-circle"
            size={18}
            color="#999"
            style={styles.clear}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ******************* STYLES *******************
// ******************* STYLES *******************
// ******************* STYLES *******************
const styles = StyleSheet.create({
  // ******************* CONTAINER *******************
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  // ******************* CLEAR BUTTON *******************
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
});
