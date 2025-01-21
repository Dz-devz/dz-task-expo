import CustomButton from "@/src/components/CustomButton";
import { router, useNavigation } from "expo-router";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../authentication/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userName = userCredentials.user;
    const user = auth.currentUser;

    if (!userName.displayName) {
      await updateProfile(userName, { displayName: name });
      console.log("Display name updated:", userName.displayName);
    }

    if (user) {
      Alert.alert("Login Success", "You have successfully logged in.");
      router.push("/Home");
    } else {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-4 bg-stone-950">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
      <TextInput
        className="h-10 border border-gray-400 mb-2 p-2 placeholder:text-white rounded-md"
        placeholder="Name"
        style={{ color: "white" }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        className="h-10 border border-gray-400 mb-2 p-2 placeholder:text-white rounded-md"
        placeholder="Email"
        style={{ color: "white" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="h-10 border border-gray-400 mb-2 p-2 placeholder:text-white rounded-md"
        placeholder="Password"
        style={{ color: "white" }}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomButton
        title="Login"
        handlePress={handleLogin}
        containerStyles="w-full mt-7"
        textStyles="text-lg font-semibold"
        isLoading={undefined}
      />
      <CustomButton
        title="Register"
        handlePress={() => router.push("/Register")}
        containerStyles="w-full mt-7"
        textStyles="text-lg font-semibold"
        isLoading={undefined}
      />
    </SafeAreaView>
  );
}

export default Login;
