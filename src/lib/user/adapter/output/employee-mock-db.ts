import { EmployeeEntity } from "../../domain/employee.entity";

const employees: EmployeeEntity[] = [
    {
      id: 1,
      person: {
        id: 1,
        name: "Juan",
        lastname: "Pérez",
        email: "juan.perez@email.com",
        address: "Calle 123, 456, Paraná, Entre Ríos, Argentina",
        dni: 12345678,
        birthday: new Date("1980-01-01"),
        phoneNumber: 1234567890
      },
      salary: 35000
    },
    {
      id: 2,
      person: {
        id: 2,
        name: "María",
        lastname: "García",
        email: "maria.garcia@email.com",
        address: "Avenida 789, 1011, Rosario, Santa Fe, Argentina",
        dni: 987654321,
        birthday: new Date("1990-02-02"),
        phoneNumber: 9876543210
      },
      salary: 42000
    },
    {
      id: 3,
      person: {
        id: 3,
        name: "Pedro",
        lastname: "López",
        email: "pedro.lopez@email.com",
        address: "Calle Mayor, 1, Córdoba, Córdoba, Argentina",
        dni: 345678901,
        birthday: new Date("2000-03-03"),
        phoneNumber: 3456789012
      },
      salary: 28000
    },
    {
      id: 4,
      person: {
        id: 4,
        name: "Ana",
        lastname: "Martínez",
        email: "ana.martinez@email.com",
        address: "Paseo del Mar, 56, Mar del Plata, Buenos Aires, Argentina",
        dni: 789012345,
        birthday: new Date("1970-04-04"),
        phoneNumber: 7890123456
      },
      salary: 50000
    }
  ];

export default function employeesMockData(): EmployeeEntity[] {
    return [...employees]
}