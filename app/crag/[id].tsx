/**
 *
 * @Point : This view shows the details of a crag.
 *        The user should only click on this when they already
 *        know they are interested. Apps like the mountain project
 *        requiring clicking on a crag to see any details. This makes
 *        the app feel clunky. It also changes the design of this page so
 *        route bar charts and summaries are visiable at the top of the page.
 *        In other words, this page is to get in depth information about a crag,
 *        not quick summary information.
 *
 * @TODO :
 *  - Description should be a collapsible section based on the height of the text
 *
 */

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/components/useColorScheme";
import CliffSummary from "@/components/cliff/CliffSummary";
import CliffList from "@/components/cliff/CliffList";

const { width, height } = Dimensions.get("screen");

interface RouteItem {
  id: string;
  name: string;
  type: string;
  difficulty: string;
}

interface CliffData {
  id: string;
  name: string;
  routes: RouteItem[];
}

export default function CragScreen() {
  const params = useLocalSearchParams();
  const { id, picture, title } = params;
  const scrollViewRef = useRef<ScrollView>(null);
  const [lastOffsetY, setLastOffsetY] = useState(0);
  const [viewMode, setViewMode] = useState<"summary" | "list">("summary");
  const [expandedCliffs, setExpandedCliffs] = useState<Record<string, boolean>>(
    {}
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffsetY < lastOffsetY;

    if (currentOffsetY <= 0 && isScrollingUp) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }

    setLastOffsetY(currentOffsetY);
  };

  const cliffs: CliffData[] = [
    {
      id: "east",
      name: "East Cliff",
      routes: [
        { id: "1", name: "Eagle's Nest", type: "Trad", difficulty: "8" },
        { id: "2", name: "Granite Groove", type: "Sport", difficulty: "10" },
        { id: "3", name: "Screaming Slab", type: "Trad", difficulty: "6" },
        { id: "4", name: "Pinnacle Prowl", type: "Sport", difficulty: "11" },
        { id: "5", name: "Crack Attack", type: "Trad", difficulty: "7" },
        { id: "6", name: "Overhang Odyssey", type: "Sport", difficulty: "12" },
        { id: "7", name: "Ridge Runner", type: "Trad", difficulty: "9" },
        { id: "8", name: "Boulder Dash", type: "Sport", difficulty: "8" },
        { id: "9", name: "Chimney Sweep", type: "Trad", difficulty: "10" },
        { id: "10", name: "Face Off", type: "Sport", difficulty: "6" },
        { id: "11", name: "Ledge Legend", type: "Trad", difficulty: "11" },
        { id: "12", name: "Summit Sprint", type: "Sport", difficulty: "7" },
      ],
    },
    {
      id: "west",
      name: "West Cliff",
      routes: [
        { id: "13", name: "Sunset Slab", type: "Trad", difficulty: "8" },
        { id: "14", name: "Western Wall", type: "Sport", difficulty: "9" },
      ],
    },
  ];

  // Initialize expandedCliffs after cliffs is defined
  React.useEffect(() => {
    setExpandedCliffs(
      cliffs.reduce((acc, cliff) => ({ ...acc, [cliff.id]: true }), {})
    );
  }, []);

  const toggleCliff = (cliffId: string) => {
    setExpandedCliffs((prev) => ({
      ...prev,
      [cliffId]: !prev[cliffId],
    }));
  };

  return (
    <View>
      {/* ScrollView over the entire screen */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Improve performance
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgb(255, 255, 255)"]}
          style={styles.spacer}
          locations={[0.7, 1]}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <MaterialIcons name="route" size={16} color="black" />
            <Text style={styles.subtitle}>104 routes</Text>
            <MaterialIcons name="terrain" size={16} color="black" />
            <Text style={styles.subtitle}>Limestone</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.header}>Summary</Text>
          <Text>
            Good crag for moderate sport routes. Has a ground-level bolted
            anchor for learning to clean sport routes.
          </Text>
          <Text style={styles.header}>Description</Text>
          <Text>
            Due to changes in bolting, it is best to always take bolt number
            information with caution.
          </Text>

          <Text style={styles.header}>Access Issues</Text>
          <Text>
            In the more populated areas of Ontario, especially southern and
            south-western Ontario (within a few hours drive of Toronto) access
            is often complicated, with many cliffs closed to climbing.
          </Text>

          <Text style={styles.header}>Approach</Text>
          <Text>
            Park in the lot off of 10th Line and follow the well marked trail
            over a stream to the cliff.
          </Text>

          <View style={styles.viewToggleContainer}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "summary" && styles.activeToggleButton,
              ]}
              onPress={() => setViewMode("summary")}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === "summary" && styles.activeToggleText,
                ]}
              >
                Summary View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "list" && styles.activeToggleButton,
              ]}
              onPress={() => setViewMode("list")}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === "list" && styles.activeToggleText,
                ]}
              >
                List View
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.header}>Route and Cliffs</Text>

          {cliffs.map((cliff) =>
            viewMode === "summary" ? (
              <CliffSummary
                key={cliff.id}
                title={cliff.name}
                items={cliff.routes}
                isExpanded={expandedCliffs[cliff.id] || false}
                onToggle={() => toggleCliff(cliff.id)}
              />
            ) : (
              <CliffList
                key={cliff.id}
                title={cliff.name}
                items={cliff.routes}
                isExpanded={expandedCliffs[cliff.id] || false}
                onToggle={() => toggleCliff(cliff.id)}
              />
            )
          )}
        </View>
      </ScrollView>

      <Image
        source={{ uri: picture as string }}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="close" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height / 2,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 2,
  },
  contentContainer: {
    flexGrow: 1,
  },
  spacer: {
    height: height / 2,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    minHeight: (height * 2) / 3,
    paddingBottom: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingVertical: 10,
  },
  cliffSection: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingRight: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 10,
    paddingBottom: 30,
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
    zIndex: 3,
  },
  viewToggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    gap: 10,
  },
  viewToggleButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeToggleButton: {
    backgroundColor: "#007AFF",
  },
  viewToggleText: {
    color: "#666",
    fontWeight: "500",
  },
  activeToggleText: {
    color: "white",
  },
});
