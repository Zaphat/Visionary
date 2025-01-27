import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function RecentScan() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Helvetica",
            fontWeight: "semibold",
          }}
        >
          {" "}
          Recently
        </Text>
        <TouchableOpacity style={styles.settings}>
          <Feather name="more-vertical" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.element}></TouchableOpacity>
      <TouchableOpacity style={styles.element}></TouchableOpacity>
      <TouchableOpacity style={styles.element}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "yellow",
  },
  element: {
    width: "90%",
    height: 50,
    backgroundColor: "blue",
    marginBottom: 10,
    borderRadius: 30,
  },
  header: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  settings: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    tintColor: "grey",
  },
});
