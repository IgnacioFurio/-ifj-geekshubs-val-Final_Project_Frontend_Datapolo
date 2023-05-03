import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//apicall
import { createNewSeason, getAllSeasons } from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { adminData } from '../Slices/isAdminSlice';
import { bringData, reload } from '../Slices/reloadSlice';
import { userData } from '../Slices/userSlice';
//render
import spiner from '../../assets/waterpolo.png'
import Modal from 'react-bootstrap/Modal';
import {Input} from '../../common/Input/Input';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import add from '../../assets/agregar.png';
import { TablePlayers } from '../../common/TablePlayers/TablePlayers';

export const AdminSeasons = () => {

    const updateInfo = useSelector(bringData);

    const userDataRdx = useSelector(userData);

    const isAdminRdx = useSelector(adminData);

    const navigate = useNavigate()
    
    const dispatch = useDispatch();

    //HOOKS
    const [seasonData, setSeasonData] = useState([]);

    const [newSeason, setNewSeason] = useState(
        {
            season: ''
        }
    );

    const [errorInputField, setErrorInputField] = useState('');

    const [validInputField, setValidInputfield] = useState(false);

    //set add team modal
    const [showAddSeason, setShowAddSeason] = useState();

    //set active button
    const [activeSubmit, setSubmitActive] = useState(false);

    //set success message
    const [message, setMessage] = useState('');

    //HANDLER
    //input
    const inputHandler = (e) => {
        
        setNewSeason((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //update modal 
    const handleAddSeasonClose = () => {
        
        setNewSeason(
            {
                season: ''
            }
        )

        setShowAddSeason(false)

        setErrorInputField('')

        setValidInputfield(false)

        setSubmitActive(false)

    };

    const handleAddSeasonShow = () => {

        setShowAddSeason(true)

    };

    //USEEFFECT
    useEffect(() => {

        if(!isAdminRdx.isAdmin) {
            navigate('/')
        }

    },[])

    useEffect(() => {
        console.log(newSeason);
        //in case that a field is empty
        for(let empty in newSeason){

            if(newSeason[empty] === ''){

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
    
        if(seasonData.length === 0){

            dispatch(reload({updatedData: {}}))

            try {
                setTimeout(() => {
                
                    getAllSeasons(userDataRdx?.userCredentials?.token)
                        .then(
                            result => {
                                setSeasonData(result.data.data)                      
                            }
                            
                        )
                        .catch(error => console.log(error));
                            
                        }, 3000)
            } catch (error) {
                
                setShowAddPlayer(true)
            }
            
            

        };

    },[seasonData]);

    useEffect(() => {

        if(updateInfo?.updatedData?.success){

            setSeasonData([]);

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
    
        createNewSeason(newSeason, userDataRdx?.userCredentials?.token)
        .then(backendCall=> {                
                
            setMessage(backendCall.data.message)

            let success = {success: backendCall.data.success}
            
            setTimeout(() => {
                
                dispatch(reload({updatedData: success}))

                setErrorInputField('')

                setValidInputfield(false)

                setShowAddSeason(false)

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
                    <h2 className='font fw-bold'>Seasons</h2>
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end fw-bold text-primary'>
                        <p>Add season</p>
                    </Col>
                    <Col xs={1} className='px-1'>
                        <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddSeasonShow()}/>
                    </Col>
                    <hr className='font fw-bold'></hr>
                </Row>
                    {
                        seasonData.length === 0 ? (
                            <>                            
                                <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                                <h3 className='font fw-bold'>Looking for the information.</h3>                            
                            </>
                        ) : (
                            <>
                                <Container>                            
                                    <Row>
                                        {seasonData.map(data =>
                                                {
                                                    return <TablePlayers key={data.id} id={data.id} playerName={data.season}/>
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
                            <Modal show={showAddSeason} onHide={() => handleAddSeasonClose()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new season.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>
                                            <Input
                                                className={''}
                                                type={'text'}
                                                name={'season'}
                                                placeholder={"egg: e2001-2002"}
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
                                <Modal show={showAddSeason} onHide={() => handleAddSeasonClose()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new season.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>
                                            <Input
                                                className={''}
                                                type={'text'}
                                                name={'season'}
                                                placeholder={"egg: e2001-2002"}
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
