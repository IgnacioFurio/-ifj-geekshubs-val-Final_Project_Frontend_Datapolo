import React, { useEffect, useState } from 'react';
//apicall
import { getAllMyGoalsByTeamIdAndGameId } from '../../services/apiCalls';
//redux
import { userData } from '../../pages/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
//render
import { Modal } from 'bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import info from '../../assets/info.png';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import hide from '../../assets/esconder.png';
import goal from '../../assets/jugador-de-waterpolo-con-las-bolas-en-el-agua.png';



export const TableGoalsInfo = ({goalData, playersData}) => {

    //HOOKS
    const [playerName, setPlayerName] = useState('');

    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {

        for(let i = 0 ; i < playersData.length ; i++){

            if(playersData[i].id === goalData.player_id){
                setPlayerName(playersData[i].name)
            }
        }
    }, [playerName]);
    
    //HANDLER
    const handleInfoShow = () => {

        setShowInfo(true)

    }
    
    const handleInfoClose = () => {

        setShowInfo(false)

    }
    
    return (
        <> 
            <Row>
                <Col xs={5}>{playerName}</Col>
                <Col xs={4}>{goalData.player_nº}</Col>
                <Col xs={1}><img src={info} alt="update" className='infoIcon' onClick={() => handleInfoShow()}/></Col>                    
                <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => {}}/></Col>                    
                <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => {}}/></Col>
            </Row>
            {
                showInfo ? (
                    <>
                        <Row className='my-3 d-flex align-items-center'>
                            <Col xs={2}></Col>
                            <Col className='font fw-bold text-center mt-2'>Zone where the goal came from.</Col>
                            <Col xs={2} className='d-flex justify-content-end'><img src={hide} alt="hide" className='updateIcon' onClick={() => handleInfoClose()}/></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col><div className='goal'></div></Col>
                            <Col></Col>
                        </Row>
                        <Row className='water'>
                            <Col xs={4} className='field1 d-flex justify-content-center align-items-center'>
                            {goalData.zone == 1 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                            <Col xs={4} className='field2 d-flex justify-content-center align-items-center'> 
                                
                                {goalData.zone == 2 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                            <Col xs={4} className='field3 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 3 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                        </Row>
                        <Row className='water'>
                            <Col xs={4} className='field4 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 4 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                            <Col xs={4} className='field5 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 5 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                            <Col xs={4} className='field6 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 6 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                        </Row>
                        <Row className='water'>
                            <Col xs={4} className='field7 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 7 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                            <Col xs={4} className='field8 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 8 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                            <Col xs={4} className='field9 d-flex justify-content-center align-items-center'>
                                {goalData.zone == 9 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                            </Col>
                        </Row>
                    </>
                ) : (
                    ''
                )
            }            
        </>
    )
}
