import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { combineReducers, createStore, applyMiddleware } from "redux";
import products from "./store/reducer/products";
import { Provider } from "react-redux";
import { useFonts } from "@expo-google-fonts/inter";
import cartItems from "./store/reducer/cart";
import orders from "./store/reducer/order";
import ReduxThunk from "redux-thunk";
import auth from "./store/reducer/auth";
import NavigationComponent from "./Components/NavigationComponent";

export default function App() {
  const productReducer = combineReducers({
    product: products,
    cartItem: cartItems,
    order: orders,
    auth: auth,
  });

  const [Fonts, error] = useFonts({
    Regular: require("./assets/Fonts/PlayfairDisplay-Regular.ttf"),
    Bold: require("./assets/Fonts/PlayfairDisplay-Bold.ttf"),
  });

  const store = createStore(productReducer, applyMiddleware(ReduxThunk));

  if (!Fonts) {
    return <View></View>;
  }
  return (
    <Provider store={store}>
      <NavigationComponent />
      <StatusBar style="auto" />
    </Provider>
  );
}
