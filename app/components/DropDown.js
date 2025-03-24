import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { borderRadius, colors, fontSize, spacing } from "../utils";
import AppText from "./AppText";

const DropDown = ({
  options,
  onSelect,
  placeholder,
  selectedOption = null,
  style = {},
  listStyle = {},
  optionStyle = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => setIsVisible(!isVisible)}
      >
        <AppText style={styles.text}>
          {selectedOption?.label || placeholder || "Select"}
        </AppText>
        <MaterialCommunityIcons
          name={isVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.white}
          style={styles.icon}
        />
      </TouchableOpacity>

      {isVisible && (
        <View style={[styles.optionsContainer, listStyle]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[styles.optionItem, optionStyle]}
              onPress={() => handleSelect(option)}
            >
              <AppText style={styles.optionText}>{option.label}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  container: {
    backgroundColor: colors.gray.tabBar,
    padding: spacing.medium,
    borderRadius: borderRadius.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: fontSize.small,
    flex: 1,
  },
  icon: {
    marginLeft: spacing.small,
  },
  optionsContainer: {
    position: "absolute",
    zIndex: 1000,
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: colors.gray.tabBar,
    borderRadius: borderRadius.small,
    marginTop: spacing.small,
    borderWidth: 1,
    borderColor: colors.gray.inputBorder,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.inputBorder,
  },
  optionText: {
    fontSize: fontSize.small,
  },
});
