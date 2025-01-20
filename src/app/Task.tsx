import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { TaskType } from "../db/types";

type dataProps = {
  id: string;
  task: string;
  description: string;
  status: TaskType;
  priority: number;
};

const Task = () => {
  const [data, setData] = useState<dataProps[]>([]);
  const [updateTask, setUpdateTask] = useState<dataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://task-api-prod.up.railway.app/tasks");
      const body = await res.data;

      console.log(body);
      setData(body);
    };
    fetchData();
  }, []);

  const handleUpdate = async (task: dataProps) => {
    const response = await axios.put(
      `https://task-api-prod.up.railway.app/tasks/${task.id}`,
      task
    );
    if (response.status === 200) {
      Alert.alert("Success", "Updated successfully!");

      setData((prev) =>
        prev.map((d) => (d.id === task.id ? { ...d, ...task } : d))
      );
      setUpdateTask(null);
    }
  };

  const getStatusColor = (status: TaskType) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-300";
      case "PROCESSING":
        return "bg-blue-500";
      case "COMPLETED":
        return "bg-green-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <ScrollView>
      <Text className="bg-stone-600 text-center font-bold text-2xl mt-4 text-white w-44 mx-auto">
        List of Task
      </Text>
      {data.map((d) => (
        <View
          className="bg-pink-300 shadow my-4 p-4 rounded-2xl w-72 mx-auto"
          key={d.id}
        >
          {updateTask?.id === d.id ? (
            <View>
              <TextInput
                value={updateTask.task}
                onChangeText={(text) =>
                  setUpdateTask((prev) =>
                    prev ? { ...prev, task: text } : prev
                  )
                }
                placeholder="Task"
                className="bg-gray-200 p-2 rounded"
              />
              <TextInput
                value={updateTask.description}
                onChangeText={(text) =>
                  setUpdateTask((prev) =>
                    prev ? { ...prev, description: text } : prev
                  )
                }
                placeholder="Description"
                className="bg-gray-200 p-2 rounded"
              />
              <Picker
                selectedValue={updateTask.status}
                onValueChange={(text) =>
                  setUpdateTask((prev) =>
                    prev ? { ...prev, status: text as TaskType } : prev
                  )
                }
              >
                <Picker.Item label="PENDING" value="PENDING" />
                <Picker.Item label="PROCESSING" value="PROCESSING" />
                <Picker.Item label="COMPLETED" value="COMPLETED" />
                <Picker.Item label="CANCELLED" value="CANCELLED" />
              </Picker>
              <TextInput
                value={updateTask.priority.toString()}
                onChangeText={(text) =>
                  setUpdateTask((prev) =>
                    prev ? { ...prev, priority: parseInt(text) || 0 } : prev
                  )
                }
                keyboardType="numeric"
                placeholder="Priority"
                className="bg-gray-200 p-2 rounded"
              />
              <Button title="Save" onPress={() => handleUpdate(updateTask)} />
              <Button title="Cancel" onPress={() => setUpdateTask(null)} />
            </View>
          ) : (
            <View>
              <View className="flex justify-between items-center flex-row">
                <Text className="">{d.task}</Text>
                <Text
                  className={`p-[2px] w-32 rounded-lg text-center ${getStatusColor(
                    d.status
                  )}`}
                >
                  {d.status}
                </Text>
              </View>
              <Text>{d.description}</Text>
              <Text className="">{d.priority}</Text>
              <View className="flex justify-around items-center flex-row">
                <Button title="Update" onPress={() => setUpdateTask(d)} />
                <Button title="Delete" />
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Task;
