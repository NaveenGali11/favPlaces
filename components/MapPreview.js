import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ENV from "../env";
import Colors from "../constants/Colors";

const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {
    // imagePreviewUrl = `https://open.mapquestapi.com/staticmap/v5/map?key=${ENV.mapQuestApiKey}&center=${props.location.lat},${props.location.lng}&defaultMarker=marker-start&zoom=10&size=@2x`;
    imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${props.location.lng},${props.location.lat}&zoom=12.4965&marker=lonlat:${props.location.lng},${props.location.lat};color:%23ff0000;size:medium&apiKey=7ce2aefb47a64a5db9472a4d6d8c511e`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
