import axios, { CanceledError } from "axios";


export default axios.create({
    baseURL: "http://localhost:8081/api/v1",
    //todo se puede enviar header
})

export { CanceledError };