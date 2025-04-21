import React from "react";
import { useFormikContext } from "formik";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Keyboard } from "react-native";

const SubmitButton = ({
  component: ButtonComponent = PrimaryButton,
  title,
  ...rest
}) => {
  const { handleSubmit } = useFormikContext();
  const handlePress = () => {
    Keyboard.dismiss();
    handleSubmit();
  };
  return <ButtonComponent title={title} onPress={handlePress} {...rest} />;
};

export default SubmitButton;
