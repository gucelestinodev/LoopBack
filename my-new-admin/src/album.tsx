import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  ReferenceField,
} from "react-admin";

export const AlbumList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <ReferenceField source="albums" reference="albums" link="show" />
        <TextField source="id" />
        <TextField source="nome" />
      </Datagrid>
    </List>
  );
};
