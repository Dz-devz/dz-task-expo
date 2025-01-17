import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
  return (
    <View>
      <Text className="text-center font-bold text-2xl mt-8">Dz Task</Text>
      <View className="bg-lime-300 rounded-xl p-4 mt-4">
        <Text style={{ fontSize: 18, marginBottom: 8, padding: 12 }}>
          Your ultimate companion for managing habits and staying organized.
        </Text>

        {/* Bullet Points */}
        <Text className="pl-4" style={{ fontSize: 16 }}>
          •{" "}
          <Text className="pl-4" style={{ fontWeight: "bold" }}>
            Plan your day
          </Text>{" "}
          📋
        </Text>
        <Text className="pl-4" style={{ fontSize: 16 }}>
          • <Text style={{ fontWeight: "bold" }}>Track your progress</Text> ✅
        </Text>
        <Text className="pl-4" style={{ fontSize: 16 }}>
          • <Text style={{ fontWeight: "bold" }}>Achieve your goals</Text> 🎯
        </Text>

        {/* Closing Statement */}
        <Text className="pl-4" style={{ fontSize: 18, marginTop: 8 }}>
          Let’s make productivity simple and fun. Start your journey with Dz
          Task today!
        </Text>
      </View>
      <Link
        href="/Create"
        className="text-white text-lg w-52 h-8 rounded-md mx-auto text-center mt-4 bg-black"
      >
        Start your day
      </Link>
    </View>
  );
};

export default Home;
