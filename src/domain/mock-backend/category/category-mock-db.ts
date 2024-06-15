import { CategoryEntity } from "@/domain/category.domain";

const categories: CategoryEntity[] = [
    {
        id: 1,
        name: "Alquiler",
        description: "Alquiler de habitaciones"
    },
    {
        id: 2,
        name: "Entradas",
        description: "Venta de entradas de conciertos"
    },
    {
        id: 3,
        name: "Transporte",
        description: "Alquier de transportes"
    },
    {
        id: 2,
        name: "Viajes",
        description: "Venta de pasajes para viajes"
    }

]

export function categoriesMockData(): CategoryEntity[] {
    return [...categories];
}