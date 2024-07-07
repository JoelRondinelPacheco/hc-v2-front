import { AuthInfo, AuthInfoResponse } from "@/lib/common/domain/entities/auth"
import { GenericCall } from "@/lib/common/domain/entities/call"

export interface AuthInputPort {
    login: (login: AuthInfo) => GenericCall<AuthInfoResponse>,
    logout: () => void
}