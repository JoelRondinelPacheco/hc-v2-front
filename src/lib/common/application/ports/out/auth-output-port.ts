import { AuthInfo, AuthInfoResponse, AuthInfoResponseWithToken } from "@/lib/common/domain/entities/auth";
import { GenericCall } from "@/lib/common/domain/entities/call";

export interface AuthOutputPort {
    login: (login: AuthInfo) => GenericCall<AuthInfoResponseWithToken>,
    logout: () => void
}