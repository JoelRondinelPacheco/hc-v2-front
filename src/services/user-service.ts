import create from "./http-service";

export interface Entity {
    id: number;
    name: string;
}

export default create("/users");