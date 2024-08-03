import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE,
    baseURL: "http://localhost:198/api/v1/",
    // baseURL: "http://172.104.189.80:3003/api/v1/",
    timeout: 1000,
})



export default axiosInstance;


export const getInfoFeNo = (url) => axiosInstance.get(url);
export const postInfo = (url,data) => axiosInstance.post(url,data);
export const editFormRequest = (url, data) => axiosInstance.put(url, data);
export const deleteFormRequest = (url, data) => axiosInstance.delete(url, data);
export const getParam = () => axiosInstance.get('ap_params', { params: { limit: 100 } })