import usePost from "./usePost";
import { AuthInfo, AuthInfoResponse, AuthInfoResponseWithToken } from "@/lib/common/domain/entities/auth";
import useFetchAndLoad from "./useFetchAndLoad";
import { createAuthUseCase } from "@/lib/common/application/use-cases/auth-use-case";
import { createAuthRepository } from "@/lib/common/adapter/out/http/auth-repository";
import { GlobalReducerAction } from "@/context/auth-reducer";
import { useEffect } from "react";
import { updateToken } from "@/lib/common/adapter/out/http/api-client";


const useLogin = (dispatch: React.Dispatch<GlobalReducerAction>) => {
  
  const auth = createAuthUseCase(createAuthRepository());

  const { doPost, error, loading, response } = usePost<AuthInfo, AuthInfoResponseWithToken>(auth.login)
  
  useEffect(() => {
    if (response !== null && !loading && !error) {
      updateToken(response.authToken)
        dispatch({
          type: "LOGIN",
          payload: {
            name: response.name,
            email: response.email,
            role: response.role
          }
        })
    }
  }, [response])


  return { login: doPost, loading, error, response };
};

export default useLogin;
