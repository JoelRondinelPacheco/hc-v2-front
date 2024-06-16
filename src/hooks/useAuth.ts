import usePost from "./usePost";
import { AuthInfo, AuthInfoResponse } from "@/domain/auth";
import { AuthService } from "@/domain/http-service/http-api-service";

const useAuth = (initialData: AuthInfo) => {
  const loginFunction = new AuthService();

  console.log("LLAMO A POST")
  const { post, isLoading, error, setResponse, response } = usePost<AuthInfo, AuthInfoResponse>({
    call: loginFunction.login.bind(loginFunction),
    initialData
  });

  const login = (authInfo: AuthInfo) => {
    console.log("EJECUTO")
    switch (authInfo.email) {
      case "employee@hcv2.com":
        setResponse({
          authToken: "",
          refreshToken: "",
          role: "EMPLOYEE-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "employee@hcv2.com",
        });
        break;
      case "admin@hcv2.com":
        setResponse({
          authToken: "",
          refreshToken: "",
          role: "ADMIN-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "admin@hcv2.com",
        });
        break;
      case "owner@hcv2.com":
        setResponse({
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

  return { login, isLoading, error, response };
};

export default useAuth;
