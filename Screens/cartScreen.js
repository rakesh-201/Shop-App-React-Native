import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import DefaultText from "../Components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import Items from "../models/cart-Item";
import CartList from "../Components/CartList";
import Color from "../Constants/color";
import { order } from "../store/action/order";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartItem);
  const Item = [];

  for (var key in cartItem.products) {
    console.log(key);
    const item = cartItem.products[key];
    Item.push(
      new Items(key, item.title, +item.productPrice, item.quantity, +item.sum)
    );
  }

  Item.sort((a, b) => {
    a.key < b.key ? 1 : -1;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.head2}>
        <DefaultText style={styles.txt}>
          Total:{" "}
          <Text style={styles.text}>
            ${cartItem.totalAmount < 0 ? 0 : cartItem.totalAmount.toFixed(2)}
          </Text>
        </DefaultText>
        <Button
          title="ORDER"
          style={{ ...styles.text, ...styles.txt }}
          disabled={Item.length > 0 ? false : true}
          onPress={() => {
            dispatch(order(Item, cartItem.totalAmount.toFixed(2)));
          }}
          color={Color.secondary}
        />
      </View>
      <FlatList
        data={Item}
        renderItem={(item) => <CartList Item={item.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 15,
    // width: "100%",
  },
  head2: {
    padding: 15,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: Color.secondary,
    marginBottom: 10,
  },
  txt: {
    fontSize: 18,
  },
});

export default CartScreen;
