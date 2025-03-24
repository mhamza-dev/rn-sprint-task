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
import {
  colors,
  fontFamily,
  fontSize,
  SCREEN_NAMES,
  spacing,
} from "../../utils";
import AppForm from "../../components/form/AppForm";
import TextField from "../../components/form/TextField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          color={colors.white}
          onPress={() => navigation.navigate(SCREEN_NAMES.AUTH)}
        />
        <AppText style={styles.title}>Register</AppText>
      </View>

      <AppForm
        initialValues={{ email: "", password: "", confirmPassword: "" }}
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
          <TextField
            name="password"
            placeholder="********"
            label="Password"
            secureTextEntry
          />
          <TextField
            name="confirmPassword"
            placeholder="********"
            label="Confirm Password"
            secureTextEntry
          />
        </View>
        <PrimaryButton
          title="Register"
          onPress={() => {}}
          style={styles.button}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <AppText style={styles.dividerText}>Or</AppText>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialButtonsContainer}>
          <SecondaryButton
            title="Register with Google"
            onPress={() => {}}
            titleStyle={styles.socialButtonTitle}
            LeftIcon={
              <MaterialCommunityIcons
                name="google"
                size={24}
                color={colors.white}
              />
            }
          />
          <SecondaryButton
            title="Register with Apple"
            onPress={() => {}}
            titleStyle={styles.socialButtonTitle}
            LeftIcon={
              <MaterialCommunityIcons
                name="apple"
                size={24}
                color={colors.white}
              />
            }
          />
        </View>
        <View style={styles.createAccountContainer}>
          <AppText style={styles.createAccountText}>
            Already have an account?{" "}
            <AppText
              style={styles.createAccountLink}
              onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
            >
              Login
            </AppText>
          </AppText>
        </View>
      </AppForm>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
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
