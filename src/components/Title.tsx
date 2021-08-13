import React from "react";
import {StyleSheet, Text, TextProps} from "react-native";
import {FontSizes, ThemeColors} from "../../layout";

interface TitleProps extends TextProps {}

const Title: React.FC<TitleProps> = ({children, ...props}) => {
  return (
    <Text
      accessibilityRole={"header"}
      style={styles.title}
      maxFontSizeMultiplier={2}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.extraLarge,
    color: ThemeColors.white,
  },
});
