import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import React from "react";

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="browser" options={createSettings("Safe Browser")} />
      <Stack.Screen name="new-qr" options={createSettings("New QR")} />
      <Stack.Screen name="settings" options={createSettings("Settings")} />
      <Stack.Screen name="history" options={createSettings("History")} />
      <Stack.Screen name="storage" options={createSettings("Storage")} />
      <Stack.Screen
        name="camera"
        options={{
          headerShown: false,
        }}
      />
      {__DEV__ && (
        <Stack.Screen name="test-feature" options={createSettings("Dev")} />
      )}
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
