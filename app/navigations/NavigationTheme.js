import { DefaultTheme } from "@react-navigation/native";
import { colors } from "../utils";

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.black,
  },
};

export default NavigationTheme;
