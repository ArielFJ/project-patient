import { BaseEntity } from 'shared/interfaces/BaseEntity';

// eslint-disable-next-line
interface IBaseEntityService<T extends BaseEntity> {
    getAll(): Promise<T[]>;
    
    getById(id: number): Promise<T>;
    
    create(newValues: T): Promise<T>;
    
    delete(id: number): Promise<void>;
    
    update(id: number, newValues: T): Promise<void>;
}

export default IBaseEntityService;