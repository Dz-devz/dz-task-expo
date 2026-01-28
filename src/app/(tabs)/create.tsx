import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useReducer } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { TaskType } from "../../db/types";

type StateType = {
  taskState: string;
  descState: string;
  prioState: number;
  statusState: TaskType;
};

type ActionType =
  | { type: "SET_TASK"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "SET_PRIO"; payload: number }
  | { type: "SET_STATUS"; payload: TaskType };

const initialState: StateType = {
  taskState: "",
  descState: "",
  statusState: TaskType.PENDING,
  prioState: 0,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_TASK":
      return { ...state, taskState: action.payload };
    case "SET_DESC":
      return { ...state, descState: action.payload };
    case "SET_STATUS":
      return { ...state, statusState: action.payload };
    case "SET_PRIO":
      return { ...state, prioState: action.payload };
    default:
      return state;
  }
};

const Create = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (state.taskState.trim() === "" || state.descState.trim() === "") {
      Alert.alert("Required", "Task and Description cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        "https://task-api-si4v.onrender.com/tasks",
        {
          task: state.taskState,
          description: state.descState,
          priority: state.prioState,
          status: state.statusState,
        }
      );

      if (response.status === 201) {
        console.log("Task created successfully:", response.data);
        Alert.alert("Success", "Task created successfully!");
        dispatch({ type: "SET_TASK", payload: "" });
        dispatch({ type: "SET_DESC", payload: "" });
        dispatch({ type: "SET_STATUS", payload: TaskType.PENDING });
        dispatch({ type: "SET_PRIO", payload: 0 });
        navigation.navigate("Task" as never);
      } else {
        Alert.alert("Error", "Failed to create the task.");
      }
    } catch (error) {
      console.error("Error during task creation:", error);

      Alert.alert("Error", "Something went wrong while creating the task.");
    }
  };

  return (
    <View>
      <Text className="text-2xl text-center font-bold mt-8">Create Task</Text>
      <TextInput
        className="ml-4"
        placeholder="Task"
        value={state.taskState}
        onChangeText={(text) => dispatch({ type: "SET_TASK", payload: text })}
      />
      <TextInput
        className="ml-4"
        placeholder="Description"
        value={state.descState}
        onChangeText={(text) => dispatch({ type: "SET_DESC", payload: text })}
      />
      <Picker
        selectedValue={state.statusState}
        onValueChange={(itemValue: string) =>
          dispatch({ type: "SET_STATUS", payload: itemValue as TaskType })
        }
      >
        <Picker.Item label="PENDING" value="PENDING" />
        <Picker.Item label="PROCESSING" value="PROCESSING" />
        <Picker.Item label="COMPLETED" value="COMPLETED" />
        <Picker.Item label="CANCELLED" value="CANCELLED" />
      </Picker>
      <TextInput
        className="ml-4"
        placeholder="Priority"
        keyboardType="numeric"
        value={state.prioState.toString()}
        onChangeText={(text) =>
          dispatch({ type: "SET_PRIO", payload: Number(text) })
        }
      />
      <Button title="Submit Task" color="black" onPress={handleSubmit} />
    </View>
  );
};

export default Create;
