import React, {useState, useRef, useEffect} from "react";
import {StyleSheet, View, SafeAreaView, ScrollView} from "react-native";
import {ThemeColors, LOGO_SIZE, Spacing} from "../../layout";
import UnitPicker, {INPUT_TYPE} from "../components/UnitPicker";
import UnitInput from "../components/UnitInput";
import LottieView from "lottie-react-native";
import {unitType, units} from "../../conversions";

const Converter = () => {
  const defaultInput = {
    id: -1,
    label: "",
    symbol: "",
    conversions: [{id: -1, rate: -1}],
  };
  const [input, setInput] = useState<unitType>(defaultInput);
  const [output, setOutput] = useState<unitType>(defaultInput);
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const animation = useRef<any>(null);

  const calculateResult = (
    inputUnit: unitType,
    outputUnit: unitType,
    amount: string
  ) => {
    let result = "";
    const rate = inputUnit.conversions.find(
      (conversion) => conversion.id === outputUnit?.id
    );
    if (rate && amount) {
      const res = parseInt(amount) * rate.rate;

      if (isNaN(res)) {
        setError("Please enter numbers only");
        return;
      }

      result = res.toFixed(2).toString();
    }

    if (result) {
      setResult(result);
      animation.current.play();
    }
  };

  useEffect(() => {
    if (!amount) {
      setError("");
    }
  }, [amount]);

  useEffect(() => {
    // Clears the result if user changes the unit selection
    if (input.id === output.id) {
      setOutput(defaultInput);
      setResult("");
    }
  }, [input, output]);

  const handleSelect = (unit: unitType, inputType: INPUT_TYPE) => {
    if (inputType === INPUT_TYPE.INPUT && unit.id !== input.id) {
      setInput(unit);
    }
    if (inputType === INPUT_TYPE.OUTPUT && unit.id !== output.id) {
      setOutput(unit);
    }
  };

  useEffect(() => {
    if (input.id !== -1 && output.id !== -1 && amount) {
      calculateResult(input, output, amount);
    }
  }, [input.id, output.id, amount]);

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
            unit={input}
            error={error}
            handleSubmit={(val: string) => setAmount(val)}
          />
          <UnitInput
            unit={output}
            editable={false}
            placeholder={"Result"}
            value={result}
          />
        </View>
        <View style={styles.unitPickerContainer}>
          <UnitPicker
            title={"From"}
            disabled={null}
            units={units}
            selected={input}
            inputType={INPUT_TYPE.INPUT}
            handleUnitSelect={handleSelect}
          />
          <UnitPicker
            title={"To"}
            disabled={input}
            units={units}
            selected={output}
            inputType={INPUT_TYPE.OUTPUT}
            handleUnitSelect={handleSelect}
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
