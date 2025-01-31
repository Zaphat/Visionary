import {
  Linking,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import React, { useState, useEffect } from "react";

function PermissionDenied() {
  return (
    <View style={styles.denied}>
      <Text>Camera permission is required to use this feature.</Text>
      <TouchableOpacity onPress={() => Linking.openSettings()}>
        <Text style={{ color: "blue" }}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// granted: Your app is authorized to use said permission. Continue with using the <Camera> view.
// not-determined: Your app has not yet requested permission from the user. Continue by calling the request functions.
// denied: Your app has already requested permissions from the user, but was explicitly denied. You cannot use the request functions again, but you can use the Linking API to redirect the user to the Settings App where he can manually grant the permission.
// restricted: Your app cannot use the Camera or Microphone because that functionality has been restricted, possibly due to active restrictions such as parental controls being in place.

export default function CameraView() {
  const [cameraPermission, setCameraPermission] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // To handle async state loading
  const device = useCameraDevice("back");

  useEffect(() => {
    // Fetch initial camera permission status
    const checkPermission = async () => {
      const permissionStatus = Camera.getCameraPermissionStatus();
      setCameraPermission(permissionStatus);
      setLoading(false);
    };
    checkPermission();
  }, []);

  useEffect(() => {
    // Handle permission request if not-determined
    const requestPermission = async () => {
      if (cameraPermission === "not-determined") {
        const status = await Camera.requestCameraPermission();
        setCameraPermission(status);
      }
    };
    if (cameraPermission === "not-determined") {
      requestPermission();
    }
  }, [cameraPermission]);

  // If permission is granted, render the camera view
  if (cameraPermission === "granted") {
    if (!device) {
      return (
        <View style={styles.container}>
          <Text>Device does not have camera.</Text>
        </View>
      );
    }
    return (
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    );
  }

  // If the permission is denied or restricted, redirect to settings
  if (cameraPermission === "denied" || cameraPermission === "restricted") {
    Alert.alert(
      "Permission Denied",
      "Camera permission is required. Please enable it in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
    return <PermissionDenied />;
  }

  // Loading state or permission not determined
  if (loading || cameraPermission === "not-determined") {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  return <PermissionDenied />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  denied: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
