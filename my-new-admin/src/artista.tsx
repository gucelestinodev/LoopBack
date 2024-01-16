import { List, Datagrid, TextField, ReferenceField } from "react-admin";

export const ArtistaList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="artistas" reference="artistas" link="show" />
      <TextField source="id" />
      <TextField source="nome" />
      <TextField source="pais" />
    </Datagrid>
  </List>
);
