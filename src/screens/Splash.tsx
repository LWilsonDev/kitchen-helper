import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Title from "../components/Title";
import {ThemeColors} from "../../layout";

const Splash = () => {
  return (
    <View style={styles.container}>
      <Title>Kitchen Helper</Title>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
  },
});
