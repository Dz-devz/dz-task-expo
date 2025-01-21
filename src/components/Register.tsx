import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../authentication/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password);
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
    navigation.navigate("Home" as never);
  };

  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Register</Text>
      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
      <TextInput
        className="h-10 border border-gray-400 mb-2 p-2"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="h-10 border border-gray-400 mb-2 p-2"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login" as never)}
      />
    </View>
  );
};

export default Register;
