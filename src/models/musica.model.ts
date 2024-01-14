import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Musica extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'number',
  })
  idArtista?: number;

  @property({
    type: 'number',
  })
  datadelancamento?: number;

  @property({
    type: 'number',
  })
  idAlbum?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Musica>) {
    super(data);
  }
}

export interface MusicaRelations {
  // describe navigational properties here
}

export type MusicaWithRelations = Musica & MusicaRelations;
