import { EntityBase } from "./commons.domain"

export type Role = EntityBase & {
    name: string,
    //todo permission??
}

export type Person = EntityBase & {
    name: string,
    lastname: string,
    email: string,
    address: string,
    dni: number,
    birthday: Date,
    nationality: string,
    phoneNumber: number,
    role: Role,
}

export type Client = EntityBase & {
    person: Person,
}

export type Employee = EntityBase & {
    person: Person,
    salary: number,
    password: string //TODO DELETE PASSWORD FROM BACK
}