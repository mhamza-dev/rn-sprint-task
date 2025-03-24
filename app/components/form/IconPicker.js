import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

// 3rd Party
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import AppText from "../AppText";

// Utils
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  spacing,
} from "../../utils";
import ErrorMessage from "./ErrorMessage";

const IconPicker = ({ name, label, icons }) => {
  const { setFieldValue, values, errors } = useFormikContext();
  const [showIconModal, setShowIconModal] = useState(false);
  return (
    <View>
      <View style={styles.iconInputContainer}>
        {label && <AppText style={styles.iconTitle}>{label}</AppText>}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowIconModal(true)}
        >
          <AppText style={styles.iconText}>Choose from library</AppText>
        </TouchableOpacity>
        {values[name] && (
          <MaterialCommunityIcons
            name={values[name]}
            size={32}
            color={colors.white}
            style={styles.icon}
          />
        )}
        <ErrorMessage error={errors[name]} />
      </View>

      <Modal visible={showIconModal} transparent animationType="fade">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AppText style={styles.modalTitle}>Choose Icon</AppText>
            <MaterialCommunityIcons
              name="close-circle"
              color={colors.white}
              size={30}
              onPress={() => setShowIconModal(false)}
              style={styles.closeButton}
            />
            <ScrollView
              contentContainerStyle={styles.iconsContainer}
              showsVerticalScrollIndicator={false}
            >
              {icons.map((iconName, index) => (
                <TouchableOpacity
                  key={iconName}
                  style={[
                    styles.iconOption,
                    // Remove bottom margin for last row items
                    index >= icons.length - 3 && styles.lastRowIcon,
                  ]}
                  onPress={() => {
                    setFieldValue(name, iconName);
                    setShowIconModal(false);
                  }}
                >
                  <MaterialCommunityIcons
                    name={iconName}
                    size={32}
                    color={colors.white}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default IconPicker;

const styles = StyleSheet.create({
  iconInputContainer: {
    gap: spacing.small,
  },
  iconContainer: {
    backgroundColor: colors.gray.tabBar,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.medium,
    borderRadius: borderRadius.small,
    width: "50%",
  },
  icon: {
    marginVertical: spacing.small,
  },
  iconText: {
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.gray.tabBar,
    padding: spacing.large,
    borderRadius: borderRadius.large,
    width: "90%",
    height: "70%",
    position: "relative",
  },
  modalTitle: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.medium,
    marginBottom: spacing.large,
    color: colors.white,
    textAlign: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
    gap: spacing.medium,
  },
  iconOption: {
    width: "30%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.medium,
    backgroundColor: colors.gray.inputBorder,
  },
  lastRowIcon: {
    marginBottom: 0,
  },
  closeButton: {
    position: "absolute",
    top: spacing.medium,
    right: spacing.medium,
  },
  errorText: {
    color: colors.red,
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    marginTop: spacing.small,
  },
});
