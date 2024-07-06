import { EntityBase } from "@/domain/commons.domain";
import { useCases } from "./ports/in/use-cases-input-port";
import { PersistenceOutPort } from "./ports/out/persistence-out-port";
import { InputMapper } from "../adapter/mapper/mapper";

export const createAPIUseCases = <T extends EntityBase, TDriverDTO extends EntityBase, TSave, TUpdate extends EntityBase>(
    repository: PersistenceOutPort<T, TSave, TUpdate>,
    mapper: InputMapper<TDriverDTO, TSave, TUpdate>
): useCases<TDriverDTO, T> => {
    return {
        getAll: () => {
            return repository.getAll();
        },
        getPage: (pageable) => {
            return repository.getPage(pageable)
        },
        getById: (id) => {
            return repository.getById(String(id))
        },
        save: (entity) => {
            if (entity.id === 0) {
                return repository.save(
                    mapper.driverDTOtoSave(entity)
                );
            } else {
                return repository.update(mapper.driverDTOtoUpdate(entity), String(entity.id));
            }
        },
        update: (entity, id) => {
            return repository.update(mapper.driverDTOtoUpdate(entity), String(id));
        },
        delete: (id) => {
            return repository.delete(id);
        }
    }
}