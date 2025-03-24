import React from "react";

//icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

//utils
import { colors } from "../utils";

const CheckBox = ({ checked, onPress }) => {
  return (
    <MaterialCommunityIcons
      name={checked ? "check-circle" : "circle-outline"}
      size={24}
      color={colors.gray.light}
      onPress={onPress}
    />
  );
};

export default CheckBox;
