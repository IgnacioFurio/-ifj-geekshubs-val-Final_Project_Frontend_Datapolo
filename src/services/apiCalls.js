import axios from "axios";

const root = 'http://127.0.0.1:8000'

export const createUser = async (body) => {

    return await axios.post(`${root}/api/newuser`, body)
};