import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

import React from "react";

type Props = {
  onPress?: () => void;
};

export function GalleryButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <AntDesign name="picture" size={32} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.camera.primary,
  },
});
