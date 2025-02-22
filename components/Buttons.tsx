import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
export {GalleryButton} from "./GalleryButton";

export function CameraButton() {
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => {
        router.push("/camera");
      }}
    >
      <AntDesign name="scan1" size={32} color="black" />
    </TouchableOpacity>
  );
}

export function CreateQRButton() {
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => {
        router.push("/new-qr");
      }}
    >
      <MaterialCommunityIcons name="qrcode-plus" size={32} color="black" />
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
