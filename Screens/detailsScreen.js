import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Color from "../Constants/color";
import DefaultText from "../Components/DefaultText";
import { addToCart } from "../store/action/cart";

const detailsScreen = (props) => {
  const itemId = props.navigation.getParam("Id");
  const Item = useSelector((state) => state.product.availableProducts).find(
    (item) => item.id === itemId
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: Item.imageUrl }} style={styles.img} />
        <View style={styles.text}>
          <DefaultText> {Item.price} </DefaultText>
          <DefaultText> {Item.description} </DefaultText>
        </View>
        <Button
          title="Add To Cart"
          color={Color.primary}
          onPress={() => {
            dispatch(addToCart(Item));
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  img: {
    height: 300,
    marginVertical: 10,
  },
  text: {
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default detailsScreen;
