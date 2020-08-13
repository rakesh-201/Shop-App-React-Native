import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Color from "../Constants/color";
import DefaultText from "../Components/DefaultText";
import { createProduct, editProduct } from "../store/action/products";
import Input from "../Components/Input";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";

const INPUT = "INPUT";

const form = (state, action) => {
  const print = { a: [[[[[state], [action]]]]] };
  console.log(print);
  switch (action.type) {
    case INPUT:
      return {
        ...state,
        value: {
          ...state.value,
          [action.id]: action.value,
        },
        validity: {
          ...state.validity,
          [action.id]: action.validity,
        },
      };
    default:
      return state;
  }
};

const EditProductScreen = (props) => {
  const itemId = props.navigation.getParam("id");
  var product = useSelector((state) => state.product.availableProducts);
  product = product.find((product) => product.id === itemId);

  const [state, screenDispatch] = useReducer(form, {
    value: {
      type: INPUT,
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: "",
      description: product ? product.description : "",
    },
    validity: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },
  });

  const dispatch = useDispatch();

  var item = {
    id: new Date().toString(),
    title: state.value.title,
    imageUrl: state.value.imageUrl,
    price: state.value.price,
    description: state.value.description,
  };

  if (product) {
    item = {
      id: product.id,
      title: state.value.title,
      imageUrl: state.value.imageUrl,
      description: state.value.description,
    };
  }

  useEffect(() => {
    props.navigation.setParams({
      confirm: confirmHandler,
      state: state,
    });
  }, [confirmHandler, state]);

  const confirmHandler = useCallback(() => {
    if (
      state.validity.title &&
      state.validity.imageUrl &&
      state.validity.price &&
      state.validity.description
    ) {
      props.navigation.goBack();
      return product
        ? dispatch(editProduct(item))
        : dispatch(createProduct(item));
    } else {
      Alert.alert("Wrong Input!", "Please enter valid input", [
        { text: "Okay", style: "destructive" },
      ]);
    }
  }, [state]);

  const dispatchHandler = useCallback(
    (id, value, valid) => {
      console.log(value);
      screenDispatch({ type: INPUT, id: id, value: value, validity: valid });
    },
    [screenDispatch]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={500}>
      <ScrollView contentContainerStyle={styles.con}>
        <Input
          formDispatch={dispatchHandler}
          header="Title"
          id="title"
          blurOnSubmit
          values={product}
          required
          autoCorrect
          autoCapitalize="sentences"
          errMsg="Please enter a valid title!"
          keyboardType="default"
        />

        <Input
          formDispatch={dispatchHandler}
          header="Image URL"
          id="imageUrl"
          blurOnSubmit
          values={product}
          required
          keyboardType="default"
          autoCorrect
          autoCapitalize="sentences"
          errMsg="Please enter a valid URL!"
        />

        {product ? null : (
          <Input
            formDispatch={dispatchHandler}
            header="Price"
            id="price"
            blurOnSubmit
            values={product}
            required
            keyboardType="decimal-pad"
            autoCorrect
            min={0.01}
            autoCapitalize="sentences"
            errMsg="Please enter a valid price!"
          />
        )}

        <Input
          formDispatch={dispatchHandler}
          header="Description"
          values={product}
          id="description"
          blurOnSubmit
          required
          keyboardType="default"
          autoCorrect
          autoCapitalize="sentences"
          errMsg="Please enter a valid description!"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const itemId = navData.navigation.getParam("id");
  const confirmHandler = navData.navigation.getParam("confirm");
  const state = navData.navigation.getParam("state");

  return {
    headerTitle: itemId ? "Edit Product" : "Add Product",
    headerTitleStyle: {
      fontFamily: "Bold",
    },
    headerTintColor: "white",
    headerRight: (config) => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          iconSize={22}
          title="Confirm"
          onPress={() => confirmHandler(state)}
          color={Platform.OS === "android" ? "white" : config.tintColor}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  con: {
    padding: 20,
  },
});

export default EditProductScreen;
