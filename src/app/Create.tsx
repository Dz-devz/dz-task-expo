import { Button, Text, TextInput, View } from "react-native";
import "../../global.css";

const Create = () => {
  return (
    <View>
      <Text className="text-2xl text-center font-bold mt-8">Create Task</Text>
      <TextInput placeholder="Task" />
      <TextInput placeholder="Description" />
      <TextInput placeholder="Priority" keyboardType="numeric" />
      <Button title="Submit Task" color="black" />
    </View>
  );
};

export default Create;
