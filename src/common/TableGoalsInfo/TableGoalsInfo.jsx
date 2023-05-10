import React, { useEffect, useState } from 'react';
//apicall
import { deleteGoal, modifyGoal } from '../../services/apiCalls';
//redux
import { userData } from '../../pages/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import info from '../../assets/info.png';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import hide from '../../assets/esconder.png';
import goal from '../../assets/jugador-de-waterpolo-con-las-bolas-en-el-agua.png';
import { reload } from '../../pages/Slices/reloadSlice';



export const TableGoalsInfo = ({id, teamId, goalData, playersData}) => {

    const userDataRdx = useSelector(userData);
    const dispatch = useDispatch();

    //HOOKS
    const [playerName, setPlayerName] = useState('');

    const capData = [1,2,3,4,5,6,7,8,9,10,11,12,13]

    const [showInfo, setShowInfo] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [modGoal, setModGoal] = useState(
        {
            id: id,
            team_id: teamId,
            game_id: goalData.game_id,
            player_id: goalData.player_id,
            zone: goalData.zone,
            player_nº: goalData.player_nº
        }
    );

    const [message, setMessage] = useState('')
    
    //HANDLER
    const handleInfoShow = () => {

        setShowInfo(true)
        setShowUpdate(false)
        setShowDelete(false)

    }
    
    const handleInfoClose = () => {

        setShowInfo(false)

    }
    
    const handleUpdateShow = () => {

        setShowUpdate(true)
        setShowInfo(false)
        setShowDelete(false)

    }
    
    const handleUpdateClose = () => {

        setShowUpdate(false)

    }
    
    const handleDeleteShow = () => {

        setShowDelete(true)
        setShowInfo(false)
        setShowUpdate(false)

    }
    
    const handleDeleteClose = () => {

        setShowDelete(false)

    }

    const inputHandlerGoal = (e) => {
        
        setModGoal((prevState)=>(
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        )
    );
    }

    //manage field zone information
    const inputFieldHandler = (e) => {

        setModGoal(
            {
                id: id,
                team_id: teamId,
                game_id: goalData.game_id,
                player_id: goalData.player_id,
                zone: e.target.title,
                player_nº: goalData.player_nº
            }
        );

    }

    //USEEFFECT
    useEffect(()=>{        
        console.log('Modify Goal', modGoal);
        console.log('Message', message);
    });

    useEffect(() => {

        for(let i = 0 ; i < playersData.length ; i++){

            if(playersData[i].id === goalData.player_id){
                setPlayerName(playersData[i].name)
            }
        }
    }, [playerName]);

    //FUNCTIONS
    const modSelectedGoal = () => {
        modifyGoal(modGoal, userDataRdx?.userCredentials?.token)
            .then(backendCall=> {                

                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setModGoal(
                        {
                            id: id,
                            team_id: teamId,
                            game_id: goalData.game_id,
                            player_id: goalData.player_id,
                            zone: goalData.zone,
                            player_nº: goalData.player_nº
                        }
                    );

                    setMessage('')

                }, 3000)
                })
            .catch(error => console.log(error))
    }

    const delSelectedGoal = () => {

        deleteGoal(id, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))
            
                    setMessage('')

                }, 3000)
                }
            )
            .catch(error => console.log(error))
    };
    
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={5} className='text-center'>{playerName}</Col>
                    <Col xs={4} className='text-center'>{goalData.player_nº}</Col>
                    <Col xs={1}><img src={info} alt="update" className='infoIcon' onClick={() => handleInfoShow()}/></Col>                    
                    <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                    <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
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
                            <Row className='waterNoCursor'>
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
                            <Row className='waterNoCursor'>
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
                            <Row className='waterNoCursor'>
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
                            <hr />
                        </>
                    ) : (
                        <>
                        {showUpdate ? (
                                <>                                    
                                    <Row xs={2} className='d-flex mt-3'>
                                        <Col xs={10}></Col>
                                        <Col xs={2} className='d-flex justify-content-center'><img src={hide} alt="hide" className='updateIcon' onClick={() => handleUpdateClose()}/></Col>                                            
                                    </Row>
                                    <Row className='font fw-bold'>Change the player who made the goal.</Row>
                                    <Row>
                                        <select name={'player_id'} className={'form-select my-1 py-2'} onChange={(e)=>inputHandlerGoal(e)}>
                                            <option value={playerName} >----------</option>
                                            {
                                                playersData.map(data => 
                                                        {
                                                            return <option  key={data.id} value={data.id}>
                                                                        {data.name}
                                                                    </option>
                                                        }
                                                    )
                                            }
                                        </select>
                                    </Row>
                                    <Row className='font fw-bold'>Change the number of the player.</Row>
                                    <Row>
                                        <select name={'player_nº'} className={'form-select my-1 py-2'} onChange={(e)=>inputHandlerGoal(e)}>
                                            <option value={goalData.player_nº} >----------</option>
                                            {
                                                capData.map(data => 
                                                        {
                                                            return <option  key={data.id} value={data}>
                                                                        {data}
                                                                    </option>
                                                        }
                                                    )
                                            }
                                        </select>
                                    </Row>
                                    <Row className='font fw-bold'>Change where the goal came from.</Row>
                                    <Row className='mt-2'>
                                        <Col></Col>
                                        <Col className='goal'></Col>
                                        <Col></Col>
                                    </Row>
                                    <Row className='water'>
                                        <Col xs={4} className='zone1 d-flex justify-content-center align-items-center' title={1} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 1 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                        <Col xs={4} className='zone2 d-flex justify-content-center align-items-center' title={2} onClick={(e)=>inputFieldHandler(e)}> 
                                            {modGoal.zone == 2 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                        <Col xs={4} className='zone3 d-flex justify-content-center align-items-center' title={3} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 3 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                    </Row>
                                    <Row className='water'>
                                        <Col xs={4} className='zone4 d-flex justify-content-center align-items-center' title={4} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 4 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                        <Col xs={4} className='zone5 d-flex justify-content-center align-items-center' title={5} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 5 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                        <Col xs={4} className='zone6 d-flex justify-content-center align-items-center' title={6} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 6 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                    </Row>
                                    <Row className='water'>
                                        <Col xs={4} className='zone7 d-flex justify-content-center align-items-center' title={7} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 7 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                        <Col xs={4} className='zone8 d-flex justify-content-center align-items-center' title={8} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 8 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                        <Col xs={4} className='zone9 d-flex justify-content-center align-items-center' title={9} onClick={(e)=>inputFieldHandler(e)}>
                                            {modGoal.zone == 9 ? (<img src={goal} alt="goal" className='goalIcon'/>) : ('')}
                                        </Col>
                                    </Row>
                                    {message ? (
                                            <>
                                                <Row className='font fw-bold'>
                                                    <Col className='text-end'>{message}</Col>                                                
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                <Row>
                                                    <Col xs={3}></Col>
                                                    <Col className='d-flex mt-2'>
                                                        <Button className='mx-1' variant="danger" onClick={() => handleUpdateClose()}>
                                                            Cancel Changes
                                                        </Button>
                                                        <Button className='mx-1' variant="success" onClick={() => modSelectedGoal()}>
                                                            Save Changes
                                                        </Button>                                                    
                                                    </Col>                                        
                                                </Row>
                                            </>
                                        )
                                    }
                                    <hr />
                                </>
                            ):(
                                <>
                                {showDelete ? (
                                    <>
                                        <Row xs={2} className='d-flex mt-3'>
                                            <Col xs={10}></Col>
                                            <Col xs={2} className='d-flex justify-content-center'><img src={hide} alt="hide" className='updateIcon' onClick={() => handleDeleteClose()}/></Col>                                            
                                        </Row>
                                        <Row className='font fw-bold'>Do you really want to delete this goal?</Row>                                        
                                        {message ? (
                                            <Row className='font fw-bold'>
                                                <Col className='text-end'>{message}</Col>                                                
                                            </Row>
                                        ) : (
                                            <>
                                                <Row>
                                                    <Col xs={6}></Col>
                                                    <Col className='d-flex mt-3'>
                                                        <Button className='mx-1' variant="danger" onClick={() => handleDeleteClose()}>
                                                        Not sure
                                                        </Button>
                                                        <Button className='mx-1' variant="success" onClick={() => delSelectedGoal()}>
                                                        Delete it
                                                        </Button>
                                                    </Col>                                        
                                                </Row>
                                            </>
                                        )} 
                                    </>
                                    ) : (
                                    ''
                                    )
                                }
                                </>
                            )}
                        </>
                    )
                }            
            </Container> 
        </>
    )
}
