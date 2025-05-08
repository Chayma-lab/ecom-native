import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import Layout from "../components/Layout";

// ******************* DATA *******************
// ******************* DATA *******************
// ******************* DATA *******************
const startTime = Date.now();

export default function PerformanceTestScreen() {
  const [startupTime, setStartupTime] = useState(null);
  const [interactionTime, setInteractionTime] = useState(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const now = Date.now();
    setStartupTime(now - startTime);

    const unsubscribe = NetInfo.addEventListener((state) => {
      setOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  // ******************* INTERACTION *******************
  const handleTestInteraction = () => {
    const before = Date.now();
    setTimeout(() => {
      const after = Date.now();
      setInteractionTime(after - before);
    }, 0);
  };

  // ******************* SRT *******************
  const srt =
    startupTime !== null && interactionTime !== null
      ? startupTime + interactionTime
      : null;

  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>Performance Test</Text>

      <View style={styles.card}>
        {/* ******************* PERFORMANCE DATA ******************* */}
        <View style={styles.row}>
          <Text style={styles.label}>📦 Platform:</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>🚀 App startup time:</Text>
          <Text style={styles.value}>{startupTime} ms</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>⚡ Button reaction time (INP):</Text>
          <Text style={styles.value}>
            {interactionTime !== null ? `${interactionTime} ms` : "Waiting..."}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📡 Offline mode:</Text>
          <Text style={styles.value}>{offline ? "Yes" : "No"}</Text>
        </View>

        <View style={styles.rowVertical}>
          <Text style={styles.label}>📊 System Response Time (SRT):</Text>
          <Text style={styles.valueBlock}>
            {srt !== null
              ? `${startupTime} + ${interactionTime} = ${srt} ms`
              : "Waiting..."}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleTestInteraction}>
        <Ionicons name="sync" size={18} color="#fff" />
        <Text style={styles.buttonText}>Test reaction time</Text>
      </TouchableOpacity>
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
  rowVertical: {
    marginTop: 16,
  },
  valueBlock: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
    fontWeight: "600",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#4B2E83",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
});
