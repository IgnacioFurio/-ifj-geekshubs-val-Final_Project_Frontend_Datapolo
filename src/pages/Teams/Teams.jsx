import React, { useEffect, useState } from 'react';
//redux
import { useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { getAllMyTeams } from '../../services/apiCalls';

export const Teams = () => {

    const userDataRdx = useSelector(userData);

    //HOOKS
    const [teamData, setTeamData] = useState([]);


    //
    // USEEFFECT
    useEffect(() => {
        console.log(teamData);
        console.log(userDataRdx);
    },[userDataRdx]);

    useEffect(() => {

        if(teamData.length === 0){

            getAllMyTeams(userDataRdx.userCredentials.user.id ,userDataRdx.userCredentials.token)
                .then(
                    result => {
                        setTeamData(result.data.data)
                        }
                )
                .catch(error => console.log(error));

        };

    },[userDataRdx]);

    return (
        <div>Teams</div>
    )
}
