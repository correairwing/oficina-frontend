import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Ajuste a URL base conforme necessário
});

export default instance;
