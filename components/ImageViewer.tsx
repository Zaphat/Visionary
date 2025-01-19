import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  imgSource: ImageSource;
  selectedImage: string | undefined;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : imgSource}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
});
