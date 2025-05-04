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

export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(`${apiUrl}/upload-image/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return (res.data.url);
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
}

export const getData = async (url: string) => {
    const response = await api.get(url);

    if(response)
        return response.data;
    else
        return [];
}

export const postData = async (url: string, data: unknown) => {
    const response = await api.post(url,data);

    if(response)
        return response.data;
    else
        return 0;
}

export const updateData = async (url: string, data: unknown) => {
    const response = await api.patch(url,data);

    if(response)
        return response.data;
    else
        return 0;
}

export const deleteData = async (url: string) => {
    const response = await api.delete(url);

    if(response)
        return response.data;
    else
        return 0;
}