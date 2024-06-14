import authService from "@/services/auth-service";
import usePost from "./usePost";
import { AuthInfo, AuthInfoResponse } from "@/domain/auth";
import { AuthService } from "@/domain/http-service/http-api-service";

const useAuth = () => {
  const loginFunction = new AuthService();

  const { post, data, setData, isLoading, error } = usePost<AuthInfo, AuthInfoResponse>({
    call: loginFunction.login,
  });

  const login = (authInfo: AuthInfo) => {
    console.log(authInfo)
    switch (authInfo.email) {
      case "employee@hcv2.com":
        setData({
          authToken: "",
          refreshToken: "",
          role: "EMPLOYEE-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "employee@hcv2.com",
        });
        break;
      case "admin@hcv2.com":
        setData({
          authToken: "",
          refreshToken: "",
          role: "ADMIN-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "admin@hcv2.com",
        });
        break;
      case "owner@hcv2.com":
        setData({
          authToken: "",
          refreshToken: "",
          role: "OWNER-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "owner@hcv2.com",
        });
        break;
      default:
        post(authInfo);
        break;
    }
  };

  return { login, isLoading, error, data };
};

export default useAuth;
