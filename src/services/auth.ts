export const login = (email: string, password: string) => {
    switch(email) {
        case 'employee@hcv2.com':
            return {
                isLoggedIn: true,
                authToken: "asdasd",
                role: "EMPLOYEE-DEMO",
                name: "employee",
                email: "employee@hcv2.com"
            }
            break;
        case 'admin@hcv2.com':
            return {
                isLoggedIn: true,
                authToken: "asdasd",
                role: "ADMIN-DEMO",
                name: "admin",
                email: "admin@hcv2.com"
            }
            break;
        case 'owner@hcv2.com':
            return {
                isLoggedIn: true,
                authToken: "asdasd",
                role: "OWNER-DEMO",
                name: "owner",
                email: "owner@hcv2.com"
            }
            break;
        default:
            return {
                isLoggedIn: false,
                authToken: "",
                role: "NONE",
                name: "",
                email: ""
            }
    }
}