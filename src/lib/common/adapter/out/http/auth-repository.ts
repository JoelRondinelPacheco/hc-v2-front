import { AuthOutputPort } from "@/lib/common/application/ports/out/auth-output-port";
import { getController } from "@/lib/common/domain/entities/controller";
import { apiClient } from "./api-client";

export const createAuthRepository = (): AuthOutputPort => {
    return {
        login: (login) => {
            const controller = getController();
            const request = apiClient.post("/auth/authenticate", login);

            return { request, controller }
        },
        logout: () => {
            apiClient.post("/auth/logout");
        }
    }
}