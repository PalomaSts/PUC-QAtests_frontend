import React from 'react';
import './App.css';
import { Admin, Resource, ListGuesser } from 'react-admin';
//import simpleRestProvider from 'ra-data-json-server';
import UserList from './components/UserList'; // Componente da listagem de usuários
import UserCreate from './components/UserCreate'; // Componente da criação de usuários
import UserEdit from './components/UserEdit'; // Componente de edição de usuários
import axios from 'axios';

//const dataProvider = simpleRestProvider('http://localhost:5000/api/users'); // Altere para a URL do seu backend

const dataProvider = {
  getList: async (resource, params) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${resource}`);
      // Mapear os dados para substituir _id por id
      const mappedData = response.data.map((item) => ({
        ...item,
        id: item._id, // Renomear _id para id
      }));

      return {
        data: mappedData,
        total: mappedData.length, // Ajuste conforme necessário
      };
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      return { data: [], total: 0 };
    }
  },

  create: async (resource, params) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/${resource}`,
        params.data, // Dados enviados no formulário de criação
      );

      return {
        data: { ...params.data, id: response.data._id }, // Mapeia o _id retornado pelo backend para id
      };
    } catch (error) {
      console.error('Erro ao criar recurso:', error);
      throw new Error('Não foi possível criar o recurso.');
    }
  },

  // Método para editar um usuário
  update: async (resource, params) => {
    const { id, data } = params;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${resource}/${id}`,
        data,
      );
      return { data: { ...response.data, id: response.data._id } };
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw new Error('Erro ao atualizar o usuário');
    }
  },

  getOne: async (resource, params) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${resource}/${params.id}`,
      );
      // Mapeando _id para id
      const item = {
        ...response.data,
        id: response.data._id, // Renomeando _id para id
      };
      return { data: item };
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      return { data: {} };
    }
  },

  delete: async (resource, params) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/${resource}/${params.id}`,
      );
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw error;
    }
  },
};

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
    />{' '}
    {/* O recurso "users" vai usar o UserList */}
  </Admin>
);

export default App;
