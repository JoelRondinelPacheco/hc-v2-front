import { EntityBase } from "./commons.domain"

export type Role = EntityBase & {
    name: string,
    //todo permission??
}

export type PersonBase = EntityBase & {
    name: string,
    lastname: string,
    email: string,
    address: string,
    dni: number,
    birthday: Date,
    phoneNumber: number,
    
}

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