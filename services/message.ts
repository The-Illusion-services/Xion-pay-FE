import { axiosWithToken } from "@/utils/axios";

class MsgService {
  sendMessage(payload: { text: string; recepient_id: string; type: string }) {
    return axiosWithToken().post("/chat/direct-message", {
      ...payload,
    });
  }
}

const MessageService = new MsgService();
export default MessageService;
