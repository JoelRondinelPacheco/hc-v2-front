import { PaymentMethodEntity } from "../../domain/payment-method.entity";
import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/category/domain/category.entity";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";


export const createPaymentMethodMockRepository = (data: PaymentMethodEntity[], mapper: OutputMapper<PaymentMethodEntity, CreateCategoryRequest, UpdateCategoryRequest>) => mockRepository(data, mapper);