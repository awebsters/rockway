/**
 * @TODO : perhaps the SearchBar needs to disapear when we scroll?
 */

import { StyleSheet } from "react-native";
import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import ResultList from "@/components/ResultList";

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar placeholder="Where to next?" />
      <ResultList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
