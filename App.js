import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar as NativeStatusBar,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

// hooks
import { AuthContext, AuthProvider } from "./app/hooks/AuthContext";
import {
  FlashMessageContext,
  FlashMessageProvider,
} from "./app/hooks/FlashMessageContext";

// components
import FlashMessage from "./app/components/FlashMessage";

// navigations
import AppTabNavigator from "./app/navigations/AppNavigator";
import AuthStackNavigator from "./app/navigations/AuthNavigator";
import NavigationTheme from "./app/navigations/NavigationTheme";
// utils
import { colors, spacing } from "./app/utils";
import { loadFonts } from "./app/utils/font";

export default function App() {
  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }

  return (
    <FlashMessageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </FlashMessageProvider>
  );
}

function AppContent() {
  const { message, setMessage } = useContext(FlashMessageContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <NavigationContainer theme={NavigationTheme}>
            {user ? <AppTabNavigator /> : <AuthStackNavigator />}
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
      {message && (
        <FlashMessage
          message={message.message}
          onClose={() => setMessage(null)}
          type={message.type}
        />
      )}
    </>
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
