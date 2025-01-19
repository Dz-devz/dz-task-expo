import { useReducer } from "react";
import { Button, Text, TextInput, View } from "react-native";
import "../../global.css";

type StateType = {
  taskState: string;
  descState: string;
  prioState: string;
};

type ActionType =
  | { type: "SET_TASK"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "SET_PRIO"; payload: string };

const initialState: StateType = {
  taskState: "",
  descState: "",
  prioState: "0",
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_TASK":
      return { ...state, taskState: action.payload };
    case "SET_DESC":
      return { ...state, descState: action.payload };
    case "SET_PRIO":
      return { ...state, prioState: action.payload };
    default:
      return state;
  }
};

const Create = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View>
      <Text className="text-2xl text-center font-bold mt-8">Create Task</Text>
      <TextInput
        placeholder="Task"
        value={state.taskState}
        onChangeText={(text) => dispatch({ type: "SET_TASK", payload: text })}
      />
      <TextInput
        placeholder="Description"
        value={state.descState}
        onChangeText={(text) => dispatch({ type: "SET_DESC", payload: text })}
      />
      <TextInput
        placeholder="Priority"
        keyboardType="numeric"
        value={state.prioState}
        onChangeText={(text) => dispatch({ type: "SET_PRIO", payload: text })}
      />
      <Button title="Submit Task" color="black" />
    </View>
  );
};

export default Create;
