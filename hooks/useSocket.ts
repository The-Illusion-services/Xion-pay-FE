import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useAuthToken } from ".";

function useSocket() {
  const { token } = useAuthToken();
  const [receivedMsg, setReceivedMsg] = useState<any>([]);

  const socket = useMemo(() => {
    return io("https://youchatbackend-kga1.onrender.com", {
      query: { token },
      autoConnect: false, // Disable automatic connection on initialization
    });
  }, [token]);

  useEffect(() => {
    socket.connect();

    // Event listeners
    socket.on("connect", () => {});

    socket.on("connect_error", (err: any) => {
      console.error("Connection error", err);
    });

    socket.on("disconnect", () => {});

    socket.on("receive-msg", (data) => {
      if (data) {
        setReceivedMsg((prevReceivedMsg: any) => [...prevReceivedMsg, data]);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("receive-msg");
      socket.disconnect();
    };
  }, [socket, token]);
  return { receivedMsg };
}

export default useSocket;
