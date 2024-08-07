import { EntityBase } from "../../domain/entities/entity-base";

export interface InputMapper<TDriverDTO extends EntityBase, TSave, TUpdate> {
    driverDTOtoSave: (dto: TDriverDTO) => TSave,
    driverDTOtoUpdate: (dto: TDriverDTO) => TUpdate,
}

export interface OutputMapper<TData, TSave, TUpdate> {
    saveToEntity: (dto: TSave, id: number) => TData;
    updateToEntity: (dto: TUpdate) => TData;
}