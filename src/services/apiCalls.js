import axios from "axios";

// const root = 'http://127.0.0.1:8000'
const root = 'https://ifj-backend-datapolo-production.up.railway.app'

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

//ADMIN
export const getAllUsers = async (token) => {

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.get(`${root}/api/admin/users`, config)
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

export const getMyTeamsById = async (body, token) => {

    let data = {
        'id': body
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.post(`${root}/api/get-my-teams-by-id`, data, config)
}

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

export const getMyPlayersById = async (body, token) => {

    let data = {
        'id': body
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.post(`${root}/api/get-my-players`, data, config)
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

export const getSeasonsById = async (body, token) => {

    let data = {
        'id': body
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.post(`${root}/api/seasons-by-id`,data, config)
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

export const modifySeason = async (body, token) => {

    let data = {
        'id': body.id,
        'season': body.season_modified
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.put(`${root}/api/seasons`, data, config)
};

export const deleteSeason = async (body, token) => {

    let data = {
        'id': body.id,
    }

    const headers = {
            'Authorization': 'Bearer '+ token,
        }

    return await axios.delete(`${root}/api/seasons`, {headers, data})
};

//GAMES

export const getAllMyGames = async (token) => {

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.get(`${root}/api/my-games`, config)
};

export const createNewGame = async (body, token) => {
    
    let data = {
        "season_id": body.season_id,
        "my_team_id": body.my_team_id,
        "my_rival_id": body.my_rival_id,
        "locale": body.locale,
        "friendly": body.friendly
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/my-games`, data, config)
};

export const modifyGame = async (body, token) => {

    let data = {
        "id": body.id,
        "season_id": body.season_id,
        "my_team_id": body.my_team_id,
        "my_rival_id": body.my_rival_id,
        "locale": body.locale,
        "friendly": body.friendly
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.put(`${root}/api/my-games`, data, config)
};

export const deleteGame = async (body, token) => {

    let data = {
        'id': body.id,
    }

    const headers = {
            'Authorization': 'Bearer '+ token,
        }

    return await axios.delete(`${root}/api/my-games`, {headers, data})
};

//GOALS
export const getAllMyGoals = async (token) => {

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.get(`${root}/api/my-goals`, config)
};

export const getAllMyGoalsByTeamIdAndGameId = async (body, token) => {
    
    let data = {
        "team_id": body.team_id,
        "game_id": body.game_id
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/my-goals-by-team-id-game-id`, data, config)
};

export const createNewGoal = async (body, token) => {
    
    let data = {
        "team_id": body.team_id,
        "game_id": body.game_id,
        "player_id": body.player_id,
        "zone": body.zone,
        "player_nº": body.player_nº
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/my-goals`, data, config)
};

export const modifyGoal = async (body, token) => {

    let data = {
        "id": body.id,
        "team_id": body.team_id,
        "game_id": body.game_id,
        "player_id": body.player_id,
        "zone": body.zone,
        "player_nº": body.player_nº
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    }

    return await axios.put(`${root}/api/my-goals`, data, config)
};

export const deleteGoal = async (body, token) => {

    let data = {
        'id': body
    }

    const headers = {
            'Authorization': 'Bearer '+ token,
        }

    return await axios.delete(`${root}/api/my-goals`, {headers, data})
};

//STADISTICS

export const getAllMyGoalStadistics = async (body, token) => {

    let data = {    
        "team_id": body.team_id,
        "rival_id": body.rival_id,
        "season_id": body.season_id,
        "locale": body.locale
    }

    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,  
        }
    }

    return await axios.post(`${root}/api/my-goals-stadistics`, data, config)
};