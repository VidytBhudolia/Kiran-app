import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ fieldName, value, icon, color }) => {
  return (
    <View style={[styles.card, { borderColor: color, shadowColor: color }]}>
      <Image source={icon} style={[styles.icon, { tintColor: color }]} />
      <Text style={styles.fieldName}>{fieldName}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#f7f7f7", // Slight greyed-out background color
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  value: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Card;
