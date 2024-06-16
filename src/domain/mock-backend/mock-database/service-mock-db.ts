import { ServiceEntity } from "@/domain/service.domain";

const services: ServiceEntity[] = [
  {
    id: 1,
    name: "Tour guiado por la ciudad",
    price: 3000,
    description:
      "Un recorrido a pie por los principales lugares de interés de la ciudad, con un guía experto.",
    category: {
      id: 1,
      name: "Actividades y Excursiones",
      description:
        "Tours guiados, visitas culturales, experiencias gastronómicas y otras actividades turísticas.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 2,
    name: "Visita a un viñedo y degustación de vinos",
    price: 2500,
    description:
      "Un tour por un viñedo, con degustación de vinos y almuerzo incluido.",
    category: {
      id: 1,
      name: "Actividades y Excursiones",
      description:
        "Tours guiados, visitas culturales, experiencias gastronómicas y otras actividades turísticas.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 3,
    name: "Clases de cocina local",
    price: 4000,
    description:
      "Aprende a preparar platos típicos de la región en una clase de cocina con un chef local.",
    category: {
      id: 1,
      name: "Actividades y Excursiones",
      description:
        "Tours guiados, visitas culturales, experiencias gastronómicas y otras actividades turísticas.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 4,
    name: "Alquiler de bicicletas",
    price: 500,
    description: "Alquila una bicicleta y explora la ciudad a tu ritmo.",
    category: {
      id: 5,
      name: "Traslados",
      description:
        "Servicios de taxi, transfer, alquiler de autos y otros medios de transporte para turistas.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 5,
    name: "Transfer al aeropuerto",
    price: 1500,
    description: "Un traslado cómodo y seguro desde tu hotel al aeropuerto.",
    category: {
      id: 5,
      name: "Traslados",
      description:
        "Servicios de taxi, transfer, alquiler de autos y otros medios de transporte para turistas.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 6,
    name: "Cena en un restaurante tradicional",
    price: 2000,
    description:
      "Disfruta de una cena deliciosa en un restaurante con ambiente local.",
    category: {
      id: 6,
      name: "Restaurantes",
      description:
        "Opciones gastronómicas para todos los gustos y presupuestos, desde comida local hasta cocina internacional.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },

  {
    id: 7,
    name: "Entrada al museo local",
    price: 800,
    description: "Conoce la historia y cultura de la región en un museo local.",
    category: {
      id: 7,
      name: "Atracciones",
      description:
        "Museos, monumentos históricos, parques naturales y otros lugares de interés turístico.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 8,
    name: "Excursión a un parque natural",
    price: 3500,
    description:
      "Un día de senderismo, observación de aves o simplemente disfrutando de la naturaleza en un parque nacional o reserva natural.",
    category: {
      id: 1,
      name: "Actividades y Excursiones",
      description:
        "Tours guiados, visitas culturales, experiencias gastronómicas y otras actividades turísticas.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 9,
    name: "Visita a un espectáculo cultural",
    price: 2000,
    description:
      "Disfruta de un concierto, una obra de teatro, un ballet o cualquier otra manifestación cultural local.",
    category: {
      id: 8,
      name: "Eventos",
      description:
        "Conciertos, festivales, ferias, eventos deportivos y otras actividades culturales y de entretenimiento.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 10,
    name: "Tour de compras por el mercado local",
    price: 1500,
    description:
      "Recorre un mercado local y descubre productos artesanales, souvenirs y productos frescos.",
    category: {
      id: 9,
      name: "Compras",
      description:
        "Tiendas, mercados, centros comerciales y otros lugares para comprar souvenirs y productos locales.",
    },
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
];

export default function servicesMockData(): ServiceEntity[] {
  return [...services];
}
