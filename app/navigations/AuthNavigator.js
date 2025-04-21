// react
import React from "react";

// navigations
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import AuthScreen from "../screens/auth";
import ForgetPassword from "../screens/auth/ForgetPassword";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import StepOne from "../screens/welcome/StepOne";
import StepThree from "../screens/welcome/StepThree";
import StepTwo from "../screens/welcome/StepTwo";
import VerifyOTP from "../screens/auth/VerifyOTP";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Welcome" component={StepOne} />
    <AuthStack.Screen name="StepTwo" component={StepTwo} />
    <AuthStack.Screen name="StepThree" component={StepThree} />
    <AuthStack.Screen name="Auth" component={AuthScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="VerifyOTP" component={VerifyOTP} />
    <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
