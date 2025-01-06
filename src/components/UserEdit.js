import React, { useEffect, useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  Button,
} from 'react-admin';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = (props) => {
  const { id } = useParams(); // Pega o id da URL
  const navigate = useNavigate(); // Usado para navegar de volta à listagem
  const [originalData, setOriginalData] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${id}`,
          );
          setOriginalData(response.data);
          setUserData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setError('Erro ao carregar os dados do usuário');
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCancel = () => {
    navigate('/users'); // Redireciona de volta à página de listagem
  };

  return (
    <Edit {...props}>
      <SimpleForm
        record={userData}
        toolbar={
          <Toolbar>
            <SaveButton />
            <Button label="Cancel" onClick={handleCancel} />
          </Toolbar>
        }
      >
        <TextInput label="Name" source="name" value={userData.name} />
        <TextInput label="Email" source="email" value={userData.email} />
        <TextInput
          label="Password"
          source="password"
          value={userData.password}
        />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
