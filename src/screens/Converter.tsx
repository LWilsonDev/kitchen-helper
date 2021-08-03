import React, {useState, useRef, useEffect} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from "react-native";
import {ThemeColors, LOGO_SIZE, Spacing} from "../../layout";
import ConvertButton from "../components/ConvertButton";
import UnitPicker from "../components/UnitPicker";
import UnitInput from "../components/UnitInput";
import LottieView from "lottie-react-native";
import {unitType, units} from "../../conversions";

const Converter = () => {
  const [result, setResult] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [amountUnit, setAmountUnit] = useState<unitType | null>(null);
  const [resultUnit, setResultUnit] = useState<unitType | null>(null);

  const animation = useRef<any>(null);

  const calculateResult = (from: unitType, to: unitType, amount: number) => {
    const rate = from.conversions.find((conversion) => conversion.id === to.id);
    if (rate) {
      const res = amount * rate.rate;
      setResult(res.toFixed(2).toString());
    }
  };

  const handleSubmit = (
    inputUnit: unitType | null,
    outputUnit: unitType | null,
    total: string
  ) => {
    if (inputUnit && outputUnit && total) {
      calculateResult(inputUnit, outputUnit, parseInt(total));
    }

    // play animation anyway...
    animation.current.play();
    Keyboard.dismiss();
  };

  const handleUnitSelect = (unit: unitType) => {
    if (unit.id !== amountUnit?.id) {
      setAmountUnit(unit);
    }
  };

  useEffect(() => {
    // Clears the result if user changes the unit selection
    if (amountUnit?.id === resultUnit?.id) {
      setResultUnit(null);
      setResult("");
    }
  }, [amountUnit?.id, resultUnit?.id, amount]);

  const handleResultUnitSelect = (unit: unitType) => {
    if (amountUnit?.id !== unit.id) {
      setResultUnit(unit);
      if (amount && amountUnit && resultUnit) {
        handleSubmit(amountUnit, resultUnit, amount);
      } else {
        setResult("");
      }
    } else {
      setResultUnit(null);
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // This handles the issue of dismissing numeric keyboards, requires flexGrow
      >
        <View style={styles.lottieContainer}>
          <LottieView
            ref={animation}
            source={require("../../assets/scaleAnimation.json")}
            autoPlay={false}
            loop={false}
          />
        </View>
        <View style={styles.row}>
          <UnitInput
            placeholder={"Amount"}
            unit={amountUnit}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            onSubmitEditing={() => handleSubmit(amountUnit, resultUnit, amount)}
          />
          <UnitInput
            unit={resultUnit}
            editable={false}
            placeholder={"Result"}
            value={result}
          />
        </View>
        <ConvertButton
          onPress={() => handleSubmit(amountUnit, resultUnit, amount)}
        />
        <View style={styles.unitPickerContainer}>
          <UnitPicker
            title={"From"}
            disabled={null}
            units={units}
            selected={amountUnit}
            handleUnitSelect={handleUnitSelect}
          />
          <UnitPicker
            title={"To"}
            disabled={amountUnit}
            units={units}
            selected={resultUnit}
            handleUnitSelect={handleResultUnitSelect}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Converter;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: ThemeColors.darkGrey,
  },
  row: {
    flexDirection: "row",
  },
  container: {
    padding: Spacing.standard,
    flexGrow: 1, // Required for scrollView for dismissing keyboard
  },
  logo: {
    marginTop: Spacing.double * 2,
    alignSelf: "center",
  },
  unitPickerContainer: {
    flexDirection: "row",
    flex: 1,
  },
  lottieContainer: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
    alignSelf: "center",
    marginTop: Spacing.double,
    marginBottom: Spacing.standard,
  },
});
