import axios, { CanceledError } from "axios";

function getAuthFromLocalStorage (): string {
    const storedItems = localStorage.getItem('auth');
        if (storedItems) {
            let i = JSON.parse(storedItems);
            return i.auth;
        }
        return "";
}

const { HC_V2_BACKEND_BASE_URL } = process.env

export const apiClient =  axios.create({
    baseURL: HC_V2_BACKEND_BASE_URL ? HC_V2_BACKEND_BASE_URL : "http://localhost:8081/api/v1"
})

apiClient.interceptors.request.use((request) => {
    let authToken = getAuthFromLocalStorage();
    if (authToken !== "") {
        request.headers.Authorization = `Bearer ${getAuthFromLocalStorage()}`;
    }
    return request;
    
});

export { CanceledError };