import axios from 'axios';
import { BASE_URL } from '@env';
import { AuthContext } from '../component/context';

const api = axios.create({
    baseURL: BASE_URL,
    // headers: {
        
    // }
})

export default api;