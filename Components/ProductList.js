import React from "react";
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Button,
} from "react-native";
import Color from "../Constants/color";
import DefaultText from "../Components/DefaultText";

const ProductList = (props) => {
  let Touch = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touch = TouchableNativeFeedback;
  }

  return (
    <View style={styles.scr}>
      <View style={styles.container}>
        <Touch onPress={props.onClick} style={styles.touch}>
          <View style={styles.screen}>
            <View style={styles.imageCon}>
              <Image source={{ uri: props.Item.item.imageUrl }} />
            </View>
            <DefaultText> {props.Item.item.title} </DefaultText>
            <DefaultText> ${props.Item.item.price} </DefaultText>
            <View style={styles.buttons}>{props.children}</View>
          </View>
        </Touch>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: 300,
    alignItems: "center",
    borderRadius: 10,
  },
  imageCon: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
    overflow: "hidden",
  },
  buttons: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    marginVertical: 5,
    borderRadius: 10,
    width: "95%",
  },
  scr: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
    overflow: "hidden",
  },
  touch: {
    borderRadius: 10,
  },
});

export default ProductList;
