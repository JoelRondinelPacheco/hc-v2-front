import create from "./http-service";


export type Category = {
    id: number,
    name: string,
    description: string
}

export default create("/category")