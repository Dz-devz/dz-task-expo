import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import CustomButton from "../components/CustomButton";

export default function Index() {
  return (
    <SafeAreaView className="bg-stone-950 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-start items-center min-h-[85vh] px-4">
          <Image
            source={require("../assets/dz-task-high-resolution-logo-transparent.png")}
            className="w-96 h-96 mx-auto mt-40"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              A Simple task can change your life.{" "}
              <Text className="text-slate-200 font-pbold  underline">
                DzTask
              </Text>
            </Text>
          </View>
          <CustomButton
            title="Get Started!"
            handlePress={() => router.push("/(auth)/login")}
            containerStyles="w-full mt-7"
            textStyles="text-lg font-semibold"
            isLoading={undefined}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
