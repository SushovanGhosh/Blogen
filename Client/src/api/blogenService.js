import axios from 'axios'
import Cookie from 'js-cookie'
export const baseRequest = axios.create({
    baseURL: "http://localhost:8085/"
})

export const authenticatedRequest = () =>{
    return axios.create({
        baseURL: "http://localhost:8085",
        headers:{
            'Authorization': `Bearer ${Cookie.get('authToken')}`,
            'Content-Type': undefined
        }
    });
}