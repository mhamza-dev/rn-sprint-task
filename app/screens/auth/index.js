import { StyleSheet, View } from "react-native";
import React from "react";

//Navigation
import { useNavigation } from "@react-navigation/native";

// 3rd party
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import AppText from "../../components/AppText";

// utils
import {
  colors,
  fontFamily,
  fontSize,
  SCREEN_NAMES,
  spacing,
} from "../../utils";

const AuthScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={40}
        color={colors.white}
        onPress={() => navigation.popToTop()}
      />

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Welcome to TaskSprint</AppText>
          <AppText style={styles.description}>
            Please login to your account or create new account to continue
          </AppText>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Login"
            onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
          />
          <SecondaryButton
            title="Create Account"
            onPress={() => navigation.navigate(SCREEN_NAMES.REGISTER)}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: spacing.xxxLarge,
  },
  titleContainer: {
    alignItems: "center",
    gap: spacing.small,
  },
  title: {
    fontSize: fontSize.xLarge,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  description: {
    fontSize: fontSize.small,
    color: colors.dimWhite,
    textAlign: "center",
  },
  buttonContainer: {
    gap: spacing.large,
  },
});
