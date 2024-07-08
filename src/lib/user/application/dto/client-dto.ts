import { UpdateClientRequest } from "../../domain/client.entity";

export type ClientDTO = UpdateClientRequest & {
    password: string | null,
    roleId: number | null,
};