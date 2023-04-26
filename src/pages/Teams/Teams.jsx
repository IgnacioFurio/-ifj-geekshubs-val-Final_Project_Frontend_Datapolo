import React, { useEffect, useState } from 'react';
//redux
import { useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { getAllMyTeams } from '../../services/apiCalls';
//render
import { TableTeams } from '../../common/TableTeams/TableTeams';

export const Teams = () => {

    const userDataRdx = useSelector(userData);

    //HOOKS
    const [teamData, setTeamData] = useState([]);


    //
    // USEEFFECT
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

    //FUNCTIONS

    return (
        <>
            {teamData.map(data =>
                    {
                        return <TableTeams key={data.id} id={data.id} teamName={data.team_name} clickFunction={()=>{}}/>
                    }
                )
            }
        </>
    )
}
