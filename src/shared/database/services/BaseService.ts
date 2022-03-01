import { BaseEntity } from "../../interfaces/BaseEntity";
import { DeepPartial, getRepository, Repository } from "typeorm";

export type ObjectType<T> = { new (): T } | Function;

export default abstract class BaseService<TEntity extends BaseEntity> {
  
  protected repository: Repository<TEntity>;
  
  public constructor(type: ObjectType<TEntity>) {
    this.repository = getRepository(type);
  }

  abstract updateEntityProperties(entity: TEntity, newEntityProperties: TEntity): void;

  getAll(): Promise<TEntity[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<TEntity | undefined> {
    return this.repository.findOne(id);
  }

  create(entity: TEntity): Promise<TEntity> {
    return this.repository.save(entity as DeepPartial<TEntity>);
  }

  async update(id:number, newEntityValues: TEntity): Promise<void> {
    const soughtEntity = await this.repository.findOne(id);
    if (!soughtEntity) return;
    
    this.updateEntityProperties(soughtEntity, newEntityValues);

    await this.repository.save((soughtEntity as DeepPartial<TEntity>));
  } 

  async delete(IDs: number[]): Promise<TEntity[]> {
    let entities = await this.repository.findByIds(IDs);
    return await this.repository.remove(entities);
  }
}