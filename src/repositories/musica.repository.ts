import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Musica, MusicaRelations} from '../models';

export class MusicaRepository extends DefaultCrudRepository<
  Musica,
  typeof Musica.prototype.id,
  MusicaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Musica, dataSource);
  }
}
