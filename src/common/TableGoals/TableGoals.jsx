import React, { useEffect, useState } from 'react';
//apicall
import { getAllMyGoalsByTeamIdAndGameId } from '../../services/apiCalls';
//redux
import { userData } from '../../pages/Slices/userSlice';
import {  useSelector } from 'react-redux';
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TableGoalsInfo } from '../TableGoalsInfo/TableGoalsInfo';


export const TableGoals = ({game_id, team_id, myPlayers}) => {

    const userDataRdx = useSelector(userData);

    //HOOKs
    const [goalApiCall, setGoalApiCall] = useState(
        {
            team_id: team_id,
            game_id: game_id
        }
    );

    const [goalsData, setGoalsData] = useState([]);

    useEffect(()=>{

        if(goalsData.length === 0){

            getAllMyGoalsByTeamIdAndGameId(goalApiCall, userDataRdx?.userCredentials?.token)
            .then(backendCall=> {                

                setGoalsData(backendCall.data.data);

                })
            .catch(error => console.log(error))
        }

    }, [goalApiCall]);

    useEffect(()=>{

    });

    return (
        <>
            <Container>
                <Row>
                    <Col xs={5} className='font fw-bold text-center'>Goal by</Col>
                    <Col xs={4} className='font fw-bold text-center'>Cap Nº</Col>
                    <Col xs={1}></Col>                    
                    <Col xs={1}></Col>                    
                    <Col xs={1}></Col>
                </Row>                
                {
                    goalsData.map(data=>
                        { 
                            return <TableGoalsInfo 
                                key={data.id}
                                goalData={data}                                
                                id={data.id}
                                gameId={data.game_id}
                                teamId={data.team_id}
                                playersData={myPlayers}                                
                            />                            
                        }
                    )
                }
            </Container>
        </>
    )
}
