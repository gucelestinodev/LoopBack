import {Entity, model, property, hasMany} from '@loopback/repository';
import {Musica} from './musica.model';

@model({settings: {strict: false}})
export class Album extends Entity {
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
    type: 'number',
  })
  idArtista?: number;

  @hasMany(() => Musica, {keyTo: 'idAlbum'})
  musicas: Musica[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Album>) {
    super(data);
  }
}

export interface AlbumRelations {
  // describe navigational properties here
}

export type AlbumWithRelations = Album & AlbumRelations;
