import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext } from "react";

//Navigation
import { useNavigation } from "@react-navigation/native";

// 3rd party
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

// components
import AppText from "../../components/AppText";
import AppForm from "../../components/form/AppForm";
import TextField from "../../components/form/TextField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";

// utils
import {
  colors,
  fontFamily,
  fontSize,
  SCREEN_NAMES,
  spacing,
} from "../../utils";

// api
import { registerUser } from "../../api/auth";

// hooks
import { FlashMessageContext } from "../../hooks/FlashMessageContext";
import SubmitButton from "../../components/form/SubmitButton";

const RegisterScreen = () => {
  const { setMessage } = useContext(FlashMessageContext);
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username must contain only letters, numbers, and underscores"
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = async (values) => {
    try {
      console.log("Register values:", values);
      const response = await registerUser(values);
      console.log("Register response:", response);
      navigation.navigate(SCREEN_NAMES.VERIFY_OTP, {
        email: response.data.email,
      });
    } catch (error) {
      if (error.error)
        return setMessage({ message: error.error, type: "error" });
      console.log("Register response:", error);
      // setUser(response.data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <View style={styles.formFieldsContainer}>
              <TextField
                name="username"
                placeholder="john_doe"
                label="Username"
                autoCapitalize="none"
              />
              <TextField
                name="email"
                placeholder="john.doe@example.com"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.passwordContainer}>
                <View style={styles.passwordInput}>
                  <TextField
                    name="password"
                    placeholder="********"
                    label="Password"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.passwordInput}>
                  <TextField
                    name="confirmPassword"
                    placeholder="********"
                    label="Confirm Password"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
            <SubmitButton
              component={PrimaryButton}
              title="Register"
              style={styles.button}
            />
          </AppForm>

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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    gap: spacing.medium,
    marginBottom: spacing.xxLarge,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
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
    marginVertical: spacing.large,
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
  passwordContainer: {
    gap: spacing.small,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordInput: {
    flex: 1,
  },
});
