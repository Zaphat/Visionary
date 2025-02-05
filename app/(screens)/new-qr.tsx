import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import * as Sharing from "expo-sharing";
import QRCode from "react-native-qrcode-svg";
import { useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Textarea } from "@/~/components/ui/textarea";

export default function newQR() {
  const [value, setValue] = React.useState<string>("");
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Textarea
          style={styles.input}
          placeholder="Type something..."
          value={value}
          onChangeText={setValue}
          numberOfLines={4}
          multiline={true}
        />
        <QRCode
          value={value.length < 1 ? "Visionary" : value}
          size={width * 0.6}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              alert("Saving QR Code to Gallery\n Implement later");
            }}
          >
            <MaterialIcons name="save-alt" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              alert("Save QR Code\n Implement later");
            }}
          >
            <MaterialIcons name="save" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              alert("Sharing QR Code\n Implement later");
            }}
          >
            <MaterialIcons name="share" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "space-between",
    alignItems: "center",
    gap: 20,
    paddingTop: 0,
  },
  qr: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 65,
    height: 65,
    display: "flex",
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
});
