import React, { useEffect, useState } from 'react';
//apicall
import { getAllMyGoalsByTeamIdAndGameId } from '../../services/apiCalls';
//redux
import { userData } from '../../pages/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import info from '../../assets/info.png';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';


export const TableGoalsInfo = ({goalData, playersData}) => {

    const [playerName, setPlayerName] = useState('');

    useEffect(() => {

        for(let i = 0 ; i < playersData.length ; i++){

            if(playersData[i].id === goalData.player_id){
                setPlayerName(playersData[i].name)
            }
        }
    }, [playerName]);

    useEffect(()=>{
        console.log(playerName);
    });
    
    // handleInfoShow
    return (
        <> 
            <Row>
                <Col xs={5}>{playerName}</Col>
                <Col xs={4}>{goalData.player_nº}</Col>
                <Col xs={1}><img src={info} alt="update" className='infoIcon' onClick={() => {}}/></Col>                    
                <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => {}}/></Col>                    
                <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => {}}/></Col>
            </Row>
        </>
    )
}
