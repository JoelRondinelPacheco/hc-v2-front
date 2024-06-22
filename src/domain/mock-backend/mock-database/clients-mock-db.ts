import { ClientEntity } from "@/domain/client.domain";

const clients: ClientEntity[] = [
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
      phoneNumber: 1234567890,
    },
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
      phoneNumber: 9876543210,
    },
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
      phoneNumber: 3456789012,
    },
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
      phoneNumber: 7890123456,
    },
  },
  {
    id: 5,
    person: {
      id: 5,
      name: "Carlos",
      lastname: "Gómez",
      email: "carlos.gomez@email.com",
      address: "Avenida Libertad, 100, Tucumán, Tucumán, Argentina",
      dni: 567890123,
      birthday: new Date("1985-05-05"),
      phoneNumber: 5678901234,
    },
  },

  {
    id: 6,
    person: {
      id: 6,
      name: "Sofía",
      lastname: "Ruiz",
      email: "sofia.ruiz@email.com",
      address: "Calle Belgrano, 321, Santa Fe, Santa Fe, Argentina",
      dni: 123456789,
      birthday: new Date("1995-06-06"),
      phoneNumber: 1234567890,
    },
  },
  {
    id: 7,
    person: {
      id: 7,
      name: "Andrés",
      lastname: "López",
      email: "andres.lopez@email.com",
      address: "Avenida Independencia, 432, Mendoza, Mendoza, Argentina",
      dni: 987654321,
      birthday: new Date("2005-07-07"),
      phoneNumber: 9876543210,
    },
  },
  {
    id: 8,
    person: {
      id: 8,
      name: "Natalia",
      lastname: "Gómez",
      email: "natalia.gomez@email.com",
      address: "Calle San Martín, 543, La Rioja, La Rioja, Argentina",
      dni: 345678901,
      birthday: new Date("1960-08-08"),
      phoneNumber: 3456789012,
    },
  },
  {
    id: 9,
    person: {
      id: 9,
      name: "Marcos",
      lastname: "Rodríguez",
      email: "marcos.rodriguez@email.com",
      address:
        "Avenida Roca, 654, Santiago del Estero, Santiago del Estero, Argentina",
      dni: 789012345,
      birthday: new Date("1975-09-09"),
      phoneNumber: 7890123456,
    },
  },
  {
    id: 10,
    person: {
      id: 10,
      name: "Paula",
      lastname: "Sánchez",
      email: "paula.sanchez@email.com",
      address: "Calle Sarmiento, 765, Corrientes, Corrientes, Argentina",
      dni: 567890123,
      birthday: new Date("1990-10-10"),
      phoneNumber: 5678901234,
    },
  },
];

export default function clientsMockData() {
  return structuredClone(clients);
}
