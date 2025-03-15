import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Storage() {
	return (
		<View style={styles.container}>
			<Text>Storage</Text>
		</View>
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
