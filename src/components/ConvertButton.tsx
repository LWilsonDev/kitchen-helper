import React from "react";
import {StyleSheet, useWindowDimensions} from "react-native";
import {Button, ButtonProps} from "react-native-elements";
import {ThemeColors, LOGO_SIZE, Spacing} from "../../layout";

interface ConvertButtonProps extends ButtonProps {}

const ConvertButton: React.FC<ConvertButtonProps> = ({...props}) => {
  const {width} = useWindowDimensions();
  return (
    <Button
      titleProps={{maxFontSizeMultiplier: 2}}
      buttonStyle={[styles.button, {width: width - Spacing.double * 2}]}
      title={"Convert"}
      {...props}
    />
  );
};

export default ConvertButton;

const styles = StyleSheet.create({
  button: {
    //backgroundColor: ThemeColors.brightGreen,
    width: 200,
    alignSelf: "center",
    margin: Spacing.standard,
    marginHorizontal: 40,
    marginTop: 0,
  },
});
