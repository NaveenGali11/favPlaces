import * as FileSystem from "expo-file-system";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
import { insertPlace, fetchPlaces } from "../helpers/db";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      // `http://api.positionstack.com/v1/reverse ? access_key = ${ENV.positionStackApiKey}& query = ${location.lat},${location.lng}`
      `http://api.positionstack.com/v1/reverse?access_key=5f0af8ddf37d512558e827ca6e44fed4&query=${location.lat},${location.lng}`
    );

    if (!response.ok) {
      // throw new Error("Error at response !!");
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      console.log(errorResData);
      console.log("=============");
      console.log(errorId);

      throw new Error("Operation Failed!!");
    }

    const resData = await response.json();
    if (!resData.data) {
      console.log("Data is Missing !!");
    }

    const address = resData.data[0].label;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
