import { Admin, Resource, ShowGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { AlbumList } from "./album";
import { MusicasList } from "./musicas";
import { ArtistaList } from "./artista";

const dataProvider = jsonServerProvider("http://localhost:3000");

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="musicas" list={MusicasList} />
    <Resource name="albums" list={AlbumList} />
    <Resource name="artistas" list={ArtistaList} />
  </Admin>
);
