import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";

const PlacesDetailsScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");

  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView>
      <Image source={{ uri: selectedPlace.image }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedPlace.title}</Text>
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.address}>
          <Text>{selectedPlace.address}</Text>
        </View>
        <View style={styles.mapStyles}>
          <MapPreview location={selectedLocation} onPress={showMapHandler} />
        </View>
      </View>
    </ScrollView>
  );
};

PlacesDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  locationContainer: {
    elevation: 10,
    padding: 25,
    margin: 10,
    borderColor: "#ccc",
  },
  mapStyles: {
    borderWidth: 1,
    height: 200,
  },
  address: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 14,
    fontStyle: "italic",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
});

export default PlacesDetailsScreen;
