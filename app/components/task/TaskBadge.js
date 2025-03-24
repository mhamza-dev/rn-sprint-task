import { StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import AppText from "../AppText";

// utils
import { borderRadius, colors, fontSize, spacing } from "../../utils";

const TaskBadge = ({ item }) => {
  return (
    <View style={[styles.container, { backgroundColor: item.backgroundColor }]}>
      <MaterialCommunityIcons
        name={item.icon}
        size={fontSize.medium}
        color={colors.gray.light}
      />
      <AppText style={styles.text}>{item.name}</AppText>
    </View>
  );
};

export default TaskBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.small,
    padding: spacing.small,
    borderRadius: borderRadius.small,
    width: 100,
  },
  text: {
    color: colors.gray.light,
    fontSize: fontSize.small,
  },
});
