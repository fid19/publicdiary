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

interface UserType {
  [key: string]: string;
}
interface AuthContextType {
  user: UserType | null;
  fetchAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);

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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used under a provider");
  }

  return context;
};
