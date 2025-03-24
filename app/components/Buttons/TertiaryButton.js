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

const TertiaryButton = ({
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
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        {LeftIcon && <View style={styles.iconContainer}>{LeftIcon}</View>}
        <AppText style={[styles.title, titleStyle]}>{title}</AppText>
        {RightIcon && <View style={styles.iconContainer}>{RightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default TertiaryButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginHorizontal: spacing.small,
  },
  disabled: {
    borderColor: colors.purple.light,
    opacity: 0.7,
  },
});
