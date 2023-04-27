import axios from "axios";

const root = 'http://127.0.0.1:8000'

//AUTH

export const createUser = async (body) => {

    return await axios.post(`${root}/api/newuser`, body)
};

export const logIn = async (body) => {

    return await axios.post(`${root}/api/login`, body)
};


//USER
export const getUserDataByEmail = async (body) => {
    
    let info = {
        email: body
    }

    return await axios.post(`${root}/api/user`, info)
}

//TEAMS
export const getAllMyTeams = async (body, token) => {

    let userId = {
        'user_id': body
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.post(`${root}/api/get-my-teams`, userId, config)
};

export const createNewTeam = async (body, token) => {

    let data = {
        'user_id': body.user_id,
        'team_name': body.new_team
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/my-teams`, data, config)
};

export const modifyTeam = async (body, token) => {

    let data = {
        'id': body.id,
        'user_id': body.user_id,
        'team_name': body.new_name
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.put(`${root}/api/my-teams`, data, config)
};

export const deleteTeam = async (body, token) => {

    let data = {
        'id': body.id,
    }

    const headers = {
            'Authorization': 'Bearer '+ token,
        }

    return await axios.delete(`${root}/api/my-teams`, {headers, data})
};