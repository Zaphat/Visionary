import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function newQR() {
  return (
    <View style={styles.container}>
      <Text>This page is used to create custom QR</Text>
    </View>
  )
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
