import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { cloneDeep } from 'lodash';

class EntityBase {
  public id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  public updatedAt: Date;

  @Exclude()
  public isTypeORMEntity = true;

  public entitySnapshot?;

  loadSnapshotForPartialUpdate?() {
    this.entitySnapshot = cloneDeep(this);
  }

  public getPropertiesToUpdate?() {
    const snapshot = this.entitySnapshot;
    // dirty check:
    //
    // 1. if object is typeorm entity then ignore
    // 2. if object is an object then update
    // 3. if property is native then check
    // 4. if property is date then do a date comparision
    // 4. reset snapshot after update

    const propertiesToIgnore = [
      'isTypeORMEntity',
      'entitySnapshot',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'objectState',
    ];
    const updatedProperties = {};
    const keys = Object.keys(this).filter(
      (key) => !propertiesToIgnore.includes(key)
    );

    for (const key of keys) {
      if (this[key]?.isTypeORMEntity) {
        continue;
      }
      if (
        this[key] instanceof Array &&
        this[key].length &&
        this[key][0]?.isTypeORMEntity
      ) {
        continue;
      }
      if (
        this[key] instanceof Date &&
        this[key].valueOf() === snapshot[key]?.valueOf()
      ) {
        continue;
      }

      if (this[key] instanceof Array) {
        updatedProperties[key] = this[key];
        // }
      } else {
        updatedProperties[key] = this[key];
        snapshot[key] = this[key];
      }
    }
    return updatedProperties;
  }

  constructor(entityBase?: Partial<EntityBase>) {
    if (entityBase) {
      Object.assign(this, entityBase);
    }
  }
}

export { EntityBase };
