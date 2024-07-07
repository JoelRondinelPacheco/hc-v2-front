import usePost from "./usePost";
import { AuthInfo, AuthInfoResponse } from "@/domain/auth";
import useFetchAndLoad from "./useFetchAndLoad";

const useAuth = (initialData: AuthInfo) => {
  //const loginFunction = new AuthService();
  //const loginCall = loginFunction.login.bind(loginFunction);

 /* console.log("LLAMO A POST")
  const { post, isLoading, error, setResponse, response } = usePost<AuthInfo, AuthInfoResponse>({
    call: loginFunction.login.bind(loginFunction),
    initialData
  });*/

  const {loading, error, callEndpoint } = useFetchAndLoad();

  const login = async (authInfo: AuthInfo) => {
    console.log("EJECUTO")
    switch (authInfo.email) {
      case "employee@hcv2.com":
        /*setResponse({
          authToken: "",
          refreshToken: "",
          role: "EMPLOYEE-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "employee@hcv2.com",
        });*/
        return {
          authToken: "",
          refreshToken: "",
          role: "EMPLOYEE-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "employee@hcv2.com",
        }
      case "admin@hcv2.com":
        /*setResponse({
          authToken: "",
          refreshToken: "",
          role: "ADMINISTRATOR-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "admin@hcv2.com",
        });*/
        return {
          authToken: "",
          refreshToken: "",
          role: "ADMINISTRATOR-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "admin@hcv2.com",
        };
      case "owner@hcv2.com":
        /*setResponse({
          authToken: "",
          refreshToken: "",
          role: "OWNER-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "owner@hcv2.com",
        });*/
        return {
          authToken: "",
          refreshToken: "",
          role: "OWNER-DEMO",
          name: "Joel Rondinel Pacheco",
          email: "owner@hcv2.com",
        };
      default:
       // return await callEndpoint(loginCall(authInfo));
        //post(authInfo);
    }
  };

  return { login, loading, error };
};

export default useAuth;
