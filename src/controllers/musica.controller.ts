import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {Musica} from '../models';
import {MusicaRepository} from '../repositories';
import {inject} from '@loopback/core';

export class MusicaController {
  constructor(
    @repository(MusicaRepository)
    public musicaRepository: MusicaRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) {}

  @post('/musicas')
  @response(200, {
    description: 'Musica model instance',
    content: {'application/json': {schema: getModelSchemaRef(Musica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Musica, {
            title: 'NewMusica',
            exclude: ['id'],
          }),
        },
      },
    })
    musica: Omit<Musica, 'id'>,
  ): Promise<Musica> {
    return this.musicaRepository.create(musica);
  }

  @get('/musicas/count')
  @response(200, {
    description: 'Musica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Musica) where?: Where<Musica>): Promise<Count> {
    return this.musicaRepository.count(where);
  }

  @get('/musicas')
  @response(200, {
    description: 'Array of Musica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Musica, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Musica) filter?: Filter<Musica>): Promise<Musica[]> {
    const Data = this.musicaRepository.find(filter);

    this.response.set('Access-Control-Expose-Headers', 'X-Total-Count');
    this.response.set('x-total-count', (await Data).length.toString());

    return Data;
  }

  @patch('/musicas')
  @response(200, {
    description: 'Musica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Musica, {partial: true}),
        },
      },
    })
    musica: Musica,
    @param.where(Musica) where?: Where<Musica>,
  ): Promise<Count> {
    return this.musicaRepository.updateAll(musica, where);
  }

  @get('/musicas/{id}')
  @response(200, {
    description: 'Musica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Musica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Musica, {exclude: 'where'})
    filter?: FilterExcludingWhere<Musica>,
  ): Promise<Musica> {
    return this.musicaRepository.findById(id, filter);
  }

  @patch('/musicas/{id}')
  @response(204, {
    description: 'Musica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Musica, {partial: true}),
        },
      },
    })
    musica: Musica,
  ): Promise<void> {
    await this.musicaRepository.updateById(id, musica);
  }

  @put('/musicas/{id}')
  @response(204, {
    description: 'Musica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() musica: Musica,
  ): Promise<void> {
    await this.musicaRepository.replaceById(id, musica);
  }

  @del('/musicas/{id}')
  @response(204, {
    description: 'Musica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.musicaRepository.deleteById(id);
  }
}
