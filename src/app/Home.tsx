import { Link, useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../authentication/firebase";
import { useAuth } from "../hooks/getuser";

const Home = () => {
  const navigation = useNavigation();

  const user = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-">
      <Image
        source={require("../assets/dz-task-high-resolution-logo-transparent.png")}
        className="w-96 h-96 mx-auto mt-40"
      />
      <Link
        href="/Create"
        className="text-black text-2xl w-56 h-10 rounded-md mx-auto text-center mt-4 font-bold"
      >
        Start your day
      </Link>
      <View className="flex flex-row items-center justify-evenly mt-2">
        {!user ? (
          <>
            <TouchableOpacity
              className="bg-black w-20 rounded-md p-2"
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text className="text-lg text-center text-white">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black w-24 rounded-md p-2"
              onPress={() => navigation.navigate("Register" as never)}
            >
              <Text className="text-lg text-center text-white">Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => auth.signOut()}
            className="bg-black w-24 rounded-md p-2"
          >
            <Text className="text-lg text-center text-white">Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
