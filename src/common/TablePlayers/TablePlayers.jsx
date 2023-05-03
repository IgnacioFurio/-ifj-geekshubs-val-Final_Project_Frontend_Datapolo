import React, { useEffect, useState } from 'react'
//apicall
import { deletePlayer, modifyPlayer } from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../pages/Slices/userSlice';
import { reload } from '../../pages/Slices/reloadSlice';
//apicall
//render
import Modal from 'react-bootstrap/Modal';
import {Input} from '../../common/Input/Input';
import Button from 'react-bootstrap/Button';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TablePlayers.css'

export const TablePlayers = ({id, playerName}) => {

    const dispatch = useDispatch();

    const userDataRdx = useSelector(userData);

    //HOOKS
    const [playerData, setPlayerData] = useState(
        {
            id: id,
            user_id: userDataRdx.userCredentials.user.id,
            new_name: playerName
        }
    );

    const [errorInputField, setErrorInputField] = useState('');

    const [validInputField, setValidInputfield] = useState(false);

    //set update modal
    const [showUpdate, setShowUpdate] = useState(false);

    //set delete modal
    const [showDelete, setShowDelete] = useState(false);

    //set active button
    const [activeSubmit, setSubmitActive] = useState(false);

    //set success message
    const [message, setMessage] = useState('');

    //HANDLER
    //input
    const inputHandler = (e) => {
        
        setPlayerData((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //update modal 
    const handleUpdateClose = () => {
        
        setPlayerData(
            {
                id: id,
                user_id: userDataRdx.userCredentials.user.id,
                new_name: playerName
            }
        )

        setShowUpdate(false)

        setErrorInputField('')

        setValidInputfield(false)

    };

    const handleUpdateShow = () => {

        setShowUpdate(true)

    };

    //delete modal
    const handleDeleteClose = () => {
        
        setPlayerData(
            {
                id: id,
                user_id: userDataRdx.userCredentials.user.id,
            }
        )

        setShowDelete(false)

        setErrorInputField('')

    };

    const handleDeleteShow = () => {

        setShowDelete(true)

    };

    //USEEFFECT
    useEffect(() => {
        //functions to make submit button activated
        //in case that a field is empty
        for(let empty in playerData){
            
            if(playerData[empty] === ""){
        
                setSubmitActive(false);
                
                return;
                };
        };

        //in case that a field is not valid or shows an error
        if(errorInputField !== '' || validInputField === false){

            return setSubmitActive(false);

        }
        
        //in case the data it's full validated
        setSubmitActive(true);
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

    //function to update a team name
    const newPlayerName = () => {

        modifyPlayer(playerData, userDataRdx.userCredentials.token)
            .then(backendCall=> {                    
                    
                    setMessage(backendCall.data.message)

                    let success = {success: backendCall.data.success}

                    
                    setTimeout(() => {
                        
                        dispatch(reload({updatedData: success}))

                        setErrorInputField('')

                        setValidInputfield(false)

                        setMessage('')

                    }, 3000)
                    }
                )
            .catch(error => console.log(error))

    }

    //function to delete a team
    const destroyPlayer = () => {

        deletePlayer(playerData, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setErrorInputField('')

                    setValidInputfield(false)

                    setMessage('')

                }, 3000)
                }
            )
            .catch(error => console.log(error))
    };

    return (
        <>
            <Container fluid>
                <Row className='playerName my-3 mx-2'>
                    <Col xs={8} className='d-flex justify-content-start'>
                    {playerName}
                    </Col>
                    <Col xs={2}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                    <Col xs={2}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
                </Row>
            </Container>
            {
                message === '' ? (
                    <>
                        <Modal show={showUpdate} onHide={() => handleUpdateClose()}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change the player's name</Modal.Title>
                            </Modal.Header>                        
                                <Modal.Body>
                                    <div className='mx-3 fw-bold'>Player's Name:</div>
                                    <div className='mx-4'>{playerName}</div>
                                    <Input
                                        className={''}
                                        type={'text'}
                                        name={'new_name'}
                                        placeholder={'Type the new name here'}
                                        required={true}
                                        error={errorInputField}
                                        changeFunction={(e)=>inputHandler(e)}
                                        blurFunction={(e)=>checkError(e)}
                                        />
                                </Modal.Body>        
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => handleUpdateClose()}>
                                    Cancel Changes
                                </Button>
                                {
                                    activeSubmit ? (
                                        <Button variant="success" onClick={() => newPlayerName()}>
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
                        <Modal show={showDelete} onHide={() => handleDeleteClose()}>
                            <Modal.Header closeButton>
                                <Modal.Title>Do you really want to delete this player?</Modal.Title>
                            </Modal.Header>                        
                                <Modal.Body>
                                    <div className='mx-3 fw-bold'>Player's Name:</div>
                                    <div className='mx-4'>{playerName}</div>                                    
                                </Modal.Body>        
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => handleDeleteClose()}>
                                    Not really
                                </Button>
                                <Button variant="success" onClick={() => destroyPlayer()}>
                                    Delete it
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <>
                    <Modal show={showUpdate} onHide={() => handleUpdateClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change the player's name</Modal.Title>
                        </Modal.Header>                        
                            <Modal.Body>                            
                                <div className='mx-3 fw-bold'>Player's Name:</div>
                                <div className='mx-4'>{playerName}</div>
                                <Input
                                    className={''}
                                    type={'text'}
                                    name={'new_name'}
                                    placeholder={'Type the new name here'}
                                    required={true}
                                    error={errorInputField}
                                    changeFunction={(e)=>inputHandler(e)}
                                    blurFunction={(e)=>checkError(e)}
                                    />                            
                            </Modal.Body>        
                        <Modal.Footer>
                            <h4 className='d-flex justify-content-center font fw-bold'>{message}</h4>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showDelete} onHide={() => handleUpdateClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Do you really want to delete this player?</Modal.Title>
                        </Modal.Header>                        
                            <Modal.Body>                            
                                <div className='mx-3 fw-bold'>Player's Name:</div>
                                <div className='mx-4'>{playerName}</div>                                                      
                            </Modal.Body>        
                        <Modal.Footer>
                            <h4 className='d-flex justify-content-center font fw-bold'>{message}</h4>
                        </Modal.Footer>
                    </Modal>
                </>
                )
            }
            
        </>
    )
};