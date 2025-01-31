import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
type Props = {};

export default function AccessWidget({}: Props) {
  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.cell}
          onPress={() => {
            router.push("/browser");
          }}
        >
          <Fontisto name="world-o" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell}
          onPress={() => {
            router.push("/settings");
          }}
        >
          <Ionicons name="settings-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.cell}
          onPress={() => {
            router.push("/history");
          }}
        >
          <Octicons name="history" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell}
          onPress={() => {
            router.push("/storage");
          }}
        >
          <Ionicons name="archive-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 150,
    height: 100,
    backgroundColor: "#FFD08F",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 15,
  },
});
