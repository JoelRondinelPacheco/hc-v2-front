import { EntityBase } from "./commons.domain"

export type Role = EntityBase & {
    name: string,
    //todo permission??
}

type PersonInfo = { 
    name: string,
    lastname: string,
    email: string,
    address: string,
    dni: number,
    birthday: Date,
    phoneNumber: number,
}

export type PersonBase = EntityBase & PersonInfo;

export type PersonEntity = PersonBase

export type PersonEntityDB = PersonBase

export type ClientEntity = EntityBase & {
    person: PersonEntity,
}

export type ClientEntityDB = EntityBase & {
    fk_person: number
}


export type EmployeeEntity = EntityBase & {
    person: PersonEntity,
    salary: number,
}

export type EmployeeEntityDB = EntityBase & {
    fk_person: number,
    salary: number
}


//todo refactor
export type CreateClientRequest = { 
    name: string,
    lastname: string,
    email: string,
    address: string,
    dni: number,
    birthday: Date,
    phoneNumber: number,
}
export type CreateClientResponse = {
    response: string,
}