import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

// Single Item Component
const Item = ({ item }) => {
  const { picture, title } = item;
  const id = title.toLowerCase().replace(" ", "-");
  // Add query params to the href
  console.log(item);
  const href = {
    pathname: `/crag/${id}`,
    params: { ...item }, // Pass additional params
  };

  return (
    <Link href={href} style={styles.itemContainer}>
      <Image
        source={{ uri: picture }}
        style={styles.itemPicture}
        resizeMode="cover"
      />
      <Text style={styles.itemTitle}>{title}</Text>
    </Link>
  );
};
// List Component
const ResultList = () => {
  const items = [
    {
      picture: "https://picsum.photos/id/10/1920/1080",
      title: "Rattlesnake Point",
    },
    { picture: "https://picsum.photos/id/11/1920/1080", title: "Mount Nemo" },
    { picture: "https://picsum.photos/id/12/1920/1080", title: "Mount Kelso" },
    { picture: "https://picsum.photos/id/13/1920/1080", title: "Devils Glen" },
  ];

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  itemPicture: {
    //TODO: Dynamic sizing
    width: 350,
    height: 250,
    borderRadius: 20,
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ResultList;
