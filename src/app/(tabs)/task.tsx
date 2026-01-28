import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskType } from "../../db/types";

type dataProps = {
  id: string;
  task: string;
  description: string;
  status: TaskType;
  priority: number;
};

export default function Task() {
  const [data, setData] = useState<dataProps[]>([]);
  const [updateTask, setUpdateTask] = useState<dataProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisibile, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://task-api-si4v.onrender.com/tasks");
      const body = await res.data;
      setData(body);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleUpdate = async (task: dataProps) => {
    setLoading(true);
    const response = await axios.put(
      `https://task-api-si4v.onrender.com/tasks/${task.id}`,
      task
    );
    if (response.status === 200) {
      Alert.alert("Success", "Updated successfully!");

      setData((prev) =>
        prev.map((d) => (d.id === task.id ? { ...d, ...task } : d))
      );
      setLoading(false);
      setUpdateTask(null);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const response = await axios.delete(
      `https://task-api-si4v.onrender.com/tasks/${id}`
    );
    if (response.status === 200) {
      Alert.alert("Delete", "Deleted successfully!");
      setData((prev) => prev.filter((task) => task.id !== id));
      setLoading(false);
    }
  };

  const sortTasks = (status: string) => {
    const sortedData = [...data].sort((a, b) => {
      const statusOrder = ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"];

      if (a.status === status && b.status !== status) return -1;
      if (b.status === status && a.status !== status) return 1;

      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });

    setData(sortedData);
  };

  const handleStatusFilter = (status: string) => {
    sortTasks(status);
  };

  const getStatusColor = (status: TaskType) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-400";
      case "PROCESSING":
        return "bg-blue-400";
      case "COMPLETED":
        return "bg-green-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false); // Stop the refresh animation
    }, 2000);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-200"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading && (
        <ActivityIndicator
          className="min-h-screen"
          size="large"
          color="black"
        />
      )}
      {!loading && (
        <>
          {/* <Text className="bg-stone-600 text-center font-bold text-2xl mt-4 text-white w-44 mx-auto">
            List of Task
          </Text> */}
          <Image
            source={require("../../assets/dz-task-high-resolution-logo-transparent.png")}
            className="w-72 h-48 mx-auto mt-4"
          />
          <View className="flex flex-row mx-auto gap-2 mt-4">
            <TouchableOpacity
              className="w-32 h-8 bg-black/70 rounded-md mx-auto"
              onPress={() => handleStatusFilter("PENDING")}
            >
              <Text className="font-semibold text-white text-lg text-center">
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-32 h-8 bg-black/70 rounded-md mx-auto"
              onPress={() => handleStatusFilter("PROCESSING")}
            >
              <Text className="font-semibold text-white text-lg text-center">
                Processing
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row mx-auto gap-2">
            <TouchableOpacity
              className="w-32 h-8 mt-2 bg-black/70 rounded-md mx-auto"
              onPress={() => handleStatusFilter("COMPLETED")}
            >
              <Text className="font-semibold text-white text-lg text-center">
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-32 h-8 mt-2 bg-black/70 rounded-md mx-auto"
              onPress={() => handleStatusFilter("CANCELLED")}
            >
              <Text className="font-semibold text-white text-lg text-center">
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
          {data.map((d) => (
            <View
              className="bg-white/50 my-4 p-4 rounded-2xl w-80 mx-auto"
              key={d.id}
            >
              {updateTask?.id === d.id ? (
                <View className="flex justify-center gap-2">
                  <TextInput
                    value={updateTask.task}
                    onChangeText={(text) =>
                      setUpdateTask({ ...updateTask, task: text })
                    }
                    placeholder="Task"
                    className="bg-gray-200 p-2 rounded w-[194px] mx-auto"
                  />
                  <TextInput
                    value={updateTask.description}
                    onChangeText={(text) =>
                      setUpdateTask({ ...updateTask, description: text })
                    }
                    placeholder="Description"
                    className="bg-gray-200 p-2 rounded w-[194px] mx-auto"
                  />
                  <Picker
                    style={{
                      backgroundColor: "#e5e7eb",
                      width: 192,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    selectedValue={updateTask.status}
                    onValueChange={(text) =>
                      setUpdateTask({ ...updateTask, status: text as TaskType })
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
                      setUpdateTask({
                        ...updateTask,
                        priority: parseInt(text) || 0,
                      })
                    }
                    keyboardType="numeric"
                    placeholder="Priority"
                    className="bg-gray-200 p-2 rounded w-[194px] mx-auto"
                  />
                  <View className="flex-row flex w-52 mx-auto justify-between mt-4">
                    <Feather
                      name="save"
                      size={30}
                      color="black"
                      onPress={() => handleUpdate(updateTask)}
                    />

                    <MaterialIcons
                      name="cancel"
                      size={30}
                      color="black"
                      onPress={() => setUpdateTask(null)}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View className="flex justify-between items-center flex-row">
                    <Text className="text-lg font-medium">{d.task}</Text>
                    <Text
                      className={`p-[2px] w-32 rounded-lg text-center text-white ${getStatusColor(
                        d.status
                      )}`}
                    >
                      {d.status}
                    </Text>
                  </View>
                  <Text className="text-lg font-medium">{d.description}</Text>
                  <Text className="text-lg font-medium">{d.priority}</Text>
                  <View className="flex justify-between items-center flex-row">
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisibile}
                      onRequestClose={() => {
                        setModalVisible(false);
                      }}
                    >
                      <View className="flex-1 items-center justify-center bg-black/10">
                        <View className="w-[350px] bg-white rounded-xl p-5 items-center shadow-lg">
                          <Image
                            source={require("../../assets/dz-task-high-resolution-logo-transparent.png")}
                            className="w-32 h-24 mx-auto mb-4"
                          />
                          <Text className="text-[16px]">
                            Are you sure you want to delete?
                          </Text>
                          <View className="flex flex-row gap-14 mt-4">
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(false);
                                handleDelete(d.id);
                              }}
                            >
                              <Text className="text-[16px]">Sure</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => setModalVisible(false)}
                            >
                              <Text className="text-[16px]">Close</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    <Feather
                      className="mt-4"
                      name="trash-2"
                      size={24}
                      color="black"
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    />
                    <TouchableOpacity
                      className="w-24 flex flex-row h-8 mt-4"
                      onPress={() => setUpdateTask(d)}
                    >
                      <Text className="font-semibold text-lg ml-6">Edit</Text>
                      <Feather
                        name="arrow-right"
                        className="my-auto"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}
