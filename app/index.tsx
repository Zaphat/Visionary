import { StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  CameraButton,
  GalleryButton,
  CreateQRButton,
} from "@/components/Buttons";
import React from "react";
import RecentScan from "@/components/RecentScan";
import AccessWidget from "@/components/AccessWidget";

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.widgetGroup}>
          <AccessWidget />
        </View>
        <View style={styles.recentScan}>
          <RecentScan />
        </View>
        <View style={styles.accessButton}>
          <GalleryButton />
          <CameraButton />
          <CreateQRButton />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    flexWrap: "nowrap",
  },
  widgetGroup: {
    alignContent: "center",
  },
  recentScan: {
    visibility: "hidden",
    height: "35%",
  },
  accessButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
});
