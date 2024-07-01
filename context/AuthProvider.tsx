"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AuthContext = createContext(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  const { mutate } = useSWR("/api/auth", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // revalidateOnMount: false,
  });

  const fetchAuthStatus = useCallback(async () => {
    const result = await mutate();
    setUser(result?.data?.user);
  }, []);

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
