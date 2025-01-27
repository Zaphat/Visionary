import { Stack } from "expo-router";
import React from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    "Iceland-Regular": require("./../assets/fonts/Iceland-Regular.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        title: "Visionary",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: fontsLoaded ? "Iceland-Regular" : "sans-serif",
          fontSize: 36,
        },
      }}
    />
  );
}
