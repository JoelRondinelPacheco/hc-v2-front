import { AuthInfo, AuthInfoResponse } from "@/lib/common/domain/entities/auth";
import { GenericCall } from "@/lib/common/domain/entities/call";

export interface AuthOutputPort {
    login: (login: AuthInfo) => GenericCall<AuthInfoResponse>,
    logout: () => void
}