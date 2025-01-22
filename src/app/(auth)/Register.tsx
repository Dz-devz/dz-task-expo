import CustomButton from "@/src/components/CustomButton";
import { router, useNavigation } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../authentication/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userName = userCredential.user;

    await updateProfile(userName, { displayName: name });

    const user = auth.currentUser;
    if (user) {
      Alert.alert(
        "Successfully Created",
        "You successfully created an account."
      );
    } else {
      Alert.alert(
        "Register Failed",
        "Please check your credentials and try again."
      );
    }
    router.push("/Home");
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-4 bg-stone-950">
      <Text className="text-2xl font-bold mb-4">Register</Text>
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
        title="Register"
        handlePress={handleRegister}
        containerStyles="w-full mt-7"
        textStyles="text-lg font-semibold"
        isLoading={undefined}
      />
      <CustomButton
        title="Go to login"
        handlePress={() => router.push("/Login")}
        containerStyles="w-full mt-7"
        textStyles="text-lg font-semibold"
        isLoading={undefined}
      />
    </SafeAreaView>
  );
};

export default Register;
