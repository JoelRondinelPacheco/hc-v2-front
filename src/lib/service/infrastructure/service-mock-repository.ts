import servicesMockData from "@/domain/mock-backend/mock-database/service-mock-db";
import { mockRepository } from "@/lib/common/infrastructure/mock-repository";

export const createServiceMockRepository = () => mockRepository(servicesMockData());