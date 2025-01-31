import { Stack } from "expo-router";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loadedFont] = useFonts({
    "Iceland-Regular": require("./../assets/fonts/Iceland-Regular.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={createSettings("Visionary")} />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

function createSettings(title: string) {
  return {
    title: title,
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontFamily: "Iceland-Regular",
      fontSize: 36,
    },
  } as NativeStackNavigationOptions;
}
