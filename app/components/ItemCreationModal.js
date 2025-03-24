import React, { useRef, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";

// 3rd Party
import * as Yup from "yup";

// Components
import AppText from "./AppText";
import AppForm from "./form/AppForm";
import TextField from "./form/TextField";
import PrimaryButton from "./Buttons/PrimaryButton";
import TertiaryButton from "./Buttons/TertiaryButton";

// Utils
import { borderRadius, colors, fontFamily, fontSize, spacing } from "../utils";
import IconPicker from "./form/IconPicker";
import ColorPicker from "./form/ColorPicker";

const ItemCreationModal = ({
  visible,
  onClose,
  setFieldValue,
  name,
  label,
  icons,
}) => {
  const formRef = useRef(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    icon: Yup.string().required().label("Icon"),
    backgroundColor: Yup.string().required().label("Color"),
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AppText style={styles.modalTitle}>Create New {label}</AppText>
          <AppForm
            innerRef={formRef}
            initialValues={{ name: "", icon: "", backgroundColor: "" }}
            onSubmit={() => {}}
            validationSchema={validationSchema}
          >
            <View style={styles.form}>
              <View style={styles.formContainer}>
                <TextField
                  name="name"
                  placeholder={`${label} Name`}
                  label={`${label} Name`}
                />

                <IconPicker name="icon" label={`${label} Icon`} icons={icons} />

                <ColorPicker name="backgroundColor" label={`${label} Color`} />
              </View>
              <View style={styles.buttonContainer}>
                <TertiaryButton
                  title="Cancel"
                  onPress={onClose}
                  style={styles.button}
                />
                <PrimaryButton
                  title={`Create ${name}`}
                  onPress={() => {
                    setFieldValue(name, formRef.current?.values);
                    onClose();
                  }}
                  style={styles.button}
                />
              </View>
            </View>
          </AppForm>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ItemCreationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.gray.background,
    padding: spacing.large,
    borderRadius: borderRadius.large,
    width: "100%",
    height: "100%",
  },
  modalTitle: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.medium,
    marginBottom: spacing.large,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  form: {
    justifyContent: "space-between",
    flex: 1,
  },
  formContainer: {
    gap: spacing.large,
  },
  button: {
    flex: 1,
  },
});
