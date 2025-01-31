import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function history() {
  return (
    <View style = {styles.container}>
      <Text>history</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
