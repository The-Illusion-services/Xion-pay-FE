import { axiosWithToken } from "@/utils/axios";

class UserContactService {
  getChatList(page = 1) { //TODO: set page where request is ebing made
    return axiosWithToken().get("/contact", {
      params: {
        page,
      },
    });
  }

  SearchContact(page = 1, word: any) { //TODO: set page where request is ebing made
    return axiosWithToken().get("/contact/search", {
      params: {
        page,
        word
      },
    });
  }
  
 }

const ContactService = new UserContactService();
export default ContactService;
