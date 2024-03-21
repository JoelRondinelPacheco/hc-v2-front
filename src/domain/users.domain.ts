export type Role = {
    id: number,
    name: string,
    //todo permission??
}

export type Person = {
    id: number,
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

export type Client = {
    id: number,
    person: Person,
}

export type Employee {
    id: number,
    person: Person,
    salary: number,
    password: string //TODO DELETE PASSWORD FROM BACK
}