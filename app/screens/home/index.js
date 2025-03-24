import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

// 3rd party
import moment from "moment";

// components
import AppText from "../../components/AppText";
import TaskCard from "../../components/task/TaskCard";
import AppForm from "../../components/form/AppForm";
import TextField from "../../components/form/TextField";

// utils
import { fontFamily, spacing, TASKS } from "../../utils";
import DropDown from "../../components/DropDown";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState({ label: "Today", value: "today" });
  const [completedFilter, setCompletedFilter] = useState({
    label: "Completed",
    value: "completed",
  });
  useEffect(() => {
    setTimeout(() => {
      // Initial filtering
      handleDateFilter(filter);
      handleCompletedFilter(completedFilter);
    }, 1000);
    setIsLoading(false);
  }, []);

  const handleDateFilter = (filter) => {
    setFilter(filter);

    const uncompletedTasks = TASKS.filter((task) => !task.is_completed);
    if (filter.value === "today") {
      setTasks(
        uncompletedTasks.filter((task) =>
          moment(task.due_date).isSame(moment(), "day")
        )
      );
    } else if (filter.value === "all") {
      setTasks(uncompletedTasks);
    }
  };

  const handleCompletedFilter = (filter) => {
    setCompletedFilter(filter);

    if (filter.value === "completed") {
      setCompletedTasks(TASKS.filter((task) => task.is_completed));
    } else if (filter.value === "uncompleted") {
      setCompletedTasks(TASKS.filter((task) => !task.is_completed));
    }
  };

  if (isLoading) return <EmptyState />;
  return (
    <View style={styles.container}>
      <AppForm initialValues={{ search: "" }} onSubmit={() => {}}>
        <TextField name="search" leftIcon="magnify" placeholder="Search" />
      </AppForm>

      <View style={styles.listsContainer}>
        <View style={styles.listSection}>
          <View style={styles.filterContainer}>
            <DropDown
              options={[
                { label: "Today", value: "today" },
                { label: "All", value: "all" },
              ]}
              onSelect={(option) => handleDateFilter(option)}
              selectedOption={filter}
            />
          </View>
          {/* Today's Tasks */}
          <FlatList
            style={styles.list}
            data={tasks}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        <View style={styles.listSection}>
          <View style={styles.completedFilterContainer}>
            <DropDown
              options={[
                { label: "Completed", value: "completed" },
                { label: "Uncompleted", value: "uncompleted" },
              ]}
              onSelect={(option) => handleCompletedFilter(option)}
              selectedOption={completedFilter}
            />
          </View>
          {/* Completed Task */}
          <FlatList
            style={styles.list}
            data={completedTasks}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => <View style={styles.footer} />}
          />
        </View>
      </View>
    </View>
  );
};

const EmptyState = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../../../assets/HomeLogo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <AppText style={styles.title}>What do you want to do today?</AppText>
        <AppText style={styles.subtitle}>Tap + to add your tasks</AppText>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacing.large,
    gap: spacing.large,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.large,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  image: {
    width: "70%",
    height: "30%",
  },
  textContainer: {
    alignItems: "center",
    gap: spacing.small,
  },
  separator: {
    marginVertical: spacing.small,
  },
  listsContainer: {
    flex: 1,
    flexDirection: "column",
    gap: spacing.large,
  },
  listSection: {
    flex: 1,
    gap: spacing.medium,
  },
  list: {
    flex: 1,
  },
  filterContainer: {
    width: "30%",
    alignSelf: "flex-start",
  },
  completedFilterContainer: {
    width: "50%",
    alignSelf: "flex-start",
  },
  footer: {
    height: spacing.xxxLarge,
  },
});
