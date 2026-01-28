import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../authentication/firebase";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export { useAuth };
