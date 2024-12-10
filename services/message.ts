import { axiosWithToken } from "@/utils/axios";

class MsgService {
  sendMessage(payload: { text: string; recepient_id: string; type: string }) {
    return axiosWithToken().post("/chat/direct-message", {
      ...payload,
    });
  }
  
  getConversation(recepient_id: string, page: number) {
    return axiosWithToken().get("/chat/direct-message", {
      params: {
        recepient_id,
        page
      },
    });
  }
  uploadImage(payload: { recepient_id: string; type: string, base64: string; caption?: string; }) {
    return axiosWithToken().post("/chat/direct-message-image-upload",  {
      ...payload,
    });
  }

  getLinkPreview(url: string) {
    return axiosWithToken().get("/utils/link-preview", {
      params: {
        url,
      },
    });
  }
}

const MessageService = new MsgService();
export default MessageService;
