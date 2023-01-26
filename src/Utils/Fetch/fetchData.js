import axios from "../../api/axios";


export const getRequest = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { 'Authorization': `Bearer:${token}` },
    });

    return res;

}

export const postRequest = async (url, data, token) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: { 'Authorization': `Bearer:${token}` },
    });

    return res;


}
