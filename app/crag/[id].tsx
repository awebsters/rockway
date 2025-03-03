import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Corrected import
import { LinearGradient } from "expo-linear-gradient"; // Added LinearGradient

const { width, height } = Dimensions.get("screen");

export default function CragScreen() {
  const params = useLocalSearchParams();
  const { id, picture, title } = params;

  return (
    <View style={styles.container}>
      {/* ScrollView over the entire screen */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]} // Gradient from transparent to semi-opaque black
          style={styles.spacer}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <MaterialIcons name="route" size={16} color="white" />
            <Text style={styles.subtitle}>104 routes</Text>
            <MaterialIcons name="terrain" size={16} color="white" />
            <Text style={styles.subtitle}>Limestone</Text>
          </View>
        </LinearGradient>
        {/* Content below spacer */}
        <View style={styles.content}>
          {/* Add more content here if needed */}
        </View>
      </ScrollView>
      {/* Fixed Image at the top */}
      <Image
        source={{ uri: picture }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      {/* Back button over everything */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="close" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height / 3,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1, // Below ScrollView
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height, // Added to match previous behavior
    zIndex: 2, // Above the image
  },
  contentContainer: {
    flexGrow: 1, // Allows content to expand
  },
  spacer: {
    height: height / 3,
    justifyContent: "flex-end", // Align content to bottom
  },
  content: {
    backgroundColor: "white", // Added for visibility
    padding: 20,
    minHeight: (height * 2) / 3, // Ensure scrollable height
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    zIndex: 3, // Above ScrollView
  },
});
