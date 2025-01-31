import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Browser() {
  return (
    <>
      <View style={styles.container}>
        <Text> In-app Browser</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
