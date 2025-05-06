import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RouteItem {
  id: string;
  name: string;
  type: string;
  difficulty: string;
}

interface CliffSummaryProps {
  title: string;
  items: RouteItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

const CliffSummary = ({
  title,
  items,
  isExpanded,
  onToggle,
}: CliffSummaryProps) => {
  const countRoutesByType = () => {
    const tradCount = items.filter(
      (item) => item.type.toLowerCase() === "trad"
    ).length;
    const sportCount = items.filter(
      (item) => item.type.toLowerCase() === "sport"
    ).length;
    return { tradCount, sportCount };
  };

  const getDifficultyRange = () => {
    if (items.length === 0) return "No routes";
    const difficulties = items.map((item) => parseInt(item.difficulty));
    const min = Math.min(...difficulties);
    const max = Math.max(...difficulties);
    return `5.${min}-5.${max}`;
  };

  const { tradCount, sportCount } = countRoutesByType();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.cliffSection}>{title}</Text>
            <Text style={styles.routeCount}>({items.length} routes)</Text>
          </View>
          <Ionicons
            name={isExpanded ? "caret-down" : "caret-forward"}
            size={16}
            color="black"
          />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryStats}>
            <Text style={styles.summaryText}>
              Difficulty Range: {getDifficultyRange()}
            </Text>
            <Text style={styles.summaryText}>Trad Routes: {tradCount}</Text>
            <Text style={styles.summaryText}>Sport Routes: {sportCount}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cliffSection: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 8,
  },
  routeCount: {
    fontSize: 14,
    color: "#666",
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  summaryStats: {
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#333",
  },
});

export default CliffSummary;
