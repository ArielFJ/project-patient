import IBaseEntityService from 'renderer/interfaces/IBaseEntityService';
import { ChannelMethods } from 'shared/constants';
import { BaseEntity } from 'shared/interfaces/BaseEntity';

const { ipcRenderer } = window.require('electron');

abstract class BaseService<TEntity extends BaseEntity> implements IBaseEntityService<TEntity> {
  abstract channel: Record<string, string>;

  getAll(): Promise<TEntity[]> {
    return ipcRenderer.invoke(this.channel[ChannelMethods.getAll]);
  }

  getById(id: number): Promise<TEntity> {
    return ipcRenderer.invoke(this.channel[ChannelMethods.getOne], id);
  }

  create(newValues: TEntity): Promise<TEntity> {
    return ipcRenderer.invoke(this.channel[ChannelMethods.create], newValues);
  }

  delete(id: number): Promise<void> {
    return ipcRenderer.invoke(this.channel[ChannelMethods.delete], id);
  }

  update(id: number, newValues: TEntity): Promise<void> {
    return ipcRenderer.invoke(this.channel[ChannelMethods.update], id, newValues);
  }
}

export default BaseService;
