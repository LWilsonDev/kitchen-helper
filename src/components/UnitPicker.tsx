import React from "react";
import {StyleSheet, Text, View} from "react-native";
import UnitButton from "./UnitButton";
import {ThemeColors, FontSizes} from "../../layout";
import {unitType} from "../../conversions";

export enum INPUT_TYPE {
  INPUT,
  OUTPUT,
}
interface UnitPickerProps {
  units: unitType[];
  handleUnitSelect: (unit: unitType, inputType: INPUT_TYPE) => void;
  selected: unitType | null;
  disabled: unitType | null;
  title: string;
  inputType: INPUT_TYPE;
}

const UnitPicker: React.FC<UnitPickerProps> = ({
  units,
  handleUnitSelect,
  selected,
  disabled,
  title,
  inputType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {units.map((unit: unitType) => {
        return (
          <UnitButton
            selected={unit.id === selected?.id}
            disabled={unit.id === disabled?.id}
            onPress={() => handleUnitSelect(unit, inputType)}
            key={`${unit.label}-${inputType}`}
            title={unit.label}
          />
        );
      })}
    </View>
  );
};

export default UnitPicker;

const styles = StyleSheet.create({
  text: {
    color: ThemeColors.white,
    fontSize: FontSizes.large,
    fontWeight: "600",
  },
  container: {
    alignItems: "center",
    width: "50%",
  },
});
