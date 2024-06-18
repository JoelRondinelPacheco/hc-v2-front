import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function paymentMethodService(role: RoleEnum) {
    return serviceFactory(role, "/payment-method");
}