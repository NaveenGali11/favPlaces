import React from "react";

import PlacesNavigator from "./navigation/PlacesNavigator";
import { applyMiddleware, combineReducers, createStore } from "redux";
import placesReducer from "./store/places-reducer";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
