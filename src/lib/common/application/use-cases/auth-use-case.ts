import { getController } from "../../domain/entities/controller"
import { mockPromise } from "../../domain/entities/mock-promise"
import { AuthInputPort } from "../ports/in/auth-input-port"
import { AuthOutputPort } from "../ports/out/auth-output-port"
import { AuthInfoResponse, AuthInfoResponseWithToken, } from "../../domain/entities/auth"

export const createAuthUseCase = (authRepository: AuthOutputPort): AuthInputPort => {
    return {
        login: (login) => {         
            const controller = getController();
            let request;
            let data: AuthInfoResponseWithToken;
            switch (login.email) {
                case "employee@hcv2.com":
                    data = {
                        authToken: "",
                        role: "EMPLOYEE-DEMO",
                        name: "Joel Rondinel Pacheco",
                        email: "employee@hcv2.com",
                      }
                  request = mockPromise(data, controller)
                  return { request, controller}
                case "admin@hcv2.com":
                    data = {
                        authToken: "",
                        role: "ADMINISTRATOR-DEMO",
                        name: "Joel Rondinel Pacheco",
                        email: "admin@hcv2.com",
                      };
                
 
                  request = mockPromise(data, controller)
                  return { request, controller}
                case "owner@hcv2.com":
                  data = {
                    authToken: "",
                    role: "OWNER-DEMO",
                    name: "Joel Rondinel Pacheco",
                    email: "owner@hcv2.com",
                  };
                  request = mockPromise(data, controller)
                  return { request, controller}
                default:
                    break;
              }

            return authRepository.login(login);
        },
        logout: () => {
            authRepository.logout()
        }
    }
}


