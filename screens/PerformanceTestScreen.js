import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";

export default function PerformanceTestScreen() {
  const [homeLoadTime, setHomeLoadTime] = useState(null);
  const [homeAddToCartTime, setHomeAddToCartTime] = useState(null);
  const [homeProductCount, setHomeProductCount] = useState(null);
  const [homeOfflineStatus, setHomeOfflineStatus] = useState(null);

  useEffect(() => {
    const fetchHomeMetrics = async () => {
      const load = await AsyncStorage.getItem("homeLoadTime");
      const addToCart = await AsyncStorage.getItem("addToCartTime");
      const productCount = await AsyncStorage.getItem("homeProductCount");
      const offlineStatus = await AsyncStorage.getItem("homeOffline");

      if (load) setHomeLoadTime(Number(load));
      if (addToCart) setHomeAddToCartTime(Number(addToCart));
      if (productCount) setHomeProductCount(Number(productCount));
      if (offlineStatus !== null)
        setHomeOfflineStatus(JSON.parse(offlineStatus));
    };

    fetchHomeMetrics();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchAddToCartTime = async () => {
        const value = await AsyncStorage.getItem("addToCartTime");
        if (value) {
          setHomeAddToCartTime(Number(value));
        }
      };

      fetchAddToCartTime();
    }, [])
  );
  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>Performance Results</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>📱 Platform:</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>🖥️ Home load time (FCP~LCP):</Text>
          <Text style={styles.value}>
            {homeLoadTime !== null ? `${homeLoadTime} ms` : "?"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>🛒 Add to cart reaction time:</Text>
          <Text style={styles.value}>
            {homeAddToCartTime !== null ? `${homeAddToCartTime} ms` : "-"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>🌐 Offline when Home-load:</Text>
          <Text style={styles.value}>
            {homeOfflineStatus === null
              ? "?"
              : homeOfflineStatus
              ? "Yes"
              : "No"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📦 Number of products loaded:</Text>
          <Text style={styles.value}>
            {homeProductCount !== null ? homeProductCount : "?"}
          </Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4B2E83",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ede6ff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  label: {
    fontWeight: "bold",
    color: "#4B2E83",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});
