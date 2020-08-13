import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Color from "../Constants/color";
import { useDispatch } from "react-redux";
import { tryAuth } from "../store/action/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryAuthentication = async () => {
      var storedData = await AsyncStorage.getItem("UserData");
      if (!storedData) {
        props.navigation.navigate("auth");
      } else {
        storedData = await JSON.parse(storedData);
        var { expirationDate } = storedData;
        expirationDate = new Date(expirationDate);

        if (expirationDate <= new Date()) {
          props.navigation.navigate("auth");
        } else {
          props.navigation.navigate("main");
          dispatch(
            tryAuth(storedData.idToken, storedData.localId, expirationDate)
          );
        }
      }
    };
    tryAuthentication();
  }, []);

  return (
    <View style={styles.centered}>
      <ActivityIndicator color={Color.primary} size="large" />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
