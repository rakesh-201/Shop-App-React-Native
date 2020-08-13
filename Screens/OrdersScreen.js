import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import Color from "../Constants/color";
import { useSelector, useDispatch } from "react-redux";
import OrderList from "../Components/OrderList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import { fetchOrder } from "../store/action/order";

const OrdersScreen = (props) => {
  const Orders = useSelector((state) => state.order.products);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const fetchHandler = useCallback(async () => {
    setLoading(true);
    dispatch(fetchOrder());
    setLoading(false);
  }, [setLoading, dispatch, fetchOrder]);

  useEffect(() => {
    props.navigation.addListener("willFocus", fetchHandler());
  }, [fetchHandler]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  } else {
    return (
      <FlatList
        data={Orders}
        renderItem={(item) => {
          {
            console.log(item);
          }
          return (
            <OrderList
              amount={item.item.totalAmount}
              date={item.item.date}
              item={item.item.items}
            />
          );
        }}
      />
    );
  }
};

OrdersScreen.navigationOptions = (navData) => {
  return {
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
    headerTitle: "Your Orders",
    headerTitleStyle: {
      fontFamily: "Bold",
    },
    headerTintColor: "white",
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
