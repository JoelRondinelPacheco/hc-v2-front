import usePost from "./usePost";
import { AuthInfo, AuthInfoResponse } from "@/lib/common/domain/entities/auth";
import useFetchAndLoad from "./useFetchAndLoad";
import { createAuthUseCase } from "@/lib/common/application/use-cases/auth-use-case";
import { createAuthRepository } from "@/lib/common/adapter/out/http/auth-repository";
import { GlobalReducerAction } from "@/context/auth-reducer";
import { useEffect } from "react";


const useAuth = (dispatch: React.Dispatch<GlobalReducerAction>) => {
  
  const auth = createAuthUseCase(createAuthRepository());

  const { doPost, error, loading, response } = usePost<AuthInfo, AuthInfoResponse>(auth.login)
  
  useEffect(() => {
    if (response !== null && !loading && !error) {
        dispatch({
          type: "LOGIN",
          payload: response
        })
    }
  }, [response])


  return { login: doPost, loading, error, response };
};

export default useAuth;
