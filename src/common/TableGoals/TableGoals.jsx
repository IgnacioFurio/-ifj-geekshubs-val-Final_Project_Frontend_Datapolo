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
import './TableGoals.css'


export const TableGoals = ({id, gameId, teamId, playerId , zones, capNumbers, teamsInfo, gamesInfo, playersInfo, seasonsInfo, blurFunction}) => {

    const dispatch = useDispatch();

    const userDataRdx = useSelector(userData);

    //HOOKS
    const [newGoal, setNewGoal] = useState(
        {
            team_id: '',
            game_id: '',
            player_id: '',
            zone: true,
            player_nº: false
        }
    );

    const [errorInputField, setErrorInputField] = useState(
        {
            team_id: '',
            game_id: '',
            player_id: '',
            zone: '',
            player_nº: ''
        }
    );

    const [validInputField, setValidInputfield] = useState(
        {
            team_id: false,
            game_id: false,
            player_id: false,
            zone: false,
            player_nº: false
        }
    );
    const [ teamsData, setTeamsData ] = useState([]);

    const [ gamesData, setGamesData ] = useState([]);

    const [ playersData, setPlayersData ] = useState([]);

    const [seasonsData, setSeasonsData] = useState([]);

    const [ myTeam, setMyTeam ] = useState('');
    
    const [ myPlayer, setMyPlayer ] = useState('');
    
    const [ myRivalId, setMyRivalId ] = useState('');
    const [ myRivalName, setMyRivalName ] = useState('');
    
    const [ seasonId, setSeasonId] = useState('');
    const [ seasonDate, setSeasonDate] = useState('');

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
        
        setNewGoal((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //update modal 
    const handleUpdateClose = () => {
        
        setNewGoal(
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
                team_id: '',
                game_id: '',
                player_id: '',
                zone: '',
                player_nº: ''
            }
        )

        setValidInputfield(
            {
                team_id: false,
                game_id: false,
                player_id: false,
                zone: false,
                player_nº: false
            }
        )

    };

    const handleUpdateShow = () => {

        setShowUpdate(true)

    };

    //delete modal
    const handleDeleteClose = () => {
        
        setNewGoal(
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

        setErrorInputField(
            {
                team_id: '',
                game_id: '',
                player_id: '',
                zone: '',
                player_nº: ''
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
        for(let empty in newGoal){
            
            if(newGoal[empty] === ""){
                
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

        setTeamsData(teamsInfo);
        setGamesData(gamesInfo)
        setPlayersData(playersInfo)
        setSeasonsData(seasonsInfo)

        console.log(seasonId);
        console.log('seasonsData',seasonsData);
        console.log('seasonDate',seasonDate);
        
        for (let i = 0 ; i < gamesData?.length ; i++) {
            
            if(gameId === gamesData[i]?.id){
                
                setMyRivalId(gamesData[i]?.my_rival_id)
                setSeasonId(gamesData[i]?.season_id)
                
            }
            
        }

        for (let i = 0 ; i < teamsData?.length ; i++) {

            if(teamId === teamsData[i]?.id){

                setMyTeam(teamsData[i]?.team_name)

            }
            
            if(myRivalId === teamsData[i]?.id){

                setMyRivalName(teamsData[i]?.team_name)
                
            }

        }

        for (let i = 0 ; i < playersData?.length ; i++) {

            if(playerId === playersData[i]?.id){

                setMyPlayer(playersData[i]?.name)

            }

        }

        for (let i = 0 ; i < seasonsData?.length ; i++) {

            if(seasonId === seasonsData[i]?.id){

                setSeasonDate(seasonsData[i]?.season)

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

            setNewGoal((prevState)=>(
                    {
                        ...prevState,
                        [e.target.name]: value
                    }
                )
            );
        } else if (e.target.name === "my_team_id" && e.target.value === "default"){

            let value = teamId

            setNewGoal((prevState)=>(
                    {
                        ...prevState,
                        [e.target.name]: value
                    }
                )
            );
        }else if (e.target.name === "my_rival_id" && e.target.value === "default") {
            
            let value = rivalId

            setNewGoal((prevState)=>(
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

    };

    //function to update a team name
    const modGame = () => {

        modifyGame(newGoal, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}

                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setErrorInputField(
                        {
                            team_id: '',
                            game_id: '',
                            player_id: '',
                            zone: '',
                            player_nº: ''
                        }
                    )

                    setValidInputfield(
                        {
                            team_id: false,
                            game_id: false,
                            player_id: false,
                            zone: false,
                            player_nº: false
                        }
                    )

                    setMessage('')

                }, 3000)
                })
            .catch(error => console.log(error))

    }

    //function to delete a team
    const destroyGame = () => {

        deleteGame(newGoal, userDataRdx.userCredentials.token)
            .then(backendCall=> {                
                
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setErrorInputField(
                        {
                            team_id: '',
                            game_id: '',
                            player_id: '',
                            zone: '',
                            player_nº: ''
                        }
                    )

                    setValidInputfield(
                        {
                            team_id: false,
                            game_id: false,
                            player_id: false,
                            zone: false,
                            player_nº: false
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
                <Row className='my-3'>
                    <Col xs={3} className='text-center'>
                        {seasonDate}: {myRivalName}
                    </Col>
                    <Col xs={3} className='text-center'>
                        {myTeam}
                    </Col>
                    <Col xs={3} className='text-center'>
                        {myPlayer}, {capNumbers}
                    </Col>
                    <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                    <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
                </Row>
            </Container>
            {/* {
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
                                        dataMap={gamesData}
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
                                    <div className='m-3'>{myGame}</div>
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
                                    <h4 className='font fw-bold'>Locale</h4>
                                    <h4 className='font fw-bold'>Visitor</h4>
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
                                {newGoal.locale ? (<div>{myTeam}</div>) : (<div>{myGame}</div>)}
                                <h4 className='font fw-bold'>Visitor</h4>
                                {newGoal.locale ? (<div>{myGame}</div>) : (<div>{myTeam}</div>)}
                                {newGoal.friendly ? (<h4 className='font fw-bold'>Friendly game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}                               
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
                                {newGoal.locale ? (<div>{myTeam}</div>) : (<div>{myGame}</div>)}
                                <h4 className='font fw-bold'>Visitor</h4>
                                {newGoal.locale ? (<div>{myGame}</div>) : (<div>{myTeam}</div>)}
                                {newGoal.friendly ? (<h4 className='font fw-bold'>Friendly game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}                               
                            </Modal.Body>         
                        <Modal.Footer>
                            <h4 className='d-flex justify-content-center font fw-bold'>{message}</h4>
                        </Modal.Footer>
                    </Modal>
                </>
                )
            } */}
            
        </>
    )
};