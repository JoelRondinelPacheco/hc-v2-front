import { CategoryEntity } from "../../domain/category.entity";


  const categories: CategoryEntity[] = [
    {
      id: 1,
      name: "Alojamiento MOCK",
      description: "Hoteles, hostales, departamentos, casas de vacaciones y otros tipos de hospedaje."
    },
    {
      id: 2,
      name: "Vuelos",
      description: "Reservas de pasajes aéreos para viajes nacionales e internacionales."
    },
    {
      id: 3,
      name: "Paquetes Turísticos",
      description: "Viajes completos con alojamiento, traslados, actividades y excursiones incluidas."
    },
    {
      id: 4,
      name: "Actividades y Excursiones",
      description: "Tours guiados, visitas culturales, experiencias gastronómicas y otras actividades turísticas."
    },
    {
      id: 5,
      name: "Traslados",
      description: "Servicios de taxi, transfer, alquiler de autos y otros medios de transporte para turistas."
    },
    {
      id: 6,
      name: "Restaurantes",
      description: "Opciones gastronómicas para todos los gustos y presupuestos, desde comida local hasta cocina internacional."
    },
    {
      id: 7,
      name: "Atracciones",
      description: "Museos, monumentos históricos, parques naturales y otros lugares de interés turístico."
    },
    {
      id: 8,
      name: "Eventos",
      description: "Conciertos, festivales, ferias, eventos deportivos y otras actividades culturales y de entretenimiento."
    },
    {
      id: 9,
      name: "Compras",
      description: "Tiendas, mercados, centros comerciales y otros lugares para comprar souvenirs y productos locales."
    },
    {
      id: 10,
      name: "Información Turística",
      description: "Guías, mapas, consejos de viaje y otra información útil para planificar tu viaje."
    }
  ];
  

export function categoriesMockData(): CategoryEntity[] {
    return [...categories];
}