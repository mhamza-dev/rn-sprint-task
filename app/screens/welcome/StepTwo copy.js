// react
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// utils
import { colors, fontFamily, fontSize, spacing } from "../../utils";

// components
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import TertiaryButton from "../../components/Buttons/TertiaryButton";
import AppText from "../../components/AppText";

const StepTwo = ({ handleNext, handleBack, handleSkip }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSkip}>
        <AppText style={styles.skipText}>Skip</AppText>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../../assets/Welcome2.png")}
          style={styles.welcomeSvg}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Create daily routine</AppText>
        </View>
        <AppText style={styles.description}>
          In TaskSprint you can create your personalized routine to stay
          productive
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <TertiaryButton
          title="BACK"
          onPress={handleBack}
          style={styles.button}
        />
        <PrimaryButton
          title="NEXT"
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: spacing.large,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
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
    paddingHorizontal: spacing.large,
  },
  titleContainer: {
    marginTop: spacing.small,
  },
  title: {
    fontSize: fontSize.xLarge,
    fontFamily: fontFamily.bold,
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
