import { Client } from "@/domain/client.domain";

const clients: Client[] = [
    {
        id: 1,
        person: {
            id: 1,
            name: "NOMBER",
            lastname: "APELLID",
            email: "email@email.com",
            address: "direccion",
            dni: 1213245,
            birthday: new Date(),
            nationality: "ARG",
            phoneNumber: 1234254,
            role: {
                id: 1,
                name: "ADMIN"
            },
        }
    }
]

export default function clientsMockData() {
    return [...clients]
}