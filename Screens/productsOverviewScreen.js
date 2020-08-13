import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../Components/ProductList";
import { addToCart } from "../store/action/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Color from "../Constants/color";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import { fetchProduct } from "../store/action/products";

function productsOverviewScreen(props) {
  const products = useSelector((state) => state.product.availableProducts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const detailHandler = useCallback((item) => {
    props.navigation.navigate("detail", {
      Id: item.item.id,
    });
  }, []);

  const fetchingHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      dispatch(fetchProduct());
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [setLoading, dispatch, setError, fetchProduct]);

  useEffect(() => {
    fetchingHandler();
  }, [fetchingHandler]);

  useEffect(() => {
    props.navigation.addListener("willFocus", fetchingHandler);
  }, [fetchingHandler]);

  if (error) {
    return (
      <View>
        <Text> An Error Accurred! </Text>
        <Button
          color={Color.primary}
          title="Try Again"
          onPress={fetchingHandler}
        />
      </View>
    );
  } else if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  } else {
    return (
      <FlatList
        onRefresh={fetchingHandler}
        refreshing={loading}
        data={products}
        renderItem={(item) => (
          <ProductList Item={item} onClick={() => detailHandler(item)}>
            <View style={styles.button}>
              <Button
                color={Color.primary}
                title="Details"
                onPress={() => detailHandler(item)}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Color.primary}
                title="Add To Cart"
                onPress={() => {
                  dispatch(addToCart(item.item));
                }}
              />
            </View>
          </ProductList>
        )}
      />
    );
  }
}

productsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Shopping App",
    headerTitleStyle: {
      fontFamily: "Bold",
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          title="Cart"
          iconSize={22}
          color={Platform.OS === "android" ? "white" : Color.primary}
          onPress={() => navData.navigation.navigate("cart")}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title="Cart"
          iconSize={22}
          color={Platform.OS === "android" ? "white" : Color.primary}
          onPress={() => navData.navigation.toggleDrawer()}
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

export default productsOverviewScreen;
