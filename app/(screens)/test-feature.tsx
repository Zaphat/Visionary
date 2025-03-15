import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { MultiFormatReader, BarcodeFormat } from "@zxing/library";
export default function TestScreen() {
	return (
		<View>
			<View style={styles.container}>
				<Text>Test</Text>
			</View>
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
		width: "100%",
		height: "50%",
	},
});
