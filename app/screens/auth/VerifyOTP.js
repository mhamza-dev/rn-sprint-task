import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useRef, useState } from "react";

//Navigation
import { useNavigation, useRoute } from "@react-navigation/native";

// 3rd party
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import AppText from "../../components/AppText";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

// utils
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  SCREEN_NAMES,
  spacing,
} from "../../utils";

// api
import { resendOTP, verifyOTP } from "../../api/auth";

// hooks
import { AuthContext } from "../../hooks/AuthContext";
import { FlashMessageContext } from "../../hooks/FlashMessageContext";
import TertiaryButton from "../../components/Buttons/TertiaryButton";

const VerifyOTP = () => {
  const { email } = useRoute().params || {};
  const { setUser } = useContext(AuthContext);
  const { setMessage } = useContext(FlashMessageContext);
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleSubmitOTP = async () => {
    const actualOtp = otp.join("");
    if (actualOtp.length !== 6) {
      return setMessage({ message: "OTP must be 6 digits", type: "error" });
    }
    try {
      const response = await verifyOTP({ email, otpCode: actualOtp });
      console.log("VerifyOTP response:", response);
      if (!response.success)
        return setMessage({ message: response.error, type: "error" });
      setUser(response.data);
      setMessage({ message: "OTP verified successfully", type: "success" });
    } catch (error) {
      console.log("VerifyOTP error:", error);
      return setMessage({ message: error.message, type: "error" });
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await resendOTP({ email });
      console.log("Resend OTP response:", response);
      setMessage({ message: "OTP resent, check your email", type: "success" });
    } catch (error) {
      console.log("Resend OTP error:", error);
      return setMessage({ message: error.message, type: "error" });
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move forward if value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move backward if value is deleted
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color={colors.white}
            onPress={() => navigation.navigate(SCREEN_NAMES.AUTH)}
          />
          <AppText style={styles.title}>OTP Verification</AppText>
        </View>

        <View style={styles.contentContainer}>
          <Image
            source={require("../../../assets/otp.png")}
            style={styles.image}
          />
          <View style={styles.descriptionContainer}>
            <AppText style={styles.description}>
              Please enter the OTP sent to your email
            </AppText>
            <View style={styles.fieldsContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  key={index}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="numeric"
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === "Backspace" &&
                      !digit &&
                      index > 0
                    ) {
                      inputRefs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>
          </View>

          <TertiaryButton title="Resend OTP" onPress={handleResendOTP} />

          <PrimaryButton
            title="Verify OTP"
            style={styles.button}
            onPress={handleSubmitOTP}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    padding: spacing.large,
  },
  headerContainer: {
    gap: spacing.medium,
    marginBottom: spacing.xxLarge,
  },
  title: {
    fontSize: fontSize.xxLarge,
    fontFamily: fontFamily.medium,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: spacing.medium,
  },
  descriptionContainer: {
    width: "100%",
    alignItems: "center",
  },
  description: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    textAlign: "center",
    marginBottom: spacing.large,
  },
  fieldsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xxLarge,
  },
  button: {
    width: "100%",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray.light,
    borderRadius: borderRadius.small,
    textAlign: "center",
    fontSize: fontSize.xLarge,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  image: {
    width: 200,
    height: 200,
  },
  resendText: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
});
