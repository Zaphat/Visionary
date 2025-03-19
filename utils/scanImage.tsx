import BarcodeScanning from "@react-native-ml-kit/barcode-scanning";
export async function ScanQRFromImage(imageURL: string) {
	const barcodes = await BarcodeScanning.scan(imageURL);
	return barcodes;
}
