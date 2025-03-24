/* 
  This is a modal that allows the user to pick a date and time for a task.
  It is used in the NewTask screen.
  Example usage:
  <DateTimePicker
    initialDate={new Date()}
    onDateChange={(date) => console.log("Selected:", date)}
    visible={modalVisible}
    setVisible={setModalVisible}
  />
*/
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import { DATE_TIME_MODES } from "../utils/constants";
import { borderRadius, colors, fontFamily, fontSize, spacing } from "../utils";
import PrimaryButton from "./Buttons/PrimaryButton";
import TertiaryButton from "./Buttons/TertiaryButton";

const { width, height } = Dimensions.get("window");

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateTimePicker = ({
  initialDate,
  onDateChange,
  visible,
  setVisible,
  initialMode = DATE_TIME_MODES.DATETIME,
}) => {
  const [tempDate, setTempDate] = useState(new Date());
  const [mode, setMode] = useState(initialMode);
  const [animatedValue] = useState(new Animated.Value(0));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedAmPm, setSelectedAmPm] = useState("AM");

  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const ampmScrollRef = useRef(null);

  // Initialize with the provided date or current date
  useEffect(() => {
    if (initialDate) {
      setTempDate(initialDate);
      setCurrentMonth(
        new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
      );

      const hours = initialDate.getHours();
      setSelectedHour(hours % 12 || 12);
      setSelectedMinute(initialDate.getMinutes());
      setSelectedAmPm(hours >= 12 ? "PM" : "AM");
    } else {
      const now = new Date();
      setTempDate(now);
      setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));

      const hours = now.getHours();
      setSelectedHour(hours % 12 || 12);
      setSelectedMinute(now.getMinutes());
      setSelectedAmPm(hours >= 12 ? "PM" : "AM");
    }
  }, [initialDate]);

  // Animation for modal
  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Scroll to the selected time values when the refs are available
  useEffect(() => {
    if (hourScrollRef.current) {
      hourScrollRef.current.scrollToIndex({
        index: Math.max(0, selectedHour - 1),
        animated: false,
      });
    }
    if (minuteScrollRef.current) {
      minuteScrollRef.current.scrollToIndex({
        index: Math.max(0, selectedMinute),
        animated: false,
      });
    }
    if (ampmScrollRef.current) {
      ampmScrollRef.current.scrollToIndex({
        index: selectedAmPm === "AM" ? 0 : 1,
        animated: false,
      });
    }
  }, [hourScrollRef.current, minuteScrollRef.current, ampmScrollRef.current]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const handleConfirm = () => {
    // Convert 12-hour format to 24-hour for the Date object
    let hours = selectedHour;
    if (selectedAmPm === "PM" && hours < 12) {
      hours += 12;
    } else if (selectedAmPm === "AM" && hours === 12) {
      hours = 0;
    }

    const finalDate = new Date(tempDate);
    finalDate.setHours(hours);
    finalDate.setMinutes(selectedMinute);
    finalDate.setSeconds(0);

    onDateChange && onDateChange(finalDate);
    setVisible(false);
  };

  const getDaysInMonth = (year, month) => {
    // Create date at noon to avoid timezone issues
    return new Date(year, month + 1, 0, 12, 0, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    // Create date at noon to avoid timezone issues
    return new Date(year, month, 1, 12, 0, 0).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", empty: true });
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      // Create date at noon to avoid timezone issues
      const date = new Date(year, month, i, 12, 0, 0);

      const isToday = new Date().toDateString() === date.toDateString();

      const isSelected =
        tempDate &&
        tempDate.getDate() === date.getDate() &&
        tempDate.getMonth() === date.getMonth() &&
        tempDate.getFullYear() === date.getFullYear();

      // Get the day of week (0-6) and check if it's a weekend
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      days.push({
        day: i,
        date,
        isToday,
        isSelected,
        isWeekend,
        dayOfWeek, // Add this for debugging if needed
      });
    }

    // Add empty spaces after the last day to complete the grid
    const totalDays = days.length;
    const remainingDays = 7 - (totalDays % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        days.push({ day: "", empty: true });
      }
    }

    return days;
  };

  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const selectDate = (date) => {
    setTempDate(date);
  };

  const renderCalendar = () => {
    const calendarDays = generateCalendarDays();

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text style={styles.calendarNavButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.calendarNavButton}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysRow}>
          {DAYS.map((day, index) => (
            <Text
              key={day}
              style={[
                styles.weekdayText,
                (index === 0 || index === 6) && styles.weekendText,
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendarDays.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                item.empty && styles.emptyDay,
                item.isToday && styles.todayDay,
                item.isSelected && styles.selectedDay,
              ]}
              onPress={() => item.date && selectDate(item.date)}
              disabled={item.empty}
            >
              <Text
                style={[
                  styles.calendarDayText,
                  item.isWeekend && styles.weekendText,
                  item.isToday && styles.todayDayText,
                  item.isSelected && styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderTimeWheel = () => {
    // Generate hours (1-12)
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

    // Generate minutes (00-59)
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    // AM/PM options
    const ampm = ["AM", "PM"];

    const renderHourItem = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.wheelItem,
          selectedHour === item && styles.selectedWheelItem,
        ]}
        onPress={() => setSelectedHour(item)}
      >
        <Text
          style={[
            styles.wheelItemText,
            selectedHour === item && styles.selectedWheelItemText,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );

    const renderMinuteItem = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.wheelItem,
          selectedMinute === item && styles.selectedWheelItem,
        ]}
        onPress={() => setSelectedMinute(item)}
      >
        <Text
          style={[
            styles.wheelItemText,
            selectedMinute === item && styles.selectedWheelItemText,
          ]}
        >
          {item.toString().padStart(2, "0")}
        </Text>
      </TouchableOpacity>
    );

    const renderAmPmItem = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.wheelItem,
          selectedAmPm === item && styles.selectedWheelItem,
        ]}
        onPress={() => setSelectedAmPm(item)}
      >
        <Text
          style={[
            styles.wheelItemText,
            selectedAmPm === item && styles.selectedWheelItemText,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.timeWheelContainer}>
        <View style={styles.wheelLabels}>
          <Text style={styles.wheelLabel}>Hour</Text>
          <Text style={styles.wheelLabel}>Minute</Text>
          <Text style={styles.wheelLabel}>AM/PM</Text>
        </View>

        <View style={styles.wheelsContainer}>
          <View style={styles.wheelHighlight} />

          <FlatList
            ref={hourScrollRef}
            data={hours}
            renderItem={renderHourItem}
            keyExtractor={(item) => `hour-${item}`}
            showsVerticalScrollIndicator={false}
            snapToInterval={50}
            decelerationRate="fast"
            style={styles.wheel}
            contentContainerStyle={styles.wheelContent}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / 50);
              setSelectedHour(hours[index]);
            }}
          />

          <FlatList
            ref={minuteScrollRef}
            data={minutes}
            renderItem={renderMinuteItem}
            keyExtractor={(item) => `minute-${item}`}
            showsVerticalScrollIndicator={false}
            snapToInterval={50}
            decelerationRate="fast"
            style={styles.wheel}
            contentContainerStyle={styles.wheelContent}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / 50);
              setSelectedMinute(minutes[index]);
            }}
          />

          <FlatList
            ref={ampmScrollRef}
            data={ampm}
            renderItem={renderAmPmItem}
            keyExtractor={(item) => `ampm-${item}`}
            showsVerticalScrollIndicator={false}
            snapToInterval={50}
            decelerationRate="fast"
            style={styles.wheel}
            contentContainerStyle={styles.wheelContent}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / 50);
              setSelectedAmPm(ampm[index]);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.overlay} activeOpacity={1}>
          <Animated.View
            style={[styles.pickerContainer, { transform: [{ translateY }] }]}
          >
            <View style={styles.handle} />

            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Select {mode === DATE_TIME_MODES.DATE && "Date"}
                {mode === DATE_TIME_MODES.TIME && "Time"}
                {mode === DATE_TIME_MODES.DATETIME && "Date & Time"}
              </Text>

              {/* <View style={styles.modeSelector}>
                <TouchableOpacity
                  style={[
                    styles.modeButton,
                    mode === DATE_TIME_MODES.DATE && styles.activeModeButton,
                  ]}
                  onPress={() => setMode(DATE_TIME_MODES.DATE)}
                >
                  <Text
                    style={[
                      styles.modeButtonText,
                      mode === DATE_TIME_MODES.DATE &&
                        styles.activeModeButtonText,
                    ]}
                  >
                    Date
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modeButton,
                    mode === DATE_TIME_MODES.TIME && styles.activeModeButton,
                  ]}
                  onPress={() => setMode(DATE_TIME_MODES.TIME)}
                >
                  <Text
                    style={[
                      styles.modeButtonText,
                      mode === DATE_TIME_MODES.TIME &&
                        styles.activeModeButtonText,
                    ]}
                  >
                    Time
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modeButton,
                    mode === DATE_TIME_MODES.DATETIME &&
                      styles.activeModeButton,
                  ]}
                  onPress={() => setMode(DATE_TIME_MODES.DATETIME)}
                >
                  <Text
                    style={[
                      styles.modeButtonText,
                      mode === DATE_TIME_MODES.DATETIME &&
                        styles.activeModeButtonText,
                    ]}
                  >
                    Both
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <View style={styles.pickerContent}>
              {mode === DATE_TIME_MODES.DATE && renderCalendar()}
              {mode === DATE_TIME_MODES.TIME && renderTimeWheel()}
              {mode === DATE_TIME_MODES.DATETIME && (
                <>
                  {renderCalendar()}
                  {renderTimeWheel()}
                </>
              )}
            </View>

            <View style={styles.buttonRow}>
              <TertiaryButton
                title="Cancel"
                onPress={() => setVisible(false)}
              />
              <PrimaryButton
                title="Confirm"
                onPress={handleConfirm}
                style={styles.confirmButton}
              />
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  pickerContainer: {
    backgroundColor: colors.gray.tabBar,
    marginHorizontal: spacing.large,
    borderRadius: borderRadius.large,
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.large,
    paddingTop: spacing.large,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.medium,
    color: colors.white,
    marginBottom: spacing.small,
  },
  modeSelector: {
    flexDirection: "row",
    backgroundColor: colors.gray.tabBar,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.gray.inputBorder,
    padding: spacing.small,
  },
  modeButton: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadius.medium,
  },
  activeModeButton: {
    backgroundColor: colors.purple.dark,
  },
  modeButtonText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  activeModeButtonText: {
    color: colors.white,
  },
  pickerContent: {
    marginBottom: spacing.large,
  },
  // Calendar styles
  calendarContainer: {
    marginBottom: spacing.large,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.small,
  },
  calendarTitle: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  calendarNavButton: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.medium,
    color: colors.purple.medium,
    padding: spacing.small,
  },
  weekdaysRow: {
    flexDirection: "row",
    paddingHorizontal: 0,
    marginBottom: spacing.small,
  },
  weekdayText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    color: colors.white,
    width: "14.28%",
    textAlign: "center",
    paddingHorizontal: 0,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between", // Add this to ensure even spacing
  },
  calendarDay: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 0,
  },
  calendarDayText: {
    fontSize: fontSize.small,
    color: colors.white,
    textAlign: "center",
  },
  emptyDay: {
    width: "14.28%",
  },
  todayDay: {
    backgroundColor: colors.gray.light,
    borderRadius: borderRadius.medium,
  },
  todayDayText: {
    fontWeight: "600",
  },
  selectedDay: {
    backgroundColor: colors.purple.dark,
    borderRadius: borderRadius.medium,
  },
  selectedDayText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  // Time wheel styles
  timeWheelContainer: {
    marginTop: spacing.large,
  },
  wheelLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.large,
  },
  wheelLabel: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    color: colors.white,
    width: width / 4,
    textAlign: "center",
  },
  wheelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 150,
    position: "relative",
    paddingHorizontal: spacing.small,
  },
  wheelHighlight: {
    position: "absolute",
    top: "50%",
    left: spacing.small,
    right: spacing.small,
    height: 50,
    backgroundColor: colors.purple.dark,
    transform: [{ translateY: -25 }],
    zIndex: -1,
    borderRadius: 8,
  },
  wheel: {
    width: (width - 80) / 3,
    height: 150,
    flex: 1,
  },
  wheelContent: {
    paddingVertical: 50, // To allow scrolling to first and last items
  },
  wheelItem: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.small,
    width: "100%",
  },
  selectedWheelItem: {
    backgroundColor: "transparent",
  },
  selectedWheelItemText: {
    fontFamily: fontFamily.medium,
    color: colors.white,
    fontSize: fontSize.large,
  },
  wheelItemText: {
    fontSize: fontSize.medium,
    color: colors.white,
  },
  // Button styles
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.medium,
    paddingHorizontal: spacing.small,
  },
  confirmButton: {
    backgroundColor: colors.purple.dark,
    minWidth: 120,
  },
  weekendText: {
    color: colors.red || "#FF6B6B", // Add a red color to your colors utility or use a direct hex value
  },
});

export default DateTimePicker;
