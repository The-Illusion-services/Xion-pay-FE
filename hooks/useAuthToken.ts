import { useEffect, useState } from "react";
import Router from "next/router";
import { deleteStore, loadStore, saveStore } from "@/utils/local-storage";
import { TAppUser, TAppUserState } from "@types";
import moment from "moment";

function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUser] = useState<TAppUser | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (user: TAppUserState) => {
    if (user) {
      saveStore(user);
      setToken(user?.token);
      setUser(user?.userData);
      setTokenExpiration(moment().add(2, "days").format());
    } else {
      setToken("");
    }
  };

  const logout = () => {
    deleteStore();
    Router.replace("/auth/sign-in");
  };

  useEffect(() => {
    const storeData = loadStore();
    if (storeData) {
      setToken(storeData?.token);
      setUser(storeData?.userData);
    }
    setIsLoading(false);
  }, []);

  return { tokenExpiration, token, userData, isLoading, updateUser, logout };
}

export default useAuthToken;
