import React, { useEffect, useState } from 'react'
//apicall
import { deletePlayer, modifyPlayer, modifyUser } from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../pages/Slices/userSlice';
import { reload } from '../../pages/Slices/reloadSlice';
//apicall
//render
import Modal from 'react-bootstrap/Modal';
import {Input} from '../Input/Input';
import Button from 'react-bootstrap/Button';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TableUsers.css'

export const TableUsers = ({id, userName, userEmail, userPass, userRole}) => {

    const dispatch = useDispatch();

    const userDataRdx = useSelector(userData);

    //HOOKS
    const [role, setRole] = useState('');
    const [userNewData, setUserNewData] = useState(
        {
            id: id,
            new_name: userName,
            new_email: userEmail,
            new_role_id: userRole
        }
    );
    
    const [errorInputField, setErrorInputField] = useState(
        {            
            new_nameError: '',
            new_emailError: '',
            new_role_idError: ''
        }
    );
    
    const [validInputField, setValidInputField] = useState(
        {            
            new_nameValid: true,
            new_emailValid: true,
            new_role_idValid: true
        }
    );

    //set update modal
    const [showUpdate, setShowUpdate] = useState(false);

    //set delete modal
    const [showDelete, setShowDelete] = useState(false);

    //set active button
    const [activeSubmit, setSubmitActive] = useState(true);

    //set success message
    const [message, setMessage] = useState('');

    //HANDLER
    //input
    const inputHandler = (e) => {
        
        setUserNewData((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    const inputHandlerRole = (e) => {
        
        setUserNewData(
            {
                id: id,
                new_name: userName,
                new_email: userEmail,
                new_role_id: e.target.value
            }
        );
    }

    //update modal 
    const handleUpdateClose = () => {
        
        setUserNewData(
            {
                id: id,
                new_name: userName,
                new_email: userEmail,
                new_role_id: userRole
            }
        )

        setShowUpdate(false)

        setErrorInputField(
            {            
                new_nameError: '',
                new_emailError: '',
                new_role_idError: ''
            }
        )

        setValidInputField(
            {            
                new_nameValid: true,
                new_emailValid: true,
                new_role_idValid: true
            }
        )

    };

    const handleUpdateShow = () => {

        setShowUpdate(true)

    };

    //delete modal
    const handleDeleteClose = () => {
        
        setUserNewData(
            {
                id: id,
                new_name: userName,
                new_email: userEmail,
                new_role_id: userRole
            }
        )

        setShowDelete(false)

        setErrorInputField(
            {            
                new_nameError: '',
                new_emailError: '',
                new_role_idError: ''
            }
        )

        setValidInputField(
            {            
                new_nameValid: true,
                new_emailValid: true,
                new_role_idValid: true
            }
        )

    };

    const handleDeleteShow = () => {

        setShowDelete(true)

    };

    //USEEFFECT
    useEffect(() => {
        //functions to make submit button activated
        //in case that a field is empty
        for(let empty in userNewData){
            
            if(userNewData[empty] === ""){
        
                setSubmitActive(false);
                
                return;
                };
        };

        //in case that a field is not valid
        for(let valid in validInputField){
    
            if(validInputField[valid] === false){
        
                setSubmitActive(false);
                return;
            };
        };
        
        //in case that a field shows an error
        for(let error in errorInputField){
    
            if(errorInputField[error]){
                
                setSubmitActive(false);
                return;
                };
        };
        
        //in case the data it's full validated
        setSubmitActive(true);
    });

    useEffect(()=>{
        if (userRole === 1) {
            setRole('Super Admin')
        } else if (userRole === 2) {
            setRole('Admin')
        } else if (userRole === 3) {
            setRole('User')
        }
    },[role])

    //FUNCTIONS
    const checkError = (e) => {
        
        let error = "";
    
        let check = validate(
            e.target.name,
            e.target.value,
            e.target.required
            );
            
        error = check.message
    
        setValidInputField((prevState) => (
            {
                ...prevState,
                [e.target.name + 'Valid']: check.valid
            }
        )
        );

        setErrorInputField((prevState) => (
                {
                ...prevState,
                [e.target.name + 'Error']: error
                }
            )
        );

    };

    //function to update a team name
    const newUserData = () => {

        modifyUser(userNewData, userDataRdx.userCredentials.token)
            .then(backendCall=> {                    
                    console.log(backendCall.data);
                    setMessage(backendCall.data.message)

                    let success = {success: backendCall.data.success}

                    
                    setTimeout(() => {
                        
                        dispatch(reload({updatedData: success}))

                        setErrorInputField(
                            {            
                                new_nameError: '',
                                new_emailError: '',
                                new_role_idError: ''
                            }
                        )

                        setValidInputField(
                            {            
                                new_nameValid: true,
                                new_emailValid: true,
                                new_role_idValid: true
                            }
                        )

                        setMessage('')

                    }, 3000)
                    }
                )
            .catch(error => console.log(error))

    }

    //function to delete a team
    const destroyPlayer = () => {

        deletePlayer(userNewData, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setErrorInputField(
                        {            
                            new_nameError: '',
                            new_emailError: '',
                            new_role_idError: ''
                        }
                    )

                    setValidInputField(
                        {            
                            new_nameValid: true,
                            new_emailValid: true,
                            new_role_idValid: true
                        }
                    )

                    setMessage('')

                }, 3000)
                }
            )
            .catch(error => console.log(error))
    };

    return (
        <>
            <Container fluid>
                <Row className='userName my-3 mx-2'>
                    <Col xs={8} md={10} className='d-flex justify-content-start'>
                    {role} 
                    </Col>
                    <Col xs={2} md={1}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                    <Col xs={2} md={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
                    <hr />
                    <Col xs={8} className='d-flex justify-content-start'>
                    {userName}
                    </Col>
                    <Col xs={12} className='d-flex justify-content-start'>
                    {userEmail}
                    </Col>
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
                                    <div className='mx-3 fw-bold'> User Name:</div>
                                    <div className='mx-4'>{userName}</div>
                                    <Input
                                        className={''}
                                        type={'text'}
                                        name={'new_name'}
                                        placeholder={'Type the new name here'}
                                        required={false}
                                        error={errorInputField.new_nameError}
                                        changeFunction={(e)=>inputHandler(e)}
                                        blurFunction={(e)=>checkError(e)}
                                        />
                                    <div className='mx-3 fw-bold'>E-mail:</div>
                                    <div className='mx-4'>{userEmail}</div>
                                    <Input
                                        className={''}
                                        type={'email'}
                                        name={'new_email'}
                                        placeholder={'Type the new email here'}
                                        required={false}
                                        error={errorInputField.new_emailError}
                                        changeFunction={(e)=>inputHandler(e)}
                                        blurFunction={(e)=>checkError(e)}
                                        />
                                    <div className='mx-2 fw-bold'>Role:</div>
                                    <div className='mx-3'>{role}</div>
                                    <div className='m-3 font fw-bold'>New Role:</div>
                                    <select className='form-select my-1' name="new_role_id" id="" onChange={(e) => inputHandlerRole(e)}>
                                        <option value={userRole} >----------</option>
                                        <option value={1} >SuperAdmin</option>
                                        <option value={2} >Admin</option>
                                        <option value={3} >User</option>
                                    </select>
                                </Modal.Body>        
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => handleUpdateClose()}>
                                    Cancel Changes
                                </Button>
                                {
                                    activeSubmit ? (
                                        <Button variant="success" onClick={() => newUserData()}>
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
                                    <div className='mx-4'>{userName}</div>                                    
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
                                <div className='mx-3 font fw-bold'>New Name:</div>
                                <div className='mx-4'>{userNewData.new_name}</div>  
                                <div className='mx-3 font fw-bold'>New Email:</div>
                                <div className='mx-4'>{userNewData.new_email}</div>   
                                <div className='mx-3 font fw-bold'>New Role:</div>
                                <div className='mx-4'>{userNewData.new_role === 1 ? 'SuperAdmin' : userNewData.new_role === 2 ? 'Admin' : 'User'}</div>                                
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
                                <div className='mx-4'>{userName}</div>                                                      
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