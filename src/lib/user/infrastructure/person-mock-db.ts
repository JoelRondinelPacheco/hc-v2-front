import { PersonEntityDB } from "@/domain/client.domain";

const persons: PersonEntityDB[] = [
    {
        id: 1,
        name: "NOMBER",
        lastname: "APELLID",
        email: "email@email.com",
        address: "direccion",
        dni: 1213245,
        birthday: new Date(),
        phoneNumber: 1234254,
    }
]

export default function personsMockData(): PersonEntityDB[] {
    return [...persons]
}