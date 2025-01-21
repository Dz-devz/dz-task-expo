import { useNavigation } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../authentication/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    console.log(auth.currentUser);

    if (user) {
      Alert.alert("Login Success", "You have successfully logged in.");
      navigation.navigate("Create" as never);
    } else {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register" as never)}
      />
    </View>
  );
}

export default Login;
