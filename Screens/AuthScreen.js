import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import Color from "../Constants/color";
import Input from "../Components/Input";
import { useDispatch } from "react-redux";
import { addUser, login } from "../store/action/auth";
import Card from "../Components/Card";
import { TextInput } from "react-native-gesture-handler";

const INPUT = "INPUT";

const form = (state, action) => {
  switch (action.type) {
    case INPUT:
      return {
        ...state,
        value: {
          ...state.value,
          [action.id]: action.value,
        },
        validity: {
          ...state.validity,
          [action.id]: action.validity,
        },
      };
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState();

  const [state, screenDispatch] = useReducer(form, {
    value: {
      type: INPUT,
      email: "",
      password: "",
    },
    validity: {
      email: false,
      password: false,
    },
  });

  const dispatchHandler = useCallback(
    (id, value, valid) => {
      screenDispatch({ type: INPUT, id: id, value: value, validity: valid });
    },
    [screenDispatch]
  );

  const confirmHandler = useCallback(async () => {
    if (state.validity.email && state.validity.password) {
      setError(undefined);
      if (isSignUp) {
        try {
          dispatch(addUser(state.value.email, state.value.password));
          setIsSignUp(false);
          await dispatchHandler("email", "", false);
          await dispatchHandler("password", "", false);
        } catch (err) {
          setError(err.message);
        }
      } else {
        try {
          console.log("in");
          await dispatch(login(state.value.email, state.value.password));
          props.navigation.navigate("main");
        } catch (err) {
          setError(err.message);
        }
      }
      if (error) {
        //
        //
        //
        //
      }
    } else {
      Alert.alert("Wrong Input!", "Please enter valid input", [
        { text: "Okay", style: "destructive" },
      ]);
    }
  }, [state]);

  return (
    <ScrollView contentContainerStyle={styles.con2}>
      <KeyboardAvoidingView style={styles.screen}>
        <Card style={styles.container}>
          <View style={styles.con3}>
            <Input
              text={styles.text}
              style={styles.input}
              formDispatch={dispatchHandler}
              header="Email"
              id="email"
              blurOnSubmit
              value="1"
              required
              email
              errMsg="Please enter a valid email!"
              keyboardType="default"
            />
            <Input
              text={styles.text}
              style={styles.input}
              formDispatch={dispatchHandler}
              header="Password"
              id="password"
              blurOnSubmit
              value="1"
              required
              minLength={4}
              secureTextEntry
              errMsg="Please enter a valid password!"
              keyboardType="default"
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "SignUp" : "LogIn"}
                color={Color.primary}
                onPress={confirmHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch To ${isSignUp ? "LogIn" : "SignUp"}`}
                color={Color.primary}
                onPress={() => setIsSignUp((prevState) => !prevState)}
              />
            </View>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
  headerTitleStyle: {
    fontFamily: "Bold",
  },
  headerTintColor: "white",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: Dimensions.get("window").height / 2,
    width: (Dimensions.get("window").width * 2) / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 200,
    marginVertical: 5,
  },
  con2: {
    flex: 1,
  },
  con3: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
  input: {
    width: 200,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  text: {
    marginTop: 5,
  },
});

export default AuthScreen;
