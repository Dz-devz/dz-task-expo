import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type dataProps = {
  id: string;
  title: string;
  description: string;
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
    <View>
      <Text className="text-center font-bold text-2xl mt-4">List of Task</Text>
      {data.map((d) => (
        <View>
          <Text key={d.id}>Title: {d.title}</Text>
          <Text>Description: {d.description}</Text>
          <Text>Priority: {d.priority}</Text>
        </View>
      ))}
    </View>
  );
};

export default Task;
