import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  CameraButton,
  GalleryButton,
  CreateQRButton,
} from "@/components/Buttons";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import RecentScan from "@/components/RecentScan";
import AccessWidget from "@/components/AccessWidget";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScanQRFromImage } from "@/utils/scanImage";

export default function Home() {
  // Bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%", "60%", "90%"], []);

  const displayImageScanResult = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

  // Image picker
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await ScanQRFromImage(image);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.container}>
          <View style={styles.widgetGroup}>
            <AccessWidget />
          </View>
          {__DEV__ && (
            <TouchableOpacity
              style={{ backgroundColor: "#fffeee", width: 70, height: 50 }}
              onPress={pickImage}
            />
          )}
          <View style={styles.recentScan}>
            <RecentScan />
          </View>
          <View style={styles.accessButton}>
            <GalleryButton onPress={displayImageScanResult} />
            <CameraButton />
            <CreateQRButton />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 30 }}
          enableDismissOnClose={true}
          backdropComponent={renderBackdrop}
          enableDynamicSizing={true}
        >
          <BottomSheetScrollView
            contentContainerStyle={{
              ...styles.bottomSheet,
              backgroundColor: "white",
              borderRadius: 30,
            }}
          >
            <Text>Hello Bitch</Text>
            <Text> Hasta la vista</Text>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    flexWrap: "nowrap",
    gap: 20,
  },
  widgetGroup: {
    alignContent: "center",
  },
  recentScan: {
    visibility: "hidden",
    height: "35%",
  },
  accessButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  bottomSheet: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
