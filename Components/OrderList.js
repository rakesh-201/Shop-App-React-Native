import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DefaultText from "./DefaultText";
import Card from "./Card";
import Color from "../Constants/color";
import CartList from "./CartList";

const OrderList = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card>
      <View style={styles.card}>
        <View style={styles.con1}>
          <DefaultText>${props.amount}</DefaultText>
          <DefaultText>Dates</DefaultText>
        </View>
        <Button
          title="Show Details"
          color={Color.primary}
          onPress={() => setShowDetails((prev) => !prev)}
        />
        {showDetails ? (
          <View>
            {props.item.map((item, index) => (
              <View
                key={item.id}
                style={{
                  alignItems: "center",
                  width: "85%",
                  marginTop: 12,
                  marginBottom: 8,
                  elevation: 2,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 10,
                  shadowOpacity: 0.5,
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <CartList Item={item} style={true} />
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },
  con1: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});

export default OrderList;
