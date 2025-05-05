import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.wrapper}>
      <Ionicons name="search" size={20} color="#999" style={styles.icon} />

      <TextInput
        style={styles.input}
        placeholder="Search for items, brands and inspiration"
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#999"
      />

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

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
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
