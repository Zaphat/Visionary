import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
	CameraButton,
	GalleryButton,
	CreateQRButton,
} from "@/components/Buttons";
import ScannedItem from "@/components/ScannedItem";
import RecentScan from "@/components/RecentScan";
import AccessWidget from "@/components/AccessWidget";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
	BottomSheetScrollView,
	BottomSheetScrollViewMethods,
} from "@gorhom/bottom-sheet";
import { createNotifications } from "react-native-notificated";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScanQRFromImage } from "@/utils/scanImage";
import { Barcode } from "@react-native-ml-kit/barcode-scanning";
import { router } from "expo-router";

const { useNotifications, NotificationsProvider } = createNotifications({
	isNotch: true,
	notificationPosition: "center",
});

export default function Home() {
	// Bottom sheet
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const bottomSheetScrollViewRef = useRef<BottomSheetScrollViewMethods>(null);
	const snapPoints = useMemo(() => ["30%", "60%", "90%"], []);
	const [image, setImage] = useState<string | null>(null);
	const [scanResult, setScanResult] = useState<Barcode[]>([]);

	const { notify } = useNotifications();

	const displayImageScanResult = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				pressBehavior="close"
				appearsOnIndex={1}
				animatedIndex={{
					value: 1,
				}}
			/>
		),
		[]
	);

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsMultipleSelection: false,
				allowsEditing: false,
				quality: 1,
			});

			if (!result.canceled) {
				const selectedUri = result.assets[0].uri;
				setImage(selectedUri);

				let scanResult = await ScanQRFromImage(selectedUri);
				setScanResult(scanResult);
				if (scanResult.length > 0) {
					displayImageScanResult();
				} else {
					notify("error", {
						params: {
							description: "No QR code found.",
							title: "Error",
						},
					});
				}
			}
		} catch (error) {
			console.error("Image picker error:", error);
		}
	};

	const renderItem = useCallback(
		(index: number, item: Barcode) => (
			<ScannedItem key={index} id={index} item={item} />
		),
		[]
	);

	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaProvider>
				<NotificationsProvider />
				<StatusBar style="auto" />
				<SafeAreaView style={styles.container}>
					<View style={styles.widgetGroup}>
						<AccessWidget />
					</View>
					{__DEV__ && (
						<TouchableOpacity
							style={{ backgroundColor: "#fffeee", width: 70, height: 50 }}
							onPress={() => {
								router.push("/(screens)/test-feature");
							}}
						/>
					)}
					<View style={styles.recentScan}>
						<RecentScan />
					</View>
					<View style={styles.accessButton}>
						<GalleryButton onPress={pickImage} />
						<CameraButton />
						<CreateQRButton />
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
			<BottomSheetModalProvider>
				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={0}
					snapPoints={snapPoints}
					backgroundStyle={{ borderRadius: 30 }}
					enableDismissOnClose={true}
					backdropComponent={renderBackdrop}
					enableDynamicSizing={true}
					onDismiss={() => {
						setImage(null);
						setScanResult([]);
					}}>
					<BottomSheetScrollView
						contentContainerStyle={{
							...styles.bottomSheet,
							backgroundColor: "white",
							borderRadius: 30,
							padding: 20,
						}}
						ref={bottomSheetScrollViewRef}>
						<View style={styles.scanResultContainer}>
							{scanResult?.map((value, index) => renderItem(index, value))}
						</View>
					</BottomSheetScrollView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	widgetGroup: {
		flex: 2,
	},
	recentScan: {
		flex: 2,
	},
	accessButton: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	bottomSheet: {
		flex: 1,
		alignItems: "center",
	},
	scanResultContainer: {
		justifyContent: "center",
		alignContent: "space-around",
	},
	resultText: {
		display: "flex",
		textAlign: "justify",
		width: "auto",
		height: "100%",
	},
	resultView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f0f8ff",
		padding: 10,
		marginBottom: 10,
		borderRadius: 10,
		gap: 10,
		width: "95%",
		height: "auto",
	},
});
