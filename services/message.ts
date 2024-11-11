import { axiosWithToken } from "@/utils/axios";

class MsgService {
  sendMessage(payload: { text: string; recepient_id: string; type: string }) {
    return axiosWithToken().post("/chat/direct-message", {
      ...payload,
    });
  }
  getChatList(page = 1) {
    return axiosWithToken().get("/contact", {
      params: {
        page,
      },
    });
  }
  getConversation(recepient_id: string) {
    return axiosWithToken().get("/chat/direct-message", {
      params: {
        recepient_id,
      },
    });
  }
}

const MessageService = new MsgService();
export default MessageService;
