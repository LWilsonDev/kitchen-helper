import React from "react";
import {StyleSheet, Text, View, TextInputProps} from "react-native";
import {ThemeColors, Spacing, FontSizes} from "../../layout";
import {Input} from "react-native-elements";
import {unitType} from "../../conversions";

interface UnitInputProps extends TextInputProps {
  unit: unitType | null;
}

const UnitInput: React.FC<UnitInputProps> = ({unit, ...props}) => {
  const Symbol = () => {
    return unit && unit.symbol ? (
      <Text maxFontSizeMultiplier={2} style={styles.symbol}>
        {unit.symbol}
      </Text>
    ) : null;
  };

  return (
    <View style={styles.wrap}>
      <Input
        inputContainerStyle={styles.input}
        keyboardType="number-pad"
        {...props}
        maxFontSizeMultiplier={2}
        returnKeyType={"done"}
        rightIcon={<Symbol />}
      />
    </View>
  );
};

export default UnitInput;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",

    flex: 1,
  },
  input: {
    backgroundColor: ThemeColors.white,
    marginTop: Spacing.double,
    paddingLeft: Spacing.standard,
  },
  symbol: {
    color: ThemeColors.darkGrey,
    fontSize: FontSizes.large,
    padding: Spacing.half,
  },
});
