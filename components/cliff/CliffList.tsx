import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RouteItem {
  id: string;
  name: string;
  type: string;
  difficulty: string;
}

interface CliffListProps {
  title: string;
  items: RouteItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

const CliffList = ({ title, items, isExpanded, onToggle }: CliffListProps) => {
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
        <View style={styles.listContainer}>
          {items.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.difficulty}>5.{item.difficulty}</Text>
            </View>
          ))}
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
  listContainer: {
    marginTop: 5,
  },
  item: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 3,
    flexDirection: "row",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  type: {
    textAlign: "center",
    flex: 1,
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  difficulty: {
    textAlign: "right",
    flex: 1,
    fontSize: 12,
    color: "#228B22",
    fontWeight: "bold",
  },
});

export default CliffList;
