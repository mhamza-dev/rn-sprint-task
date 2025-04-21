import React, { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FlashMessage = ({ message, type = "info", duration = 3000, onClose }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration - 600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) onClose();
    });
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      case "warning":
        return styles.warning;
      default:
        return styles.info;
    }
  };

  if (!message) return null;

  return (
    <Animated.View style={[styles.container, getTypeStyles(), { opacity }]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    color: "white",
    flex: 1,
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeText: {
    color: "white",
    fontSize: 24,
  },
  success: {
    backgroundColor: "#4caf50",
  },
  error: {
    backgroundColor: "#f44336",
  },
  warning: {
    backgroundColor: "#ff9800",
  },
  info: {
    backgroundColor: "#2196f3",
  },
});

export default FlashMessage;
