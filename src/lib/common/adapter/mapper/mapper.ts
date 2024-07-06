import { EntityBase } from "@/domain/commons.domain";

export interface InputMapper<TDriverDTO extends EntityBase, TSave, TUpdate> {
    driverDTOtoSave: (dto: TDriverDTO) => TSave,
    driverDTOtoUpdate: (dto: TDriverDTO) => TUpdate,

}

export interface OutputMapper<TData, TSave, TUpdate> {
    saveToEntity: (dto: TSave) => TData;
    udapteToEntity: (dto: TUpdate) => TData;
}