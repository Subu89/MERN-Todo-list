import axios from 'axios';
import { BASE_URL } from '../utils/index';

const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    const response = await axios.get(`${BASE_URL}/rest/todos`, config);
    return response.data;
};

const addTodos = async (todo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const bodyData = {
        todo: todo,
    };
    const response = await axios.post(
        `${BASE_URL}/rest/todos`,
        bodyData,
        config,
    );
    return response.data;
};

const deleteTodos = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(
        `${BASE_URL}/rest/todos/${id}`,
        config,
    );
    return response.data;
};

const updateTodos = async (updatedData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const bodyData = {
        todo: updatedData.todoText,
    }
    const response = await axios.delete(
        `${BASE_URL}/rest/todos/${updatedData.updateTodoId}`,
        bodyData,
        config,
    );
    return response.data;
};

const todoService = {
    getTodos,
    addTodos,
    updateTodos,
    deleteTodos,
};

export default todoService;