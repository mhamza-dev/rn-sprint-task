import ApiClient from "./client";

const URL = "/auth";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await ApiClient.post(`${URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
    if (!error.response) {
      // Network error or server not responding
      return {
        error:
          "Unable to connect to the server. Please check your internet connection.",
        status: 500,
        success: false,
      };
    }
    if (error.response.status === 401) {
      return {
        error: error.response.data.message,
        status: 401,
        success: error.response.data.success,
      };
    }
    return {
      error: "An error occurred during login. Please try again later.",
      status: 500,
      success: false,
    };
  }
};

export const registerUser = async ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  try {
    const response = await ApiClient.post(`${URL}/register`, {
      email,
      username,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.log("Register error:", error);
    if (!error.response) {
      // Network error or server not responding
      throw new Error(
        "Unable to connect to the server. Please check your internet connection."
      );
    }
    if (error.response.status === 409) {
      throw new Error("This email is already registered");
    }
    throw new Error(
      "An error occurred during registration. Please try again later."
    );
  }
};

export const verifyOTP = async ({ email, otpCode }) => {
  try {
    const response = await ApiClient.post(`${URL}/verify-otp`, {
      email,
      otpCode,
    });
    console.log("Verify OTP response:", response);
    return response.data;
  } catch (error) {
    console.log("Verify OTP error:", error);
    throw new Error("An error occurred during OTP verification.");
  }
};

export const resendOTP = async ({ email }) => {
  try {
    const response = await ApiClient.post(`${URL}/resend-otp`, { email });
    return response.data;
  } catch (error) {
    console.log("Resend OTP error:", error);
    throw new Error("An error occurred during OTP resend.");
  }
};
