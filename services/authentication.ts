import { axiosWithoutToken } from "@/utils/axios";

class AuthenticationService {
  login(payload: { email: string; password: string }) {
    return axiosWithoutToken.post("/auth/login", {
      ...payload,
    });
  } 

  // loginCheck(payload: { email: string }) {
  //   return axiosWithoutToken.post("/auth/login", {
  //     ...payload,
  //   });
  // } 

  register(payload: {email: string; password: string }) {
    return axiosWithoutToken.post("/auth/register", {
      ...payload,
    });
  }
}

const AuthService = new AuthenticationService();
export default AuthService;
