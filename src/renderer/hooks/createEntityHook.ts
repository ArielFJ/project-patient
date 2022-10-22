import { IBaseEntityService } from 'renderer/interfaces';
import { BaseEntity } from 'shared/interfaces/BaseEntity';

export function createEntityHook<T extends BaseEntity>(service: IBaseEntityService<T>) {
  const getAll = () => service.getAll();
  const getById = (id: number) => service.getById(id);
  const create = (entity: T) => service.create(entity);
  const update = (id: number, entity: T) => service.update(id, entity);
  const remove = (id: number) => service.delete(id);

  return { getAll, getById, create, update, remove };
}
