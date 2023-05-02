import React, { useDebugValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { createNewTeam, getAllMyTeams } from '../../services/apiCalls';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TableTeams } from '../../common/TableTeams/TableTeams';
import spiner from '../../assets/waterpolo.png'
import Modal from 'react-bootstrap/Modal';
import {Input} from '../../common/Input/Input';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import add from '../../assets/agregar.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Teams = () => {

    const userDataRdx = useSelector(userData);

    const updateInfo = useSelector(bringData);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //HOOKS
    const [teamData, setTeamData] = useState([]);

    const [newTeam, setNewTeam] = useState(
        {
            user_id: userDataRdx?.userCredentials?.user.id,
            new_team: ''
        }
    );

    const [errorInputField, setErrorInputField] = useState('');

    const [validInputField, setValidInputfield] = useState(false);

    //set add team modal
    const [showAddTeam, setShowAddteam] = useState();

    //set active button
    const [activeSubmit, setSubmitActive] = useState(false);

    //set success message
    const [message, setMessage] = useState('');

    //HANDLER
    //input
    const inputHandler = (e) => {
        
        setNewTeam((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //update modal 
    const handleAddTeamClose = () => {
        
        setNewTeam(
            {
                user_id: userDataRdx?.userCredentials?.user.id,
                new_team: ''
            }
        )

        setShowAddteam(false)

        setErrorInputField('')

        setValidInputfield(false)

        setSubmitActive(false)

    };

    const handleAddteamShow = () => {

        setShowAddteam(true)

    };

    //
    // USEEFFECT
    useEffect(() => {
        //in case that a field is empty
        for(let empty in newTeam){

            if(newTeam[empty] === ''){

                return setSubmitActive(false);

            }
        };
        //in case that a field is not valid or 
        if(errorInputField !== '' || validInputField === false){

            return setSubmitActive(false);

        }

        //in case the data it's full validated
        setSubmitActive(true);

    });

    useEffect(() => {

        if(teamData.length === 0){

            dispatch(reload({updatedData: {}}))

            try {
                setTimeout(() => {
                
                    getAllMyTeams(userDataRdx?.userCredentials?.user?.id ,userDataRdx?.userCredentials?.token)
                        .then(
                            result => {
                                setTeamData(result.data.data)                      
                            }
                            
                        )
                        .catch(error => console.log(error));
                            
                        }, 3000)
            } catch (error) {
                
                setShowAddteam(true)
            }
            
            

        };

    },[teamData]);

    useEffect(() => {

        if(updateInfo?.updatedData?.success){

            setTeamData([]);

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

    const createTeam = () => {

        createNewTeam(newTeam, userDataRdx?.userCredentials?.token)
        .then(backendCall=> {                
                
            setMessage(backendCall.data.message)

            let success = {success: backendCall.data.success}
            
            setTimeout(() => {
                
                dispatch(reload({updatedData: success}))

                setErrorInputField('')

                setValidInputfield(false)

                setShowAddteam(false)

                setMessage('')

            }, 3000)
            }
        )
            .catch(error => console.log(error))

    };

    return (
        <>
        <Container fluid>
            <Row className='mt-5 mb-3'>
                <Col xs={9} className='d-flex justify-content-start '>
                <h2 className='font fw-bold'>Your Teams</h2>
                </Col>
                <Col xs={2} className='d-flex justify-content-end fw-bold text-primary'>
                    <p>Add team </p>
                </Col>
                <Col xs={1}>
                    <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddteamShow()}/>
                </Col>
                <hr className='font fw-bold'></hr>
            </Row>
                {
                    teamData.length === 0 ? (
                        <>                            
                            <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                            <h3 className='font fw-bold'>Looking for your information.</h3>                            
                        </>
                    ) : (
                        <>
                            <Container>                            
                                <Row>
                                    {teamData.map(data =>
                                            {
                                                return <TableTeams key={data.id} id={data.id} teamName={data.team_name}/>
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
                        <Modal show={showAddTeam} onHide={() => handleAddTeamClose()}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add a new team for your data.</Modal.Title>
                                </Modal.Header>                        
                                    <Modal.Body>
                                        <Input
                                            className={''}
                                            type={'text'}
                                            name={'new_team'}
                                            placeholder={'Type the new team name here'}
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
                                            <Button variant="success" onClick={() => createTeam()}>
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
                            <Modal show={showAddTeam} onHide={() => handleAddTeamClose()}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add a new team for your data.</Modal.Title>
                                </Modal.Header>                        
                                    <Modal.Body>
                                        <Input
                                            className={''}
                                            type={'text'}
                                            name={'new_team'}
                                            placeholder={'Type the new team name here'}
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
