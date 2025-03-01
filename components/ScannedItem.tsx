import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Barcode } from "@react-native-ml-kit/barcode-scanning";
type Props = {
  id: number;
  item: Barcode;
};
export default function ScannedItem({ id, item }: Props) {
  return (
    <View key={id} style={styles.resultView}>
      <Text
        style={styles.resultText}
        numberOfLines={3}
        ellipsizeMode="tail"
        allowFontScaling
      >
        {item.value}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#fffeb3",
          padding: 5,
          borderRadius: 10,
        }}
        onPress={() => Clipboard.setStringAsync(item.value)}
      >
        <MaterialCommunityIcons name="content-copy" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
