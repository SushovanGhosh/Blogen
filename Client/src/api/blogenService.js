import axios from 'axios'

export const baseRequest = axios.create({
    baseURL: "http://localhost:8085/"
})

export const authenticatedRequest = axios.create({
    baseURL: "http://localhost:8085",
    headers:{
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        'Content-Type': undefined
    }
})