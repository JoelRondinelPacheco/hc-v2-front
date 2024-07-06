import { EntityBase } from "../../common/domain/entities/entity-base";

export interface PersonInfo { 
    name: string,
    lastname: string,
    email: string,
    address: string,
    dni: number,
    birthday: Date,
    phoneNumber: number,
}

export interface PersonEntity extends PersonInfo, EntityBase {}