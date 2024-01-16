import { List, Datagrid, TextField, ReferenceField } from "react-admin";

export const MusicasList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="musicas" reference="musicas" link="show" />
      <TextField source="id" />
      <TextField source="nome" />
      <TextField source="genero" />
    </Datagrid>
  </List>
);
