import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import moment from "moment";

// components
import AppText from "../components/AppText";
import AppForm from "../components/form/AppForm";
import TextField from "../components/form/TextField";
import DateTimePicker from "../components/DateTimePicker";
import ItemPicker from "../components/form/ItemPicker";

// utils
import {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
  spacing,
  CATEGORIES,
  DATE_TIME_MODES,
  FLAGS,
  ICONS,
  FLAG_ICONS,
} from "../utils";
import TaskBadge from "../components/task/TaskBadge";

// Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(2).label("Title"),
  description: Yup.string().required().min(10).label("Description"),
  due_date: Yup.date().required().label("Due Date"),
  category: Yup.object().required().label("Category"),
  flag: Yup.object().required().label("Flag"),
});

const NewTask = ({ route, navigation }) => {
  const formRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showFlagPicker, setShowFlagPicker] = useState(false);

  useEffect(() => {
    setVisible(route.params?.openModal || false);
  }, [route.params]);

  console.log(visible);
  const handleSubmit = (values) => {
    // Handle the form submission here
    console.log(values);
    setVisible(false);
    navigation.goBack();
  };

  const handleClose = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleDateChange = (date) => {
    formRef.current.setFieldValue("due_date", date);
    setShowDatePicker(false);
  };

  const handleCategoryChange = (category) => {
    console.log("Category selected:", category);
    formRef.current.setFieldValue("category", category);
    // setShowCategoryPicker(false);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      transparent
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
        keyboardVerticalOffset={0}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.header}>
              <AppText style={styles.title}>Add Task</AppText>
              <TouchableOpacity onPress={handleClose}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color={colors.white}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <AppForm
              innerRef={formRef}
              initialValues={{
                title: "",
                description: "",
                due_date: "",
                category: {
                  name: "",
                  backgroundColor: "",
                  icon: "",
                },
                flag: {
                  name: "",
                  backgroundColor: "",
                  icon: "",
                },
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.form}>
                <TextField name="title" placeholder="Task Name" />
                <TextField name="description" placeholder="Description" />
                <View style={styles.tagsContainer}>
                  {formRef.current?.values?.due_date && (
                    // <TaskBadge item={formRef.current?.values?.due_date} />
                    <AppText style={styles.dateText}>
                      {moment(formRef.current?.values?.due_date).format(
                        "MMM DD, YYYY"
                      )}
                    </AppText>
                  )}
                  {formRef.current?.values?.category?.name && (
                    <TaskBadge item={formRef.current?.values?.category} />
                  )}
                  {formRef.current?.values?.flag?.name && (
                    <TaskBadge item={formRef.current?.values?.flag} />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.leftButtons}>
                    <TouchableWithoutFeedback
                      onPress={() => setShowDatePicker(true)}
                    >
                      <MaterialCommunityIcons
                        name="timer-outline"
                        size={24}
                        color={colors.white}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                      onPress={() => setShowCategoryPicker(true)}
                    >
                      <MaterialCommunityIcons
                        name="tag-outline"
                        size={24}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowFlagPicker(true)}>
                      <MaterialCommunityIcons
                        name="flag-variant-outline"
                        size={24}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightButton}>
                    <TouchableOpacity onPress={() => {}}>
                      <MaterialCommunityIcons
                        name="send-outline"
                        size={24}
                        color={colors.purple.medium}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  visible={showDatePicker}
                  setVisible={setShowDatePicker}
                  initialDate={new Date()}
                  onDateChange={handleDateChange}
                  initialMode={DATE_TIME_MODES.DATETIME}
                />
              )}
              {showCategoryPicker && (
                <ItemPicker
                  items={CATEGORIES}
                  name="category"
                  visible={showCategoryPicker}
                  icons={ICONS}
                  onClose={() => setShowCategoryPicker(false)}
                />
              )}
              {showFlagPicker && (
                <ItemPicker
                  items={FLAGS}
                  name="flag"
                  visible={showFlagPicker}
                  icons={FLAG_ICONS}
                  onClose={() => setShowFlagPicker(false)}
                />
              )}
            </AppForm>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.gray.tabBar,
    borderTopLeftRadius: borderRadius.large,
    borderTopRightRadius: borderRadius.large,
    paddingBottom: spacing.xxxxxLarge,
    padding: spacing.medium,
    marginTop: "auto", // pushes content to bottom
    maxHeight: "50%", // changed from height to maxHeight
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: "bold",
    color: colors.white,
  },
  form: {
    gap: spacing.medium,
  },
  closeIcon: {
    marginLeft: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.medium,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftButtons: {
    flexDirection: "row",
    gap: spacing.medium,
  },
  dateContainer: {
    flex: 1,
    padding: spacing.small,
    backgroundColor: colors.gray.tabBar,
    borderRadius: borderRadius.small,
    borderWidth: borderWidth.small,
    borderColor: colors.gray.inputBorder,
    minHeight: 48,
    justifyContent: "center",
  },
  dateText: {
    fontSize: fontSize.small,
    color: colors.white,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.small,
  },
});
