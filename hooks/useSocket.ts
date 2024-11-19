import { useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useAuthToken } from ".";
import { ConversationContext } from "./context/conversation";

function useSocket() {
  const { token } = useAuthToken();
  const [receivedMsg, setReceivedMsg] = useState<any>([]);
  const { handleReceivedMessage } = useContext(ConversationContext);

  const socket = useMemo(() => {
    return io("https://youchatbackend-kga1.onrender.com", {
      query: { token },
      autoConnect: false, // Disable automatic connection on initialization
    });
  }, [token]);

  useEffect(() => {
    socket.connect();

    // Event listeners
    socket.on("connect", () => {
      //take ff when done
      console.log("connected to ws");
    });

    socket.on("connect_error", (err: any) => {
      console.error("Connection error", err);
    });

    socket.on("disconnect", () => {});

    socket.on("receive-msg", (data: any) => {
      if (data) {
        handleReceivedMessage(data);
      }
      console.log("ws data", data);
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
  return { receivedMsg, setReceivedMsg };
}

export default useSocket;
