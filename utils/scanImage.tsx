import BarcodeScanning from "@react-native-ml-kit/barcode-scanning";
import { NativeModules, Platform } from "react-native";
export async function ScanQRFromImage(imageURL: string) {
 const barcodes = await BarcodeScanning.scan(imageURL);
 for (let barcode of barcodes) {
   console.log(barcode.value, barcode.format);
  }
  NativeModules.BarcodeScanning.
}
