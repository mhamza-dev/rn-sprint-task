import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 3rd party
import { useFormikContext } from "formik";
import AppText from "../AppText";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  spacing,
} from "../../utils";
import ErrorMessage from "./ErrorMessage";

const TextField = ({ name, label, leftIcon, rightIcon, ...otherProps }) => {
  const ref = useRef(null);
  const { handleChange, handleBlur, values, errors, touched, setFieldTouched } =
    useFormikContext();
  return (
    <>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={styles.inputContainer}>
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={24}
            color={colors.gray.placeholder}
            style={styles.leftIcon}
            onPress={() => {
              ref.current.focus();
            }}
          />
        )}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              borderColor: touched[name]
                ? colors.purple.medium
                : colors.gray.inputBorder,
            },
            {
              paddingLeft: leftIcon ? spacing.xxxxLarge : spacing.medium,
              paddingRight: rightIcon ? spacing.xxxxLarge : spacing.medium,
            },
          ]}
          onChangeText={handleChange(name)}
          onBlur={() => {
            handleBlur(name);
            setFieldTouched(name, false);
          }}
          onFocus={() => {
            setFieldTouched(name, true);
          }}
          placeholderTextColor={colors.gray.placeholder}
          value={values[name]}
          {...otherProps}
        />
        {rightIcon && (
          <MaterialCommunityIcons
            name={rightIcon}
            size={24}
            color={colors.gray.placeholder}
            style={styles.rightIcon}
            onPress={() => {
              ref.current.focus();
            }}
          />
        )}
      </View>
      <ErrorMessage error={errors[name]} />
    </>
  );
};

export default TextField;

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray.inputBorder,
    borderRadius: borderRadius.small,
    padding: spacing.medium,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
    color: colors.gray.light,
    flex: 1,
  },
  leftIcon: {
    position: "absolute",
    left: spacing.medium,
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: spacing.medium,
    zIndex: 1,
  },
  error: {
    color: colors.error,
    fontSize: fontSize.small,
    marginLeft: spacing.small,
    fontFamily: fontFamily.italic,
  },
  label: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
  },
});
