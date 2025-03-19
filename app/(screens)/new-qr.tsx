import {
	StyleSheet,
	useWindowDimensions,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useMemo, useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Textarea } from "@/~/components/ui/textarea";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Clipboard from "expo-clipboard";
import { createNotifications } from "react-native-notificated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	QrCodeSvg,
	plainRenderer,
	triangleRenderer,
	circleRenderer,
	renderCircle,
	type RenderParams,
	renderSquare,
	type CustomRenderer,
	Kind,
} from "react-native-qr-svg";

const { useNotifications, NotificationsProvider } = createNotifications({
	isNotch: true,
	notificationPosition: "top",
});

const customRenderer: CustomRenderer = {
	render: {
		[Kind.Circle]: (params: RenderParams) => {
			if (params.isSquareElem) {
				return renderSquare(params.corners);
			}
			return renderCircle(params.corners.center, params.cellSize);
		},
		[Kind.Element]: (params: RenderParams) => {
			if (params.isSquareElem) {
				return renderSquare(params.corners);
			}
			return renderCircle(params.corners.center, params.cellSize);
		},
	},
};
const QR_STYLES = [
	{
		name: "Default",
		props: {},
	},
	{
		name: "Content Cells",
		props: {
			contentCells: 5,
		},
	},
	{
		name: "Gradient",
		props: {
			gradientColors: ["#0800ff", "#ff0000"],
		},
	},
	{
		name: "Inverted",
		props: {
			contentCells: 5,
			dotColor: "#ffffff",
			backgroundColor: "#000000",
		},
	},
	{
		name: "Plain",
		props: {
			renderer: { ...plainRenderer, options: { padding: 0 } },
		},
	},
	{
		name: "Triangle",
		props: {
			renderer: { ...triangleRenderer, options: { padding: 0 } },
		},
	},
	{
		name: "Circle",
		props: {
			renderer: { ...circleRenderer, options: { padding: 0 } },
		},
	},
	{
		name: "Custom",
		props: {
			renderer: customRenderer,
		},
	},
];

export default function NewQR() {
	const viewShotRef = useRef<any>(null);
	const [notificationId, setNotificationId] = useState<string | null>(null);
	const [value, setValue] = useState<string>("");
	const [styleIndex, setStyleIndex] = useState<number>(0);
	const { width, height } = useWindowDimensions();
	const { notify, remove } = useNotifications();

	// Use useMemo to create the current QR style based on styleIndex
	const currentStyle = useMemo(() => QR_STYLES[styleIndex], [styleIndex]);

	const nextStyleIndex = useMemo(
		() => (styleIndex + 1) % QR_STYLES.length,
		[styleIndex]
	);

	const onQRStyleChange = useCallback(() => {
		setStyleIndex(nextStyleIndex);
	}, [nextStyleIndex]);

	const onQRShare = useCallback(async () => {
		try {
			const uri = await captureRef(viewShotRef, {
				format: "png",
				quality: 1,
			});
			await Sharing.shareAsync(uri);
		} catch (error) {
			displayError(error);
		}
	}, [viewShotRef, notificationId, notify, remove]);

	const onQRSave = useCallback(async () => {
		try {
			const uri = await captureRef(viewShotRef, {
				format: "png",
				quality: 1,
			});
			MediaLibrary.saveToLibraryAsync(uri)
				.then(() => {
					remove(notificationId);
					setNotificationId(
						notify("success", {
							params: {
								title: "Image saved to gallery!",
							},
						}).id
					);
				})
				.catch((error) => {
					displayError(error);
				});
		} catch (error) {
			displayError(error);
		}
	}, [viewShotRef, notificationId, notify, remove]);

	const onQRCopy = useCallback(async () => {
		try {
			const image = await captureRef(viewShotRef, {
				format: "png",
				quality: 1,
				result: "base64",
			});
			Clipboard.setImageAsync(image)
				.then(() => {
					remove(notificationId);
					setNotificationId(
						notify("success", {
							params: {
								title: "Copied to clipboard!",
							},
						}).id
					);
				})
				.catch((error) => {
					displayError(error);
				});
		} catch (error) {
			displayError(error);
		}
	}, [viewShotRef, notificationId, notify, remove]);

	const displayError = useCallback(
		(error: any) => {
			if (notificationId) {
				remove(notificationId);
			}

			setNotificationId(
				notify("error", {
					params: {
						description: String(error),
						title: "Error",
					},
				}).id
			);
		},
		[notificationId, notify, remove]
	);

const renderQRCode = useMemo(() => {
	const qrValue = value.length < 1 ? "Visionary" : value;
	const qrSize = width * 0.6;

	return (
		<TouchableOpacity activeOpacity={1} onPress={onQRStyleChange}>
			<ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
				<View
					style={{
						...styles.qr,
						backgroundColor: "#fff",
						width: width * 0.65,
						height: height * 0.35,
					}}>
					<QrCodeSvg
						value={qrValue}
						frameSize={qrSize}
						style={{ width: qrSize, height: qrSize }}
						{...currentStyle.props}
					/>
				</View>
			</ViewShot>
		</TouchableOpacity>
	);
}, [value, width, height, currentStyle, onQRStyleChange, viewShotRef]);

	const actionButtons = useMemo(
		() => (
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={onQRSave}>
					<MaterialIcons name="save-alt" size={32} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={onQRCopy}>
					<MaterialIcons name="save" size={32} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={onQRShare}>
					<MaterialIcons name="share" size={32} color="white" />
				</TouchableOpacity>
			</View>
		),
		[onQRSave, onQRCopy, onQRShare]
	);

	return (
		<GestureHandlerRootView style={styles.root}>
			<SafeAreaProvider>
				<NotificationsProvider />
				<SafeAreaView style={styles.container}>
					<Textarea
						style={styles.input}
						placeholder="Type something..."
						value={value}
						onChangeText={setValue}
						numberOfLines={4}
						multiline={true}
					/>

					{renderQRCode}

					<Text style={styles.hint}>Tap QR to change style</Text>

					{actionButtons}
				</SafeAreaView>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 20,
	},
	qr: {
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 10,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 10,
		borderRadius: 10,
		marginTop: 20,
		width: 65,
		height: 65,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		marginTop: 20,
		width: "80%",
		height: "30%",
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 10,
		padding: 20,
		paddingLeft: 10,
		textAlignVertical: "top",
	},
	hint: {
		color: "#898989",
	},
});
