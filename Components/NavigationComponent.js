import React, { useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import ProductNavigator from "../Navigation/productNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

const NavigationComponent = () => {
  const Ref = useRef();
  const auth = useSelector((state) => state.auth.idToken);
  useEffect(() => {
    if (!auth) {
      Ref.current.dispatch(NavigationActions.navigate("auth"));
    }
  }, [auth]);

  return <ProductNavigator ref={Ref} />;
};

export default NavigationComponent;

const styles = StyleSheet.create({});
