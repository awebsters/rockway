import React from "react";
import { Platform, StyleSheet, ScrollView, Dimensions } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Svg, { Rect } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const screenWidth = Dimensions.get("window").width - 40; // Adding padding to fit the screen

const FilterScreen = () => {
  const data = [500, 1200, 800, 600, 400, 300, 200, 150, 100, 50];

  console.log("React version:", React.version);
  const maxValue = Math.max(...data);
  const chartHeight = 75;
  const barWidth = (screenWidth - 40) / data.length; // Adjust width dynamically
  const svgWidth = data.length * barWidth; // Set SVG width to actual width of bars

  const scaleY = scaleLinear().domain([0, maxValue]).range([0, chartHeight]);

  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([5]);
  const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    React.useState([0, svgWidth]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  const sliderOneValuesChange = (values) => setSliderOneValue(values);
  const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);
  const multiSliderValuesChange = (values) => setMultiSliderValue(values);
  const nonCollidingMultiSliderValuesChange = (values) =>
    setNonCollidingMultiSliderValue(values);

  return (
    <View style={styles.container2}>
      <View style={styles.container}>
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    //alignItems: "center",
    //justifyContent: "center",
    padding: 20,
  },
  svgContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  appContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
});

export default FilterScreen;
