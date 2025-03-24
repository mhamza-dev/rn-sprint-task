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
import TertiaryButton from "../../components/Buttons/TertiaryButton";
import AppText from "../../components/AppText";

const StepThree = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAMES.AUTH)}>
        <AppText style={styles.skipText}>Skip</AppText>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../../assets/Welcome3.png")}
          style={styles.welcomeSvg}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Orgonaize your tasks</AppText>
        </View>
        <AppText style={styles.description}>
          You can organize your daily tasks by adding your tasks into separate
          categories
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <TertiaryButton
          title="BACK"
          onPress={() => navigation.navigate(SCREEN_NAMES.STEP_TWO)}
          style={styles.button}
        />
        <PrimaryButton
          title="GET STARTED"
          onPress={() => navigation.navigate(SCREEN_NAMES.AUTH)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
