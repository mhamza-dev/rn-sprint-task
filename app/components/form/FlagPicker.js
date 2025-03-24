import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

// 3rd party
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

//components
import ErrorMessage from "./ErrorMessage";
import AppText from "../AppText";
import ItemCreationModal from "../ItemCreationModal";
import TertiaryButton from "../Buttons/TertiaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";

//utils
import {
  borderRadius,
  borderWidth,
  colors,
  fontFamily,
  fontSize,
  ICONS,
  spacing,
} from "../../utils";

const FlagPicker = ({ visible, onClose, name, flags }) => {
  const { setFieldValue, values, errors } = useFormikContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const selectedFlag = values?.[name];
  const isCustomFlag = selectedFlag?.name === "Custom";

  const handleFlagSelect = (flag) => {
    setFieldValue(name, flag);
  };

  const handleAddFlag = () => {
    if (selectedFlag) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AppText style={styles.modalTitle}>Choose Flag</AppText>
          <MaterialCommunityIcons
            name="close-circle"
            color={colors.white}
            size={30}
            onPress={onClose}
            style={styles.closeButton}
          />
          <ScrollView
            contentContainerStyle={styles.flagsContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[styles.flagItem, styles.createNewFlag]}
              onPress={() => setShowCreateModal(true)}
            >
              <MaterialCommunityIcons
                name="plus"
                color={colors.black}
                size={30}
              />
              <AppText style={styles.createNewFlagText}>Create New</AppText>
            </TouchableOpacity>

            {/* Show custom flag if it exists */}
            {isCustomFlag && (
              <TouchableOpacity
                style={[styles.flagItem, styles.selectedFlag]}
                onPress={() => handleFlagSelect(selectedFlag)}
              >
                <MaterialCommunityIcons
                  name={selectedFlag.icon}
                  color={colors.white}
                  size={24}
                  strokeWidth={2}
                />
                <AppText style={styles.flagName}>{selectedFlag.name}</AppText>
              </TouchableOpacity>
            )}

            {/* Show predefined categories */}
            {flags.map((flag) => (
              <TouchableOpacity
                key={flag.name}
                style={[
                  styles.flagItem,
                  selectedFlag?.name === flag.name && styles.selectedFlag,
                ]}
                onPress={() => handleFlagSelect(flag)}
              >
                <MaterialCommunityIcons
                  name={flag.icon}
                  color={colors.white}
                  size={24}
                  strokeWidth={2}
                />
                <AppText style={styles.flagName}>{flag.name}</AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <ErrorMessage error={errors.flag} />
            <View style={styles.buttonContainer}>
              <TertiaryButton
                title="Cancel"
                onPress={onClose}
                style={styles.button}
              />
              <PrimaryButton
                title="Select Flag"
                onPress={handleAddFlag}
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      {showCreateModal && (
        <ItemCreationModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          name={name}
          label="Flag"
          icons={ICONS}
          setFieldValue={setFieldValue}
        />
      )}
    </Modal>
  );
};

export default FlagPicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "relative",
    width: "90%",
    maxWidth: 350,
    maxHeight: 500,
    backgroundColor: colors.gray.tabBar,
    borderRadius: borderRadius.small,
    padding: spacing.large,
  },
  modalTitle: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.medium,
    paddingBottom: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.inputBorder,
  },
  flagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flagItem: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.medium,
    marginBottom: spacing.medium,
    padding: spacing.medium,
    borderWidth: borderWidth.large,
    borderColor: "transparent",
    margin: spacing.xSmall,
    backgroundColor: colors.gray.background,
  },
  selectedFlag: {
    backgroundColor: colors.purple.medium,
  },
  flagName: {
    marginTop: spacing.small,
    fontSize: fontSize.xSmall,
    textAlign: "center",
    color: colors.white,
  },
  createNewFlag: {
    backgroundColor: colors.gray.light,
  },
  createNewFlagText: {
    color: colors.black,
    fontSize: fontSize.xSmall,
    textAlign: "center",
  },
  addButton: {
    marginTop: spacing.medium,
  },
  closeButton: {
    position: "absolute",
    top: spacing.medium,
    right: spacing.medium,
  },
  footer: {
    marginTop: spacing.large,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
  },
});
