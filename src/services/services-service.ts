import create from "./http-service";

export type ServiceEntity = {
    id: number,
    price: number | string,
    code: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    category: {
        id: number,
        name: string,
        description: string,
    }
}

export default create("/service");