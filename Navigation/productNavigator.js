import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import productsOverviewScreen from "../Screens/productsOverviewScreen";
import Color from "../Constants/color";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import detailsScreen from "../Screens/detailsScreen";
import cartScreen from "../Screens/cartScreen";
import OrdersScreen from "../Screens/OrdersScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform, ScrollView, Button, SafeAreaView, View } from "react-native";
import UserProducts from "../Screens/UserProducts";
import EditProductScreen from "../Screens/EditProductScreen";
import AuthScreen from "../Screens/AuthScreen";
import StartupScreen from "../Screens/StartupScreen";
import { DrawerItems } from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import { logout } from "../store/action/auth";

const stackNavigatorStyles = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Color.primary,
    },
    headerTintColor: "white",
  },
};

const stackNavigator = createStackNavigator(
  {
    OverviewScreen: productsOverviewScreen,
    detail: detailsScreen,
    cart: cartScreen,
  },
  {
    ...stackNavigatorStyles,
    navigationOptions: {
      drawerIcon: (config) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-home" : "ios-home"}
          size={22}
          color={config.tintColor}
        />
      ),
    },
  }
);

const orderNavigator = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    ...stackNavigatorStyles,
    navigationOptions: {
      drawerIcon: (config) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={22}
          color={config.tintColor}
        />
      ),
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    auth_: AuthScreen,
  },
  stackNavigatorStyles
);

const StartNavigator = createStackNavigator(
  {
    start_: StartupScreen,
  },
  stackNavigatorStyles
);

const userNavigator = createStackNavigator(
  {
    userProducts: UserProducts,
    edit: EditProductScreen,
  },
  {
    ...stackNavigatorStyles,
    navigationOptions: {
      drawerIcon: (config) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-happy" : "ios-happy"}
          size={22}
          color={config.tintColor}
        />
      ),
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    product: stackNavigator,
    order: orderNavigator,
    user: userNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Color.primary,
    },
    contentComponent: (config) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, marginTop: 10 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...config} />
            <Button
              title="LOGOUT"
              onPress={() => dispatch(logout())}
              color={Color.primary}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainWithAuthNavigator = createSwitchNavigator({
  start: StartNavigator,
  auth: AuthNavigator,
  main: MainNavigator,
});

export default createAppContainer(MainWithAuthNavigator);
