import { RoleEnum } from "../../../domain/auth";


export const servicesFactory = (role: RoleEnum) => {
    if (role === "ADMINISTRATOR" || role === "EMPLOYEE" || role === "OWNER") {
        
    } else {
        
    }
    throw new Error("Todo implement");
}