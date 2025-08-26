import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Sidebar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.sidebarText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("Comparisons")}
      >
        <Text style={styles.sidebarText}>Comparisons</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  sidebarItem: {
    paddingVertical: 12,
  },
  sidebarText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Sidebar;
