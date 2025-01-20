import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#020024", "#445473", "#00d4ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <Text className="text-center font-bold text-2xl mx-auto rounded-lg w-32 text-white mt-8">
          Dz Task
        </Text>
        <LinearGradient
          colors={["#22c1c3", "#fdbb2d"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-96 mx-auto p-4 mt-4"
          style={{
            borderRadius: 16,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, marginBottom: 8, padding: 12 }}>
              Your ultimate companion for managing habits and staying organized.
            </Text>
            <Text className="pl-4" style={{ fontSize: 16 }}>
              •{" "}
              <Text className="pl-4" style={{ fontWeight: "bold" }}>
                Plan your day
              </Text>{" "}
              📋
            </Text>
            <Text className="pl-4" style={{ fontSize: 16 }}>
              • <Text style={{ fontWeight: "bold" }}>Track your progress</Text>{" "}
              ✅
            </Text>
            <Text className="pl-4" style={{ fontSize: 16 }}>
              • <Text style={{ fontWeight: "bold" }}>Achieve your goals</Text>{" "}
              🎯
            </Text>
            <Text className="pl-4" style={{ fontSize: 18, marginTop: 8 }}>
              Let’s make productivity simple and fun. Start your journey with Dz
              Task today!
            </Text>
          </View>
        </LinearGradient>
        <Link
          href="/Create"
          className="text-white text-2xl w-56 h-10 rounded-md mx-auto text-center mt-4 bg-black"
        >
          Start your day
        </Link>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
