import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// utils
import { borderWidth, colors } from "../../utils";

const NewTaskButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="plus" color={colors.white} size={35} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purple.light,
    borderWidth: borderWidth.xxxxLarge,
    borderColor: colors.gray.tabBar,
    height: 80,
    width: 80,
    borderRadius: 40,
    bottom: 30,
  },
});

export default NewTaskButton;
