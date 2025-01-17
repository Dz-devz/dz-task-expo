import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type dataProps = {
  id: string;
  title: string;
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
      <Text>Task</Text>
      {data.map((d) => (
        <Text key={d.id}>Index {d.title}</Text>
      ))}
    </View>
  );
};

export default Task;
