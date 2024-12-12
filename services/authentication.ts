import { axiosWithoutToken } from "@/utils/axios";

class AuthenticationService {
  login(payload: { email: string; password: string }) {
    return axiosWithoutToken.post("/auth/login", {
      ...payload,
    });
  } 

  confirmCode(payload: { code: string }) {
    return axiosWithoutToken.post("/auth/confirm-code", {
      ...payload,
    });
  } 

  register(payload: {email: string; password: string }) {
    return axiosWithoutToken.post("/auth/register", {
      ...payload,
    });
  }
}

const AuthService = new AuthenticationService();
export default AuthService;
