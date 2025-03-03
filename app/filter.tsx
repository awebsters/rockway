import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Checkbox from "expo-checkbox"; // Import expo-checkbox
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width - 40; // Adding padding to fit the screen

const FilterScreen = () => {
  const data_full = [
    ["5.9", 500],
    ["5.10", 1200],
    ["5.11", 800],
    ["5.12", 600],
    ["5.13", 400],
    ["5.14", 300],
    ["5.14a", 200],
    ["5.14c", 150],
    ["5.15", 100],
    ["5.15+", 50],
  ];

  const data = data_full.map(function (v) {
    return v[1];
  });

  const chart_data = [
    {
      name: "Apples",
      population: 215,
      color: "#FF6384",
    },
    {
      name: "Bananas",
      population: 130,
      color: "#36A2EB",
    },
    {
      name: "Oranges",
      population: 65,
      color: "#FFCE56",
    },
  ];

  const maxValue = Math.max(...data);
  const chartHeight = 75;
  const barWidth = (screenWidth - 40) / data.length; // Adjust width dynamically
  const svgWidth = data.length * barWidth; // Set SVG width to actual width of bars

  const scaleY = scaleLinear().domain([0, maxValue]).range([0, chartHeight]);

  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    useState([0, svgWidth]);

  const nonCollidingMultiSliderValuesChange = (values) =>
    setNonCollidingMultiSliderValue(values);

  // State for checkboxes
  const [sportChecked, setSportChecked] = useState(true);
  const [tradChecked, setTradChecked] = useState(true);
  const [boulderChecked, setBoulderChecked] = useState(true);

  // Custom Marker Component
  const CustomMarker = (props) => {
    return (
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
        <Text style={styles.markerText}>
          {data_full[Math.min(Math.floor(props.currentValue / barWidth), 9)][0]}
        </Text>
      </View>
    );
  };

  // Add state for star rating
  const [rating, setRating] = useState(0);

  // Star rating component
  const StarRating = () => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text
              style={[
                styles.star,
                star <= rating ? styles.starFilled : styles.starEmpty,
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        {/* Empty view to balance the layout */}
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Rating</Text>
        <StarRating />
      </View>
      <View style={styles.separator} />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Grade</Text>

        <View style={styles.svgContainer}>
          <Svg width={svgWidth} height={chartHeight}>
            {data.map((value, index) => (
              <Rect
                key={index}
                x={index * barWidth}
                y={chartHeight - scaleY(value)}
                width={barWidth}
                height={scaleY(value)}
                fill="#333"
              />
            ))}
          </Svg>

          <MultiSlider
            values={[
              nonCollidingMultiSliderValue[0],
              nonCollidingMultiSliderValue[1],
            ]}
            sliderLength={svgWidth}
            onValuesChange={nonCollidingMultiSliderValuesChange}
            min={0}
            max={svgWidth}
            step={barWidth}
            allowOverlap={true}
            snapped
            customMarker={CustomMarker}
          />
        </View>
      </View>

      {/* Add the thin line separator */}
      <View style={styles.separator} />

      {/* Add the "Type" section */}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Type</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={sportChecked}
                onValueChange={setSportChecked}
                color={sportChecked ? "#007AFF" : undefined} // Custom color when checked
              />
              <Text style={styles.checkboxLabel}>Sport</Text>
            </View>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={tradChecked}
                onValueChange={setTradChecked}
                color={tradChecked ? "#007AFF" : undefined} // Custom color when checked
              />
              <Text style={styles.checkboxLabel}>Trad</Text>
            </View>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={boulderChecked}
                onValueChange={setBoulderChecked}
                color={boulderChecked ? "#007AFF" : undefined} // Custom color when checked
              />
              <Text style={styles.checkboxLabel}>Boulder</Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
            }}
          >
            <PieChart
              data={chart_data}
              width={180} // Adjust width to fit screen with padding
              height={150}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"0"}
              center={[45, 0]}
              hasLegend={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Optional: add a bottom border
  },
  closeButton: {
    padding: 5, // Adds touchable area around the icon
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSpacer: {
    width: 28, // Matches the icon size to balance the layout
  },
  sectionContainer: {
    padding: 10,
  },
  sectionTitle: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },

  svgContainer: {
    alignItems: "center",
    width: "100%",
  },
  markerContainer: {
    alignItems: "center", // Center the marker and label
    paddingTop: 15,
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF", // Blue marker
  },
  markerText: {
    fontSize: 14,
    color: "#000",
  },
  separator: {
    height: 2,
    width: "100%",
    backgroundColor: "#ccc", // Light gray color for the separator
    marginVertical: 5, // Add some margin at the top
  },

  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  star: {
    fontSize: 30,
    marginRight: 5,
  },
  starFilled: {
    color: "#FFD700", // Gold color for filled stars
  },
  starEmpty: {
    color: "#D3D3D3", // Light gray for empty stars
  },
});

export default FilterScreen;
