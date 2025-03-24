/* 
  This is a color picker that allows the user to pick a color for a task.
  It is used in the NewTask screen.
  Example usage:
  <ColorPicker name="color" label="Color:" />
*/
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

// 3rd party
import { useFormikContext } from "formik";

//components
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";

//utils
import {
  borderRadius,
  borderWidth,
  colors,
  COLORS,
  spacing,
} from "../../utils";

const ColorPicker = ({ name, label }) => {
  const { setFieldValue, values, errors } = useFormikContext();
  return (
    <View style={styles.colorInputContainer}>
      {label && <AppText style={styles.colorTitle}>{label}</AppText>}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={COLORS}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.colorWrapper,
              values[name] === item && styles.selectedColorWrapper,
            ]}
          >
            <TouchableOpacity
              style={[styles.colorContainer, { backgroundColor: item }]}
              onPress={() => setFieldValue(name, item)}
            />
          </View>
        )}
      />
      <ErrorMessage error={errors[name]} />
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  colorInputContainer: {
    gap: spacing.small,
  },
  colorWrapper: {
    padding: spacing.xxxSmall,
    marginHorizontal: spacing.xxxSmall,
    borderWidth: borderWidth.xLarge,
    borderColor: "transparent",
    borderRadius: borderRadius.xxxLarge,
  },
  selectedColorWrapper: {
    borderColor: colors.purple.dark,
  },
  colorContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xxLarge,
  },
  colorTitle: {
    marginBottom: spacing.small,
  },
  errorText: {
    color: colors.red,
    marginTop: spacing.xSmall,
  },
});
