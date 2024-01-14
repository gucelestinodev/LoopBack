import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Album,
  Musica,
} from '../models';
import {AlbumRepository} from '../repositories';

export class AlbumMusicaController {
  constructor(
    @repository(AlbumRepository) protected albumRepository: AlbumRepository,
  ) { }

  @get('/albums/{id}/musicas', {
    responses: {
      '200': {
        description: 'Array of Album has many Musica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Musica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Musica>,
  ): Promise<Musica[]> {
    return this.albumRepository.musicas(id).find(filter);
  }

  @post('/albums/{id}/musicas', {
    responses: {
      '200': {
        description: 'Album model instance',
        content: {'application/json': {schema: getModelSchemaRef(Musica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Album.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Musica, {
            title: 'NewMusicaInAlbum',
            exclude: ['id'],
            optional: ['idAlbum']
          }),
        },
      },
    }) musica: Omit<Musica, 'id'>,
  ): Promise<Musica> {
    return this.albumRepository.musicas(id).create(musica);
  }

  @patch('/albums/{id}/musicas', {
    responses: {
      '200': {
        description: 'Album.Musica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Musica, {partial: true}),
        },
      },
    })
    musica: Partial<Musica>,
    @param.query.object('where', getWhereSchemaFor(Musica)) where?: Where<Musica>,
  ): Promise<Count> {
    return this.albumRepository.musicas(id).patch(musica, where);
  }

  @del('/albums/{id}/musicas', {
    responses: {
      '200': {
        description: 'Album.Musica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Musica)) where?: Where<Musica>,
  ): Promise<Count> {
    return this.albumRepository.musicas(id).delete(where);
  }
}
