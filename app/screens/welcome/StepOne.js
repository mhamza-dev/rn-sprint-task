// react
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

//Navigation
import { useNavigation } from "@react-navigation/native";

// utils
import {
  colors,
  fontFamily,
  fontSize,
  SCREEN_NAMES,
  spacing,
} from "../../utils";

// components
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import AppText from "../../components/AppText";

const StepOne = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAMES.AUTH)}>
        <AppText style={styles.skipText}>Skip</AppText>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../../assets/Welcome1.png")}
          style={styles.welcomeSvg}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Manage your tasks</AppText>
        </View>
        <AppText style={styles.description}>
          You can easily manage all of your daily tasks in TaskSprint for free
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="NEXT"
          onPress={() => navigation.navigate(SCREEN_NAMES.STEP_TWO)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.large,
  },
  description: {
    fontSize: fontSize.small,
    color: colors.white,
    textAlign: "center",
  },
  titleContainer: {
    marginTop: spacing.small,
  },
  title: {
    fontSize: fontSize.xLarge,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  welcomeSvg: {
    width: 250,
    height: 250,
  },
  skipText: {
    color: colors.dimWhite,
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
  },
});
