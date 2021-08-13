import React, {useState} from "react";
import {StyleSheet, Text, View, TextInputProps} from "react-native";
import {ThemeColors, Spacing, FontSizes} from "../../layout";
import {Input} from "react-native-elements";
import {unitType} from "../../conversions";

interface UnitInputProps extends TextInputProps {
  unit: unitType | null;
  handleSubmit?: (value: string) => void;
  error?: string;
}

const UnitInput: React.FC<UnitInputProps> = ({
  unit,
  handleSubmit,
  error,
  ...props
}) => {
  const Symbol = () => {
    return unit && unit.symbol ? (
      <Text maxFontSizeMultiplier={2} style={styles.symbol}>
        {unit.symbol}
      </Text>
    ) : null;
  };

  const [value, setValue] = useState<string>("");

  return (
    <View style={styles.wrap}>
      <Input
        maxLength={4}
        inputContainerStyle={styles.input}
        keyboardType="number-pad"
        {...props}
        maxFontSizeMultiplier={2}
        returnKeyType={"done"}
        errorMessage={error}
        errorStyle={styles.error}
        onChangeText={(text) => {
          setValue(text);
        }}
        onBlur={() => {
          if (handleSubmit) {
            handleSubmit(value);
          }
        }}
        onSubmitEditing={() => {
          if (handleSubmit) {
            handleSubmit(value);
          }
        }}
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
  error: {
    fontSize: FontSizes.medium,
  },
});
