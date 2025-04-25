import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const api = axios.create({
    baseURL: apiUrl
})


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        //alert(message)
    }
)

export const getData = async (url: string) => {
    const response = await api.get(url);

    if(response)
        return response.data;
    else
        return [];
}

export const postData = async (url: string, data: any) => {
    const response = await api.post(url,data);

    if(response)
        return response.data;
    else
        return 0;
}