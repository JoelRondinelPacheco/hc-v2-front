import { AuthInfo, AuthInfoResponse, AuthInfoResponseWithToken } from "@/lib/common/domain/entities/auth"
import { GenericCall } from "@/lib/common/domain/entities/call"

export interface AuthInputPort {
    login: (login: AuthInfo) => GenericCall<AuthInfoResponseWithToken>,
    logout: () => void
}