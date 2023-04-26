import React, { useEffect, useState } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { getAllMyTeams } from '../../services/apiCalls';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TableTeams } from '../../common/TableTeams/TableTeams';
import spiner from '../../assets/waterpolo.png'

export const Teams = () => {

    const userDataRdx = useSelector(userData);

    const updateInfo = useSelector(bringData);

    const dispatch = useDispatch();

    //HOOKS
    const [teamData, setTeamData] = useState([]);


    //
    // USEEFFECT
    useEffect(() => {

        if(teamData.length === 0){

            dispatch(reload({updatedData: {}}))

            getAllMyTeams(userDataRdx.userCredentials.user.id ,userDataRdx.userCredentials.token)
                .then(
                    result => {
                        setTeamData(result.data.data)
                        }
                )
                .catch(error => console.log(error));

        };

    },[teamData]);

    useEffect(() => {

        if(updateInfo?.updatedData?.success){

            setTeamData([]);

        };
    });

    //FUNCTIONS

    return (
        <>
            {
                teamData.length === 0 ? (
                    <>
                        <img src={spiner} className="spinnerDesign m-5 " alt="spinner"/>
                        <h3 className='font fw-bold'>Looking for your information.</h3>
                    </>
                ) : (
                    <>
                    {teamData.map(data =>
                            {
                                return <TableTeams key={data.id} id={data.id} teamName={data.team_name}/>
                            }
                            )
                        }
                    </>
                )
            }
            
        </>
    )
}
