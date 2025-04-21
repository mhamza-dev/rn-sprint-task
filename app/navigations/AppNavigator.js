import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";

// screens
import Home from "../screens/home";
import Calendar from "../screens/calendar";
import NewTask from "../screens/NewTask";
import Focus from "../screens/focus";
import Profile from "../screens/profile";

// utils
import { borderWidth, colors, fontFamily } from "../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewTaskButton from "../components/Buttons/NewTaskButton";
import { AuthContext } from "../hooks/AuthContext";

const AppTab = createBottomTabNavigator();

const AppTabNavigator = () => {
  const { setUser } = useContext(AuthContext);
  return (
    <AppTab.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => setUser(null)}>
            <Image
              source={require("../../assets/placeHolderImage.jpg")}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
          </TouchableOpacity>
        ),
        headerRightContainerStyle: {
          alignItems: "center",
        },
        headerBackground: () => (
          <View style={{ backgroundColor: colors.black }} />
        ),
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: fontFamily.medium,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.gray.tabBar,
          height: 80,
          borderTopWidth: borderWidth.none,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.medium,
        },
      }}
    >
      <AppTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-month" : "calendar-month-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="NewTask"
        component={NewTask}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <NewTaskButton
              onPress={() => {
                navigation.navigate("NewTask", { openModal: true });
              }}
            />
          ),
        })}
      />
      <AppTab.Screen
        name="Focus"
        component={Focus}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "clock-time-eight" : "clock-time-eight-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppTabNavigator;
