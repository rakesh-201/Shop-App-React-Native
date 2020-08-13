import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import ProductList from "../Components/ProductList";
import Color from "../Constants/color";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, fetchProduct } from "../store/action/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";

const UserProducts = (props) => {
  const products = useSelector((state) => state.product.userProducts);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const editHandler = useCallback(
    (item) => {
      props.navigation.navigate("edit", { id: item.item.id });
    },
    [products]
  );

  const fetchHandler = useCallback(async () => {
    setLoading(true);
    dispatch(fetchProduct());
    setLoading(false);
  }, [setLoading, dispatch, fetchProduct]);

  useEffect(() => {
    const Reload = props.navigation.addListener("willFocus", fetchHandler());

    return () => {
      Reload.remove();
    };
  }, [fetchHandler]);

  console.log(products[0].id);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={(item) => (
        <View>
          <ProductList Item={item} onClick={() => editHandler(item)}>
            <View style={styles.button}>
              <Button
                color={Color.primary}
                title="Edit"
                onPress={() => editHandler(item)}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Color.primary}
                title="Delete"
                onPress={() => {
                  dispatch(deleteProduct(item.item.id));
                }}
              />
            </View>
          </ProductList>
        </View>
      )}
    />
  );
};

UserProducts.navigationOptions = (navdata) => {
  return {
    headerTitle: "Your Products",
    headerTitleStyle: {
      fontFamily: "Bold",
    },
    headerTintColor: "white",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title="Cart"
          iconSize={22}
          color={Platform.OS === "android" ? "white" : Color.primary}
          onPress={() => navdata.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          title="Cart"
          iconSize={22}
          color={Platform.OS === "android" ? "white" : Color.primary}
          onPress={() => navdata.navigation.navigate("edit")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  button: {
    width: 115,
    marginVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProducts;
