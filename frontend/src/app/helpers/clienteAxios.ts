import axios from "axios";

const URL = 'http://localhost:4000/api'

const clienteAxios = axios.create({
    baseURL: `${URL}`
});

export { clienteAxios }