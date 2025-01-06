import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  CreateButton,
  DeleteButton,
  Button,
} from 'react-admin';

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [deleting, setDeleting] = useState(null); // Estado para controlar a exclusão

  const handleDelete = (id) => {
    setDeleting(id); // Marca o usuário a ser deletado
  };

  const cancelDelete = () => {
    setDeleting(null); // Cancela a exclusão
  };

  // UseEffect para buscar os usuários inicialmente
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []); // Apenas na montagem do componente

  return (
    <List
      {...props}
      empty={
        <div>
          <div data-testid="no-users-message">No users yet.</div>
          <CreateButton />
          <DeleteButton />
        </div>
      }
      data={users}
    >
      <Datagrid>
        <TextField label="Name" source="name" />
        <EmailField label="Email" source="email" />
        <EditButton />
        {deleting !== null ? (
          <>
            <Button onClick={() => cancelDelete()} label="Cancel" />
            {/* Aqui, você pode adicionar a confirmação de exclusão */}
          </>
        ) : (
          <DeleteButton
            label="Delete"
            aria-label="delete-user"
            onClick={() => handleDelete()}
          />
        )}
      </Datagrid>
    </List>
  );
};

export default UserList;
