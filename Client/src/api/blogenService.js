import axios from 'axios'

export const baseRequest = axios.create({
    baseURL: "http://localhost:8082/"
})

export const authenticatedRequest = axios.create({
    baseURL: "http://localhost:8082",
    headers:{
        'Authorization': 'Bearer '+ sessionStorage.getItem('authToken')
    }
})