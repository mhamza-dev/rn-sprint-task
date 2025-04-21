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
import TertiaryButton from "../../components/Buttons/TertiaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import SubmitButton from "../../components/form/SubmitButton";

// utils
import {
  colors,
  fontFamily,
  fontSize,
  SCREEN_NAMES,
  spacing,
} from "../../utils";

// api
import { loginUser } from "../../api/auth";

// hooks
import { AuthContext } from "../../hooks/AuthContext";
import { FlashMessageContext } from "../../hooks/FlashMessageContext";
import { jwtDecode } from "jwt-decode";

const LoginScreen = () => {
  const { setMessage } = useContext(FlashMessageContext);
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    console.log("Login submitted with:", values);
    const response = await loginUser(values);

    if (!response.success)
      return setMessage({ message: response.error, type: "error" });

    const user = jwtDecode(response.data);
    navigation.navigate(SCREEN_NAMES.VERIFY_OTP, {
      email: user.email,
    });
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
          <AppText style={styles.title}>Login</AppText>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <View style={styles.formFieldsContainer}>
              <TextField
                name="email"
                placeholder="john.doe@example.com"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextField
                name="password"
                placeholder="********"
                label="Password"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TertiaryButton
                title="Forgot Password?"
                onPress={() =>
                  navigation.navigate(SCREEN_NAMES.FORGET_PASSWORD)
                }
                titleStyle={styles.forgotPasswordTitle}
              />
            </View>
            <SubmitButton
              component={PrimaryButton}
              title="Login"
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
              title="Login with Google"
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
              title="Login with Apple"
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
              Don't have an account?{" "}
              <AppText
                style={styles.createAccountLink}
                onPress={() => navigation.navigate(SCREEN_NAMES.REGISTER)}
              >
                Register
              </AppText>
            </AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
});
