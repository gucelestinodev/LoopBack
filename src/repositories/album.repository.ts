import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Album, AlbumRelations, Musica} from '../models';
import {MusicaRepository} from './musica.repository';

export class AlbumRepository extends DefaultCrudRepository<
  Album,
  typeof Album.prototype.id,
  AlbumRelations
> {

  public readonly musicas: HasManyRepositoryFactory<Musica, typeof Album.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MusicaRepository') protected musicaRepositoryGetter: Getter<MusicaRepository>,
  ) {
    super(Album, dataSource);
    this.musicas = this.createHasManyRepositoryFactoryFor('musicas', musicaRepositoryGetter,);
    this.registerInclusionResolver('musicas', this.musicas.inclusionResolver);
  }
}
