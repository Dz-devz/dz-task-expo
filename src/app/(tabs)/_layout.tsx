import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 1,
          borderTopColor: "#232533",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={28} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="add-circle-outline" size={28} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="Task"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="reader-outline" size={28} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={28} color="white" />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
