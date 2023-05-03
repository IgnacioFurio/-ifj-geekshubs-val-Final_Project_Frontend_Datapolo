import axios from "axios";

const root = 'http://127.0.0.1:8000'

//AUTH

export const createUser = async (body) => {

    return await axios.post(`${root}/api/newuser`, body)
};

export const logIn = async (body) => {

    return await axios.post(`${root}/api/login`, body)
};

export const logoutApi = async(token, body) => {

    body = null

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.post(`${root}/api/logout`,body, config)
}

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


//PLAYERS

export const getAllMyPlayers = async (body, token) => {

    let userId = {
        'user_id': body
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.post(`${root}/api/get-my-players`, userId, config)
};

export const createNewPlayer = async (body, token) => {
    
    let data = {
        'user_id': body.user_id,
        'name': body.new_player
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/my-players`, data, config)
};

export const modifyPlayer = async (body, token) => {

    let data = {
        'id': body.id,
        'user_id': body.user_id,
        'name': body.new_name
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.put(`${root}/api/my-players`, data, config)
};

export const deletePlayer = async (body, token) => {

    let data = {
        'id': body.id,
    }

    const headers = {
            'Authorization': 'Bearer '+ token,
        }

    return await axios.delete(`${root}/api/my-players`, {headers, data})
};

//SEASONS
export const getAllSeasons = async (token) => {

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.get(`${root}/api/seasons`, config)
};


export const createNewSeason = async (body, token) => {
    
    let data = {
        'season': body.season
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/seasons`, data, config)
};