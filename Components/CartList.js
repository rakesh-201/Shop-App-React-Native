import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DefaultText from "./DefaultText";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../store/action/cart";
import Color from "../Constants/color";

const CartList = (props) => {
  const item = props.Item;
  const dispatch = useDispatch();
  return (
    <View style={props.style ? null : styles.container}>
      <View style={styles.con2}>
        <View style={styles.textCon}>
          <DefaultText> ({item.quantity}) </DefaultText>
          <DefaultText> {item.title} </DefaultText>
        </View>
        <View style={styles.text3}>
          <DefaultText style={styles.txt}> ${item.sum} </DefaultText>
          {!props.style && (
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              style={styles.icon}
              size={22}
              color="red"
              onPress={() => dispatch(deleteFromCart(item))}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    flex: 1,
  },
  con2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text3: {
    textAlign: "right",
    flexDirection: "row",
    paddingRight: 0,
    flex: 1,
    width: "30%",
    justifyContent: "flex-end",
    marginHorizontal: 3,
  },
  textCon: {
    flexDirection: "row",
    width: "70%",
  },
  txt: {
    color: Color.secondary,
  },
});

export default CartList;
