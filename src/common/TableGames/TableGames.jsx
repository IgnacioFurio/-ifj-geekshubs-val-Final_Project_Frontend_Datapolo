import React, { useEffect, useState } from 'react'
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../pages/Slices/userSlice';
import { reload } from '../../pages/Slices/reloadSlice';
//apicall
import { deleteGame, modifyGame } from '../../services/apiCalls';
//render
import { Select } from '../Select/Select';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TableGames.css'


export const TableGames = ({id, seasons, seasonId, myTeams, teamId, rivalId, locale, friendly, blurFunction}) => {

    const dispatch = useDispatch();

    const userDataRdx = useSelector(userData);

    //HOOKS
    const [newGame, setNewGame] = useState(
        {
            id: id,
            season_id: seasonId,
            my_team_id: teamId,
            my_rival_id: rivalId,
            locale: true,
            friendly: false
        }
    );

    const [ teamsData, setTeamsData ] = useState([]);

    const [ seasonsData, setSeasonsData ] = useState([]);

    const [ seasonDate, setSeasonsDate] = useState('');

    const [ myTeam, setMyTeam ] = useState('');

    const [ rivalTeam, setRivalTeam ] = useState('');

    const localeGame = locale;

    const [errorInputField, setErrorInputField] = useState(
        {
            season_idError: '',
            my_team_idError: '',
            my_rival_idError: '',
            friendlyError: ''
        }
    );

    const [validInputField, setValidInputfield] = useState(
        {
            season_idValid: false,
            my_team_idValid: false,
            my_rival_idValid: false,
        }
    );

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
        
        setNewGame((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //update modal 
    const handleUpdateClose = () => {
        
        setNewGame(
            {
                id: id,
                season_id: seasonId,
                my_team_id: teamId,
                my_rival_id: rivalId,
                locale: true,
                friendly: false
            }
        )

        setShowUpdate(false)

        setErrorInputField(
            {
                season_idError: '',
                my_team_idError: '',
                my_rival_idError: '',
                friendlyError: ''
            }
        )

        setValidInputfield(false)

    };

    const handleUpdateShow = () => {

        setShowUpdate(true)

    };

    //delete modal
    const handleDeleteClose = () => {
        
        setNewGame(
            {
                id: id,
                season_id: seasonId,
                my_team_id: teamId,
                my_rival_id: rivalId,
                locale: true,
                friendly: false
            }
        )

        setShowDelete(false)

        setErrorInputField({
            season_idError: '',
            my_team_idError: '',
            my_rival_idError: '',
            friendlyError: ''
        })

    };

    const handleDeleteShow = () => {

        setShowDelete(true)

    };

    //USEEFFECT
    useEffect(() => {
        //functions to make submit button activated
        //in case that a field is empty
        for(let empty in newGame){
            
            if(newGame[empty] === ""){
                
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

    //manage information for the game and teams implied on it
    useEffect(() => {

        setSeasonsData(seasons);
        setTeamsData(myTeams);

        for (let i = 0 ; i < seasons.length; i++) {

            if(seasonId === seasonsData[i]?.id){

                setSeasonsDate(seasonsData[i]?.season)

                i = seasons.length

            }

        }

        for (let i = 0 ; i < teamsData.length ; i++) {

            if(teamId === teamsData[i]?.id){

                setMyTeam(teamsData[i]?.team_name)

            }
            
            if(rivalId === teamsData[i]?.id){

                setRivalTeam(teamsData[i]?.team_name)

            }

        }
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
    
        if(e.target.name === "season_id" && e.target.value === "default"){

            let value = seasonId

            setNewGame((prevState)=>(
                    {
                        ...prevState,
                        [e.target.name]: value
                    }
                )
            );
        } else if (e.target.name === "my_team_id" && e.target.value === "default"){

            let value = teamId

            setNewGame((prevState)=>(
                    {
                        ...prevState,
                        [e.target.name]: value
                    }
                )
            );
        }else if (e.target.name === "my_rival_id" && e.target.value === "default") {
            
            let value = rivalId

            setNewGame((prevState)=>(
                    {
                        ...prevState,
                        [e.target.name]: value
                    }
                )
            );
        }
        


        setErrorInputField((prevState) => (
                {
                ...prevState,
                [e.target.name + 'Error']: error
                }
            )
        );
    
        setValidInputfield((prevState) => (
                {
                    ...prevState,
                    [e.target.name + 'Valid']: check.valid
                }
            )
        );

        //in case my team and my rival team are the same
        if(newGame.my_team_id === newGame.my_rival_id && newGame.friendly === false && newGame.my_team_id !== teamId){

            setErrorInputField(
                {
                    season_idError: errorInputField.season_idError,
                    my_team_idError: errorInputField.my_team_idError,
                    my_rival_idError: errorInputField.my_rival_idError,
                    friendlyError: 'Only a friendly match allows a team to play versus itself'
                }
            )
        }else if(newGame.my_team_id !== newGame.my_rival_id) {

            setErrorInputField(
                {
                    season_idError: errorInputField.season_idError,
                    my_team_idError: errorInputField.my_team_idError,
                    my_rival_idError: errorInputField.my_rival_idError,
                    friendlyError: ''
                }
            )
        }


    };

    //function to update a team name
    const modGame = () => {

        modifyGame(newGame, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}

                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setErrorInputField(
                        {
                            season_idError: '',
                            my_team_idError: '',
                            my_rival_idError: '',
                            friendlyError: ''
                        }
                    )

                    setValidInputfield(
                        {
                            season_idValid: false,
                            my_team_idValid: false,
                            my_rival_idValid: false,
                        }
                    )

                    setMessage('')

                }, 3000)
                })
            .catch(error => console.log(error))

    }

    //function to delete a team
    const destroyGame = () => {

        deleteGame(newGame, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setErrorInputField(
                        {
                            season_idError: '',
                            my_team_idError: '',
                            my_rival_idError: '',
                            friendlyError: ''
                        }
                    )

                    setValidInputfield(
                        {
                            season_idValid: false,
                            my_team_idValid: false,
                            my_rival_idValid: false,
                        }
                    )

                    setMessage('')

                }, 3000)
                }
            )
            .catch(error => console.log(error))
    };

    const localeCheck = () =>  {

        if(newGame.locale === false){
            setNewGame(
                {
                    id: id,
                    season_id: newGame.season_id,
                    my_team_id: newGame.my_team_id,
                    my_rival_id: newGame.my_rival_id,
                    locale: true,
                    friendly: newGame.friendly
                }
            )
        } else if (newGame.locale === true){
            setNewGame(
                {
                    id: id,
                    season_id: newGame.season_id,
                    my_team_id: newGame.my_team_id,
                    my_rival_id: newGame.my_rival_id,
                    locale: false,
                    friendly: newGame.friendly
                }
            )
        } 
    }

    const friendlyCheck = () =>  {

        if(newGame.friendly === false){
            setNewGame(
                {
                    id: id,
                    season_id: newGame.season_id,
                    my_team_id: newGame.my_team_id,
                    my_rival_id: newGame.my_rival_id,
                    locale: newGame.locale,
                    friendly: true
                }
            )
        } else if (newGame.friendly  === true){
            setNewGame(
                {
                    id: id,
                    season_id: newGame.season_id,
                    my_team_id: newGame.my_team_id,
                    my_rival_id: newGame.my_rival_id,
                    locale: newGame.locale,
                    friendly: false
                }
            )
        } 

    }

    return (
        <>
            <Container fluid>
                <Row className='my-3 mx-2'>
                    <Col xs={2} className='text-start px-1'>
                    {seasonDate}
                    </Col>
                    <Col xs={4} className='text-start'>
                    {localeGame == true ? (<div className='fw-bold'>{myTeam}</div>) : (<div>{rivalTeam}</div>)}
                    </Col>
                    <Col xs={4} className='text-start'>
                    {localeGame == true ? (<div>{rivalTeam}</div>) : (<div className='fw-bold'>{myTeam}</div>)}
                    </Col>
                    <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                    <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
                </Row>
            </Container>
            {
                message === '' ? (
                    <>
                        <Modal show={showUpdate} onHide={() => handleUpdateClose()}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change the data of the game.</Modal.Title>
                            </Modal.Header>                        
                                <Modal.Body>
                                    <div className='my-3 fw-bold'>Season played:</div>
                                    <div className='m-3'>{seasonDate}</div>
                                    <Select
                                        title={'Select a new season'}
                                        name={"season_id"}
                                        dataMap={seasonsData}
                                        required={false}
                                        changeFunction={(e)=>inputHandler(e)}
                                        blurFunction={(e)=>checkError(e)}
                                        error={errorInputField.season_idError}
                                        />
                                    <div className='my-3 fw-bold'>Your team:</div>
                                    <div className='m-3'>{myTeam}</div>
                                    <Select
                                        title={'Select your team'}
                                        name={"my_team_id"}
                                        dataMap={teamsData}
                                        required={false}
                                        changeFunction={(e)=>inputHandler(e)}
                                        blurFunction={(e)=>checkError(e)}
                                        error={errorInputField.my_team_idError}
                                        />
                                    <div className='my-3 fw-bold'>Your rival team:</div>
                                    <div className='m-3'>{rivalTeam}</div>
                                    <Select
                                        title={'Select your team'}
                                        name={"my_rival_id"}
                                        dataMap={teamsData}
                                        required={false}
                                        changeFunction={(e)=>inputHandler(e)}
                                        blurFunction={(e)=>checkError(e)}
                                        error={errorInputField.my_rival_idError}
                                        />
                                    <Form>
                                        <Form.Check className='my-3'
                                            name='locale'
                                            type="switch"
                                            id="custom-switch"
                                            label="As visitor Game"
                                            onClick={() => localeCheck()}
                                            onBlur={(e) => checkError(e)}
                                        />                                            
                                    </Form>
                                    <Form>
                                        <Form.Check className='my-3'
                                            name='friendly'
                                            type="switch"
                                            id="custom-switch"
                                            label="Friendly game"
                                            onClick={() => friendlyCheck()}
                                            onBlur={(e) => checkError(e)}
                                        />                                            
                                    </Form>
                                    <Container className='font fw-bold my-3'>{errorInputField.friendlyError}</Container>
                                </Modal.Body>        
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => handleUpdateClose()}>
                                    Cancel Changes
                                </Button>
                                {
                                    activeSubmit ? (
                                        <Button variant="success" onClick={() => modGame()}>
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
                                <Modal.Title>Do you really want to delete this team?</Modal.Title>
                            </Modal.Header>                        
                                <Modal.Body>
                                    <h4 className='font fw-bold'>Season</h4>
                                    <div>{seasonDate}</div>
                                    <h4 className='font fw-bold'>Locale</h4>
                                    {newGame.locale ? (<div>{myTeam}</div>) : (<div>{rivalTeam}</div>)}
                                    <h4 className='font fw-bold'>Visitor</h4>
                                    {newGame.locale ? (<div>{rivalTeam}</div>) : (<div>{myTeam}</div>)}
                                    {newGame.friendly ? (<h4 className='font fw-bold'>Friendly game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}                                 
                                </Modal.Body>        
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => handleDeleteClose()}>
                                    Not really
                                </Button>
                                <Button variant="success" onClick={() => destroyGame()}>
                                    Delete it
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <>
                    <Modal show={showUpdate} onHide={() => handleUpdateClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change the data of the game.</Modal.Title>
                        </Modal.Header>                        
                            <Modal.Body>                            
                                <h4 className='font fw-bold'>Season</h4>
                                <div>{seasonDate}</div>
                                <h4 className='font fw-bold'>Locale</h4>
                                {newGame.locale ? (<div>{myTeam}</div>) : (<div>{rivalTeam}</div>)}
                                <h4 className='font fw-bold'>Visitor</h4>
                                {newGame.locale ? (<div>{rivalTeam}</div>) : (<div>{myTeam}</div>)}
                                {newGame.friendly ? (<h4 className='font fw-bold'>Friendly game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}                               
                            </Modal.Body>        
                        <Modal.Footer>
                            <h4 className='d-flex justify-content-center font fw-bold'>{message}</h4>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showDelete} onHide={() => handleUpdateClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Do you really want to delete this team?</Modal.Title>
                        </Modal.Header>                        
                        <Modal.Body>                            
                                <h4 className='font fw-bold'>Season</h4>
                                <div>{seasonDate}</div>
                                <h4 className='font fw-bold'>Locale</h4>
                                {newGame.locale ? (<div>{myTeam}</div>) : (<div>{rivalTeam}</div>)}
                                <h4 className='font fw-bold'>Visitor</h4>
                                {newGame.locale ? (<div>{rivalTeam}</div>) : (<div>{myTeam}</div>)}
                                {newGame.friendly ? (<h4 className='font fw-bold'>Friendly game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}                               
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