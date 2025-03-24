import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar as NativeStatusBar,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

// navigations
import NavigationTheme from "./app/navigations/NavigationTheme";
import AppTabNavigator from "./app/navigations/AppNavigator";

// utils
import { colors, spacing } from "./app/utils";
import { loadFonts } from "./app/utils/font";

export default function App() {
  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <NavigationContainer theme={NavigationTheme}>
          {/* <AuthStackNavigator /> */}
          <AppTabNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: Platform.OS === "android" ? NativeStatusBar.currentHeight : 0,
    paddingBottom: spacing.large,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
  },
});
