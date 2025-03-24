import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontFamily, fontSize } from "../utils";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.medium,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
});
