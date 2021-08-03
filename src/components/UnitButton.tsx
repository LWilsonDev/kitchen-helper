import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {Button, ButtonProps} from "react-native-elements";
import {ThemeColors, Dimens, Spacing} from "../../layout";

interface UnitButtonProps extends ButtonProps {
  selected: boolean;
  disabled: boolean;
}

const UnitButton: React.FC<UnitButtonProps> = ({
  selected,
  disabled,
  ...props
}) => {
  return (
    <Button
      disabled={disabled}
      titleStyle={[selected && !disabled ? styles.selected : null]}
      buttonStyle={[styles.button, selected ? styles.selected : null]}
      {...props}
    />
  );
};

export default UnitButton;

const styles = StyleSheet.create({
  button: {
    //backgroundColor: ThemeColors.brightBlue,
    width: Dimens.unitButton,

    margin: Spacing.standard,
  },
  selected: {
    backgroundColor: ThemeColors.orange,

    textDecorationLine: "underline",
  },
});
