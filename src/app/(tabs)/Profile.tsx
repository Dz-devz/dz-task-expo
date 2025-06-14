import { TaskType } from "@/src/db/types";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../hooks/getuser";

type dataProps = {
  id: string;
  task: string;
  description: string;
  status: TaskType;
  priority: number;
};

const Profile = () => {
  const [data, setData] = useState<dataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://task-api-prod.up.railway.app/tasks");
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

  const completedCount = data.filter(
    (task) => task.status === TaskType.COMPLETED
  ).length;

  const percentage = (completedCount / data.length) * 100;

  return (
    <ScrollView className="bg-gray-200">
      {loading && (
        <ActivityIndicator
          className="min-h-screen"
          size="large"
          color="black"
        />
      )}
      {!loading && (
        <View className="flex-1  item-center">
          <View className="my-52">
            <Text className="text-center text-2xl">
              Hello! {user?.displayName}
            </Text>
            <Text className="text-center">
              {percentage.toFixed(2)}% Completed Task
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;
