// not found

import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text>Not Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
