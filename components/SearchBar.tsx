import { useState } from 'react';
import { Link, Tabs } from 'expo-router';

import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Make sure to install expo vector icons

/*

              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
 */

const SearchBar = ({placeholder, onSearch, onNearby, onTrending, onFilter}) =>
{
  const [selectedButton, setSelectedButton] = useState('nearby'); // Track selected button

  // Handle button selection
  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[
            styles.filterButton,
            selectedButton === 'nearby' && styles.selectedButton, // Apply selected style
          ]} onPress={() => handleButtonPress('nearby')}>
          <Ionicons name="location" size={20} color="#000" style={styles.icon} />
          <Text style={styles.filterButtonText}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
            styles.filterButton,
            selectedButton === 'trending' && styles.selectedButton, // Apply selected style
          ]} onPress={() => handleButtonPress('trending')}>
          <MaterialIcons name="trending-up" size={20} color="#000" style={styles.icon} />
          <Text style={styles.filterButtonText}>Trending</Text>
        </TouchableOpacity>
        <Link href="/filter" asChild>
          <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
            <MaterialIcons name="filter-list" size={20} color="#000" style={styles.icon} /> 
              <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20, // Default horizontal margin
    paddingVertical: 10, // Default vertical margin
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Space between search bar and buttons
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 5, // Space between buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#e0e0e0', // Change background color when selected
    borderColor: '#000', // Add border color
    borderWidth: 1, // Add border width
  },
  filterButtonText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  icon: {
    marginRight: 0, // Space between icon and text
  },
});

export default SearchBar;