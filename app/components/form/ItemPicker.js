/* 
  This is a modal that allows the user to pick a item for a task.
  It is used in the NewTask screen.
  Example usage:
  <ItemModal
    items={[{name: "Work", icon: "briefcase", color: "#FFB5A7"}]}
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    onSelectItem={(item) => console.log("Selected:", item)}
    onAddItem={(item) => console.log("Added:", item)}
  />
*/
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

const ItemPicker = ({ visible, onClose, items, name, icons }) => {
  const { setFieldValue, values, errors } = useFormikContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Check if the selected item exists in the items list
  const selectedItem = values?.[name];
  const isCustomItem =
    selectedItem &&
    !items.find((item) => item.name === selectedItem.name) &&
    selectedItem.name !== "";

  const handleItemSelect = (item) => {
    if (selectedItem?.name === item.name) {
      setFieldValue(name, null);
    } else {
      setFieldValue(name, item);
    }
  };

  const handleAddItem = () => {
    if (selectedItem) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AppText style={styles.modalTitle}>
            Choose {name.charAt(0).toUpperCase() + name.slice(1)}
          </AppText>
          <MaterialCommunityIcons
            name="close-circle"
            color={colors.white}
            size={30}
            onPress={onClose}
            style={styles.closeButton}
          />
          <ScrollView
            contentContainerStyle={styles.itemsContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[styles.itemItem, styles.createNewItem]}
              onPress={() => setShowCreateModal(true)}
            >
              <MaterialCommunityIcons
                name="plus"
                color={colors.black}
                size={30}
              />
              <AppText style={styles.createNewItemText}>Create New</AppText>
            </TouchableOpacity>

            {/* Show custom item if it exists */}
            {isCustomItem && (
              <TouchableOpacity
                style={[
                  styles.itemItem,
                  { backgroundColor: selectedItem.backgroundColor },
                  styles.selectedItem,
                ]}
                onPress={() => handleItemSelect(selectedItem)}
              >
                <MaterialCommunityIcons
                  name={selectedItem.icon}
                  color={colors.white}
                  size={24}
                  strokeWidth={2}
                />
                <AppText style={styles.itemName}>{selectedItem.name}</AppText>
              </TouchableOpacity>
            )}

            {/* Show predefined items */}
            {items.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.itemItem,
                  { backgroundColor: item.backgroundColor },
                  selectedItem?.name === item.name && styles.selectedItem,
                ]}
                onPress={() => handleItemSelect(item)}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  color={colors.white}
                  size={24}
                  strokeWidth={2}
                />
                <AppText style={styles.itemName}>{item.name}</AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <ErrorMessage error={errors.item} />
            <PrimaryButton
              title={`Add ${name.charAt(0).toUpperCase() + name.slice(1)}`}
              onPress={handleAddItem}
              style={styles.addButton}
            />
          </View>
        </View>
      </SafeAreaView>

      {showCreateModal && (
        <ItemCreationModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          name={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          icons={icons}
          setFieldValue={setFieldValue}
        />
      )}
    </Modal>
  );
};

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
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemItem: {
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
  },
  selectedItem: {
    borderColor: colors.purple.medium,
  },
  itemName: {
    marginTop: spacing.small,
    fontSize: fontSize.xSmall,
    textAlign: "center",
    color: colors.white,
  },
  createNewItem: {
    backgroundColor: colors.gray.light,
  },
  createNewItemText: {
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
});

export default ItemPicker;
