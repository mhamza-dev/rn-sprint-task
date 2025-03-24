import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  spacing,
} from "../../utils";
import AppText from "../AppText";

const PrimaryButton = ({
  title,
  onPress,
  style,
  titleStyle,
  disabled,
  RightIcon,
  LeftIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabled]}
    >
      <View style={styles.contentContainer}>
        {LeftIcon && <View style={styles.iconContainer}>{LeftIcon}</View>}
        <AppText style={[styles.title, titleStyle]}>{title}</AppText>
        {RightIcon && <View style={styles.iconContainer}>{RightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple.medium,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginHorizontal: spacing.small,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  disabled: {
    backgroundColor: colors.purple.light,
  },
});
