export const login = (email: string, password: string) => {
    switch(email) {
        case 'employee@employee.com':
            return {
                isLoggedIn: true,
                authToken: "asdasd",
                role: "EMPLOYEE",
                name: "employee",
                email: "employee@employee.com"
            }
            break;
        case 'admin@admin.com':
            return {
                isLoggedIn: true,
                authToken: "asdasd",
                role: "ADMIN",
                name: "admin",
                email: "admin@admin.com"
            }
            break;
        case 'owner@owner.com':
            return {
                isLoggedIn: true,
                authToken: "asdasd",
                role: "ONWER",
                name: "owner",
                email: "owner@owner.com"
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