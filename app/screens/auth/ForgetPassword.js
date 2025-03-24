import { StyleSheet, View } from "react-native";
import React from "react";

//Navigation
import { useNavigation } from "@react-navigation/native";

// 3rd party
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

// components
import AppText from "../../components/AppText";

// utils
import { colors, fontFamily, fontSize, spacing } from "../../utils";
import AppForm from "../../components/form/AppForm";
import TextField from "../../components/form/TextField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          color={colors.white}
          onPress={() => navigation.pop(1)}
        />
        <AppText style={styles.title}>Forgot Password</AppText>
      </View>

      <AppForm
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <View style={styles.formFieldsContainer}>
          <TextField
            name="email"
            placeholder="john.doe@example.com"
            label="Email"
            keyboardType="email-address"
          />
        </View>
        <PrimaryButton
          title="Send Reset Link"
          onPress={() => {}}
          style={styles.button}
        />
      </AppForm>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    gap: spacing.medium,
    marginBottom: spacing.xxLarge,
  },
  title: {
    fontSize: fontSize.xxLarge,
    fontFamily: fontFamily.medium,
  },
  formFieldsContainer: {
    gap: spacing.medium,
  },
  button: {
    marginTop: spacing.xxxLarge,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  forgotPasswordTitle: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray.light,
  },
  socialButtonsContainer: {
    gap: spacing.medium,
  },
  socialButtonTitle: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
  },
  createAccountContainer: {
    marginTop: spacing.xxxLarge,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
  },
  createAccountLink: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    textDecorationLine: "underline",
  },
});
