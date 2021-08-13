import {StatusBar} from "expo-status-bar";
import React from "react";
import Converter from "./src/screens/Converter";

export default function App() {
  return (
    <>
      <Converter />
      <StatusBar style="light" />
    </>
  );
}
