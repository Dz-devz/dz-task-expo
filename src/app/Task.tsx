import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://task-api-prod.up.railway.app/tasks");
      const body = await res.data;

      console.log(body);
      setData(body);
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      <Text className="text-center font-bold text-2xl mt-4">List of Task</Text>
      {data.map((d) => (
        <View key={d.id}>
          <Text>Task: {d.task}</Text>
          <Text>Description: {d.description}</Text>
          <Text>Status: {d.status}</Text>
          <Text>Priority: {d.priority}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Task;
