import axios, {AxiosRequestConfig} from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";

const fetchClient = () => {
    const defaultOptions: AxiosRequestConfig = {
        baseURL: API_BASE_URL,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    const instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};
const request = fetchClient();

export default request;
