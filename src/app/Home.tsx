import { Link } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
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
    </SafeAreaView>
  );
};

export default Home;
