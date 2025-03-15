import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Settings() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Text>Settings</Text>
			</SafeAreaView>
		</SafeAreaProvider>
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
