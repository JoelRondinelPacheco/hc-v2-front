import servicesMockData from "@/lib/service/infrastructure/service-mock-db";
import { mockRepository } from "@/lib/common/infrastructure/mock-repository";

export const createServiceMockRepository = () => mockRepository(servicesMockData());