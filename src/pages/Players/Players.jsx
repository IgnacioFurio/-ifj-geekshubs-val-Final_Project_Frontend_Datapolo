import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//apicall
import { createNewPlayer, getAllMyPlayers} from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TablePlayers } from '../../common/TablePlayers/TablePlayers';
import spiner from '../../assets/waterpolo.png'
import Modal from 'react-bootstrap/Modal';
import {Input} from '../../common/Input/Input';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import add from '../../assets/agregar.png';
import players from '../../assets/Players.jpg';


export const Players = () => {
    
        const userDataRdx = useSelector(userData);

        const updateInfo = useSelector(bringData);
    
        const dispatch = useDispatch();
    
        const navigate = useNavigate();
    
        //HOOKS
        const [playerData, setPlayerData] = useState([]);
    
        const [newPlayer, setNewPlayer] = useState(
            {
                user_id: userDataRdx?.userCredentials?.user.id,
                new_player: ''
            }
        );
    
        const [errorInputField, setErrorInputField] = useState('');
    
        const [validInputField, setValidInputfield] = useState(false);
    
        //set add team modal
        const [showAddPlayer, setShowAddPlayer] = useState();
    
        //set active button
        const [activeSubmit, setSubmitActive] = useState(false);
    
        //set success message
        const [message, setMessage] = useState('');
    
        //HANDLER
        //input
        const inputHandler = (e) => {
            
            setNewPlayer((prevState)=>(
                    {
                        ...prevState,
                        [e.target.name]: e.target.value
                    }
                )
            );
        }
    
        //update modal 
        const handleAddPlayerClose = () => {
            
            setNewPlayer(
                {
                    user_id: userDataRdx?.userCredentials?.user.id,
                    new_player: ''
                }
            )
    
            setShowAddPlayer(false)
    
            setErrorInputField('')
    
            setValidInputfield(false)

            setSubmitActive(false)
    
        };
    
        const handleAddPlayerShow = () => {
    
            setShowAddPlayer(true)
    
        };
    
        // USEEFFECT
        useEffect(() => {

            if( !userDataRdx.userCredentials.token ){
                navigate('/')
            };
    
        }, []);

        useEffect(() => {
            //in case that a field is empty
            for(let empty in newPlayer){

                if(newPlayer[empty] === ''){

                    return setSubmitActive(false);

                }
            };
            //in case that a field is not valid or shows an error
            if(errorInputField !== '' || validInputField === false){

                return setSubmitActive(false);

            }

            //in case the data it's full validated
            setSubmitActive(true);

        })

        useEffect(() => {
    
            if(playerData.length === 0 && userDataRdx.userCredentials.token){
    
                dispatch(reload({updatedData: {}}))
    
                try {
                    setTimeout(() => {
                    
                        getAllMyPlayers(userDataRdx?.userCredentials?.user?.id ,userDataRdx?.userCredentials?.token)
                            .then(
                                result => {
                                    setPlayerData(result.data.data)                      
                                }
                                
                            )
                            .catch(error => console.log(error));
                                
                            }, 3000)
                } catch (error) {
                    
                    setShowAddPlayer(true)
                }
                
                
    
            };
    
        },[playerData]);
    
        useEffect(() => {
    
            if(updateInfo?.updatedData?.success){
    
                setPlayerData([]);
    
            };
        });
    
        //FUNCTIONS
        const checkError = (e) => {
            
            let error = "";
        
            let check = validate(
                e.target.name,
                e.target.value,
                e.target.required
                );
                
            error = check.message
        
            setValidInputfield(check.valid);
        
            setErrorInputField(error);
        
        };
    
        const createPlayer = () => {
    
            createNewPlayer(newPlayer, userDataRdx?.userCredentials?.token)
            .then(backendCall=> {                
                    
                setMessage(backendCall.data.message)
    
                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))
    
                    setErrorInputField('')
    
                    setValidInputfield(false)
    
                    setShowAddPlayer(false)
    
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
                    <Col>
                        <img src={players} className="img-fluid mb-3 rounded-bottom" alt="..."></img>
                    </Col>
                </Row>
                <Row className='mt-5 mb-3'>
                    <Col xs={9} className='d-flex justify-content-start '>
                    <h2 className='font fw-bold'>Your Players</h2>
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end fw-bold text-primary'>
                        <p>Add player</p>
                    </Col>
                    <Col xs={1}>
                        <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddPlayerShow()}/>
                    </Col>
                    <hr className='font fw-bold'></hr>
                </Row>
                    {
                        playerData.length === 0 ? (
                            <>                            
                                <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                                <h3 className='font fw-bold'>Looking for your information.</h3>                            
                            </>
                        ) : (
                            <>
                                <Container>                            
                                    <Row>
                                        {playerData.map(data =>
                                                {
                                                    return <TablePlayers key={data.id} id={data.id} playerName={data.name}/>
                                                }
                                                )
                                            }
                                    </Row>
                                </Container>
                                
                            </>
                        )
                    }
                    {
                        message === '' ? (
                            <Modal show={showAddPlayer} onHide={() => handleAddPlayerClose()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new player for your data.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>
                                            <Input
                                                className={''}
                                                type={'text'}
                                                name={'new_player'}
                                                placeholder={"Type the new player's name here"}
                                                required={true}
                                                error={errorInputField}
                                                changeFunction={((e)=>inputHandler(e))}
                                                blurFunction={(e)=>checkError(e)}
                                                />
                                        </Modal.Body>        
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={() => handleUpdateClose()}>
                                            Cancel Changes
                                        </Button>
                                        {
                                            activeSubmit ? (
                                                <Button variant="success" onClick={() => createPlayer()}>
                                                    Save Changes
                                                </Button>
                                            ) : (
                                                <Button variant="secondary">
                                                    Save Changes
                                                </Button>
                                            )
                                        }
                                    </Modal.Footer>
                                </Modal>
                            ) : (
                                <Modal show={showAddPlayer} onHide={() => handleAddPlayerClose()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new player for your data.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>
                                            <Input
                                                className={''}
                                                type={'text'}
                                                name={'new_player'}
                                                placeholder={'Type the new player name here'}
                                                required={true}
                                                error={errorInputField}
                                                changeFunction={((e)=>inputHandler(e))}
                                                blurFunction={(e)=>checkError(e)}
                                                />
                                        </Modal.Body>        
                                    <Modal.Footer>
                                    <h4 className='d-flex justify-content-center font fw-bold'>{message}</h4>
                                    </Modal.Footer>
                                </Modal>
                            )
                    }
                </Container>            
            </>
        )
    
}
