import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export default function paymentMethodService(role: RoleEnum) {
    serviceFactory(role, "/payment-method");
}