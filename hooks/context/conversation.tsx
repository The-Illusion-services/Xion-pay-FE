import React, { createContext, useState } from "react";
import { useAuthToken } from "..";
import { generateRoomId } from "@/utils/generator";
import moment from "moment";

interface Message {
  text: string;
  sender_id: string;
  recepient_id: string;
  type: string;
}

interface ConversationContextType {
  conversation: any[];
  initializeConversation: (conversations: any[]) => void;
  updateConversation: (newMessage: any) => void;
  receivedMsg: any[];
  handleReceivedMessage: (newMessage: any) => void;
  lastMessages: { [key: string]: any };
  //   setLastMessages: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const ConversationContext = createContext<ConversationContextType>({
  conversation: [],
  initializeConversation: () => {},
  updateConversation: () => {},
  receivedMsg: [],
  handleReceivedMessage: () => {},
  lastMessages: {},
  //   setLastMessages: () => {}
});

const ConversationProvider = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [conversation, setConversation] = useState<any[]>([]);
  const [receivedMsg, setReceivedMsg] = useState<any[]>([]);
  const [lastMessages, setLastMessages] = useState<{ [key: string]: any }>({});
  const { userData } = useAuthToken();

  const updateConversation = (newMessage: any) => {
    const conversationKey = [newMessage.sender_id, newMessage.recepient_id]
      .sort()
      .join("_");

    setConversation((prevConversation) => [...prevConversation, newMessage]);
    setLastMessages((prevLastMessages: any) => ({
      ...prevLastMessages,
      [conversationKey]: {
        ...newMessage,
        createdAt: newMessage ? new Date().toISOString() : null,
      },
    }));
  };

  const handleReceivedMessage = (newMessage: Message) => {
    if (!userData) return;

    const conversationKey = generateRoomId(
      newMessage.sender_id,
      newMessage.recepient_id
    );

    if (conversationKey.includes(userData._id)) {
      setReceivedMsg((prevReceivedMsg) => [...prevReceivedMsg, newMessage]);
      setLastMessages((prevLastMessages: any) => ({
        ...prevLastMessages,
        [conversationKey]: {
          ...newMessage,
          createdAt: newMessage ? new Date().toISOString() : null,
        },
      }));
      updateConversation(newMessage);
    }
  };

  const initializeConversation = (conversations: any[]) => {
    setConversation(conversations);
  };

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        initializeConversation,
        updateConversation,
        receivedMsg,
        handleReceivedMessage,
        lastMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export { ConversationProvider, ConversationContext };
