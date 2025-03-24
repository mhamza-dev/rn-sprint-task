import React from "react";
import { StyleSheet, View } from "react-native";

// 3rd party
import moment from "moment";

// components
import AppText from "../AppText";
import CheckBox from "../CheckBox";

// utils
import { borderRadius, colors, spacing } from "../../utils";
import TaskBadge from "./TaskBadge";

const TaskCard = ({ task }) => {
  return (
    <View style={styles.container}>
      <CheckBox checked={task.is_completed} onPress={() => {}} />
      <View style={styles.taskContainer}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>{task.title}</AppText>
        </View>
        <View style={styles.subTitleContainer}>
          <View>
            <AppText>{moment(task.due_date).format("h:mm a")}</AppText>
          </View>
          <View style={styles.badgeContainer}>
            <TaskBadge item={task.category} />
            <TaskBadge item={task.flag} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.gray.tabBar,
    padding: spacing.medium,
    borderRadius: borderRadius.medium,
    gap: spacing.medium,
    alignItems: "center",
  },
  taskContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    marginBottom: spacing.small,
  },
  titleContainer: {
    flexDirection: "column",
  },
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.medium,
    width: "100%",
    justifyContent: "space-between",
  },
  badgeContainer: {
    flexDirection: "row",
    gap: spacing.small,
  },
});
