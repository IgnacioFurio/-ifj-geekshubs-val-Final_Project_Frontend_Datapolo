import React, { useEffect, useState } from 'react';
//apicall
import { getAllMyGoalsByTeamIdAndGameId } from '../../services/apiCalls';
//redux
import { userData } from '../../pages/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reload } from '../../pages/Slices/reloadSlice';
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import info from '../../assets/info.png';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';


export const TableGoals = ({game_id, team_id, myPlayers}) => {

    const userDataRdx = useSelector(userData);

    const dispatch = useDispatch();

    //HOOKs
    const [goalApiCall, setGoalApiCall] = useState(
        {
            team_id: team_id,
            game_id: game_id
        }
    );

    const [goalsData, setGoalsData] = useState([]);

    const [playerName, setPlayerName] = useState('');

    const [message, setMessage] = useState('');

    useEffect(()=>{
        // console.log(goalApiCall);
        // console.log(myPlayers);

        if(goalsData.length === 0){

            getAllMyGoalsByTeamIdAndGameId(goalApiCall, userDataRdx?.userCredentials?.token)
            .then(backendCall=> {                

                setGoalsData(backendCall.data.data);

                })
            .catch(error => console.log(error))
        }

    }, [goalApiCall]);

    useEffect(()=>{
        console.log(goalsData);
        console.log(myPlayers);

        for(let i = 0 ; i < myPlayers.length ; i++ ) {

            for(let j = 0 ; j < goalsData.length ; j++){
                if(myPlayers[i].id === goalsData[j].player_id ){
                    setPlayerName(myPlayers[i].name)
                }
            };
        };
        console.log(playerName);
    });

    return (
        <>
            <Container>
                <Row>
                    <Col xs={5} className='font fw-bold'>Goal by</Col>
                    <Col xs={4} className='font fw-bold'>Cap Nº</Col>
                    <Col xs={1}></Col>                    
                    <Col xs={1}></Col>                    
                    <Col xs={1}></Col>
                </Row>
                {
                    goalsData.map(data=>
                        {
                            return <Row key={data.id}>
                                        <Col xs={5}>{playerName}</Col>
                                        <Col xs={4}>{data.player_nº}</Col>
                                        <Col xs={1}><img src={info} alt="update" className='infoIcon' onClick={() => handleInfoShow()}/></Col>                    
                                        <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                                        <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
                                    </Row>
                            
                        }
                        )
                }
            </Container>
        </>
    )
}
