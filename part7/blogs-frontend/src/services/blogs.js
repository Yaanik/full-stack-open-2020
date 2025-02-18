import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    };

    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
};

const update = async(id, newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return res.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.delete(`${baseUrl}/${id}`, config);
    return res.data;
};

const getComments = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}/comments`)
    return res.data;
}

const addComment = async (id, newObject) => {
    const res = await axios.post(`${baseUrl}/${id}/comments`, newObject);
    return res.data
}

export default {
    getAll,
    setToken,
    create,
    update,
    remove,
    addComment,
    getComments
};