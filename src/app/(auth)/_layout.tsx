import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="Log-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
          }}
        />
        <StatusBar backgroundColor="#161622" style="light" />
      </Stack>
    </>
  );
};

export default _layout;
