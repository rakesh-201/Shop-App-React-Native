import React, { useCallback, useReducer, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import DefaultText from "./DefaultText";

const INPUT = "INPUT";
const INPUT_BLUR = "INPUT_BLUR";

const input = (state, action) => {
  switch (action.type) {
    case INPUT:
      return {
        ...state,
        value: action.value,
        valid: action.valid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const { values } = props;

  const [state, dispatch] = useReducer(input, {
    type: INPUT,
    value: values ? values[props.id] : "",
    valid: !!values,
    touched: false,
  });

  const { formDispatch } = props;

  useEffect(() => {
    // if (state.touched) {
    formDispatch(props.id, state.value, state.valid);
    // }
  }, [formDispatch, state]);

  const textChangeHandler = useCallback((text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT, value: text, valid: isValid });
  }, []);

  const inputBlur = useCallback(() => {
    dispatch({ type: INPUT_BLUR });
  }, []);

  return (
    <View style={props.text}>
      <DefaultText>{props.header}</DefaultText>
      <TextInput
        {...props}
        onChange={(text) => textChangeHandler(text.nativeEvent.text)}
        value={state.value}
        onBlur={inputBlur}
      />
      {!state.valid && state.touched && (
        <DefaultText style={styles.err}>{props.errMsg}</DefaultText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  err: {
    color: "red",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

export default Input;
