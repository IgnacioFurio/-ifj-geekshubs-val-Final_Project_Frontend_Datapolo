export const validate = (name, data, required) => {
    switch (name) {
    
    // REAL NAMES
    case "name":
    case "surname":
    case "new_player":

        if (data === "" && required === true) {
        
        return {message: "Please fill the field", valid: false};

        } else if (!/[a-zA-Z]/.test(data)) {

        return {message: "Please use latin characters", valid: false};

        };

        return {message: "", valid: true};

    // USERNAME
    case "user":
    case "username":

        if(data === "" && required === true){

        return {message: "Field 'Club name' required.", valid: false};

        } else if (!/^(?=.{8,20}$).*/.test(data)) {

            return {message: "User name must have a minimum of 8 characters and a maximum of 20 characters.", valid: false};

        } else if (!/^[A-Za-z][A-Za-z0-9_]/.test(data)) {

            return {message: "Your name only can contain alphanumeric characters.", valid: false};

        };

        return {message: "", valid: true};

    // USERNAME
        case "new_name":
        case "new_team":

            if(data === "" && required === true){

            return {message: "Field required.", valid: false};

            } else if (!/^(?=.{8,30}$).*/.test(data)) {

                return {message: "Team name must have a minimum of 8 characters and a maximum of 30 characters.", valid: false};

            } else if (!/^[A-Za-z][A-Za-z0-9_]/.test(data)) {

                return {message: "Team name only can contain alphanumeric characters.", valid: false};

            };

            return {message: "", valid: true};

    // EMAIL
    case "email":

        if (data === "" && required === true) {

        return {message: "Field 'Email' required.", valid: false};
        
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {

        return {message: "Invalid E-mail format.", valid: false};

        }

        return {message: "", valid: true};

    //PASSWORD
    case "password":

        if (data === "" && required === true) {

        return {message: "Field 'Password' required.", valid: false};

        } else if (!/.{8,}$/.test(data)) {

        return {message: "Your password must contain at least eight characters.", valid: false};
        
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data)) {

        return {message: "Your password must contain at least one letter and one number.", valid: false};
        
        };

    return {message: "", valid: true};

    //CONFIRM PASSWORD

    case "password2":

        if (data === "" && required === true) {

            return {message: "Field 'Confirm Password' required", valid: false};
        
        };

    return {message: "", valid: false};
    
    // DATE ONLY YYYY-MM-DD

    case "birth":

        if (data === "" && required === true) {

            return {message: "Field 'Birth Date' required", valid: false};

        }

    return {message: "", valid: true};

    //SEASON FIELD
    case "season":
    case "season_modified":

        if (data === "" && required === true) {
            
            return {message: "Field 'New season' required", valid: false};

        }

    return {message: "", valid: true};

    // SELECTION FIELDS
    case "season_id":

        if(required === false && data === "default"){
            return {message: "", valid: true}
        };

        if(data === "" || data === "default"){
            return {message: "Please choose a season for the game", valid: false}
        };

    return {message: "", valid: true};
    
    case "my_team_id":

        if(required === false && data === "default"){
            return {message: "", valid: true}
        };

        if(data === "" || data === "default"){
            return {message: "Please choose your team for the game", valid: false}
        };

    return {message: "", valid: true};

    case "my_rival_id":

        if(required === false && data === "default"){
            return {message: "", valid: true}
        };

        if(data === "" || data === "default"){
            return {message: "Please choose your rival for the game", valid: false}
        };

    return {message: "", valid: true};

    case "locale":
    return {message: "", valid: true};

    case "friendly":
    return {message: "", valid: true};

    default:
        console.log("Error not recognized");
    }
};