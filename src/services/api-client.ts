import axios, { CanceledError } from 'axios';

export default axios.create({
    baseURL: "http:/localhost:3000/",
    //todo se puede enviar header
})

export { CanceledError };