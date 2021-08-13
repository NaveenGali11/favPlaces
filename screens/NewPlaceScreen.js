import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-action";
import ImgPicker from "../components/ImgPicker";

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState("");

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title));
    props.navigation.navigate("Places");
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImgPicker />
        <Button
          title="Save Place"
          onPress={savePlaceHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
