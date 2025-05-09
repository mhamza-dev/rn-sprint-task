import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

export function loadFonts() {
  return useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
}

export const fontFamily = {
  regular: "Poppins_400Regular",
  italic: "Poppins_400Regular_Italic",
  bold: "Poppins_700Bold",
  boldItalic: "Poppins_700Bold_Italic",
  medium: "Poppins_500Medium",
  mediumItalic: "Poppins_500Medium_Italic",
  semiBold: "Poppins_600SemiBold",
  semiBoldItalic: "Poppins_600SemiBold_Italic",
  light: "Poppins_300Light",
  lightItalic: "Poppins_300Light_Italic",
  extraBold: "Poppins_800ExtraBold",
  extraBoldItalic: "Poppins_800ExtraBold_Italic",
  black: "Poppins_900Black",
  blackItalic: "Poppins_900Black_Italic",
  thin: "Poppins_100Thin",
  thinItalic: "Poppins_100Thin_Italic",
  extraLight: "Poppins_200ExtraLight",
  extraLightItalic: "Poppins_200ExtraLight_Italic",
};

export const fontSize = {
  xxxSmall: 8,
  xxSmall: 10,
  xSmall: 12,
  small: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 40,
  xxxxLarge: 48,
};
