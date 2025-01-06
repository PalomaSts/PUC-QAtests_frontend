import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <TextInput source="email" label="Email" />
      <TextInput source="password" label="Password" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
