import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//apicall
import { createNewGame, getAllMyGames, getAllMyPlayers, getAllMyTeams, getAllSeasons } from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TableGames } from '../../common/TableGames/TableGames';
import { Select } from '../../common/Select/Select';
import Form from 'react-bootstrap/Form';
import spiner from '../../assets/waterpolo.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import add from '../../assets/agregar.png';

export const Games = () => {

        const userDataRdx = useSelector(userData);

        const updateInfo = useSelector(bringData);
    
        const dispatch = useDispatch();
    
        const navigate = useNavigate();
    
        //HOOKS
        const [gameData, setGameData] = useState([]);

        const [teamData, setTeamData] = useState([]);
        const [team1, setTeam1] = useState('');
        const [team2, setTeam2] = useState('');

        const [seasonData, setSeasonData] = useState([]);
        const [season, setSeason] = useState('')

        const [playerData, setPlayerData] = useState([]); 
        
        const [newGame, setNewGame] = useState(
            {
                user_id: userDataRdx?.userCredentials?.user.id,
                season_id: '',
                my_team_id: '',
                my_rival_id: '',
                locale: true,
                friendly: false
            }
        );
    
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
    
        //set add team modal
        const [showAddGame, setShowAddGame] = useState();
    
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
        const handleAddGameClose = () => {
            
            setNewGame(
                {
                    user_id: userDataRdx?.userCredentials?.user.id,
                    season_id: '',
                    my_team_id: '',
                    my_rival_id: '',
                    locale: true,
                    friendly: false
                }
            )
    
            setShowAddGame(false)
    
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

            setSubmitActive(false)
    
        };
    
        const handleAddGameShow = () => {
    
            setShowAddGame(true)
    
        };
    
        // USEEFFECT
        //manage information for the game and teams implied on it
        useEffect(() => {

            for (let i = 0 ; i < seasonData?.length; i++) {

                if(newGame?.season_id == seasonData[i]?.id){

                    setSeason(seasonData[i].season)

                    i = season.length

                }
            }

            for (let i = 0 ; i < teamData.length ; i++) {

                if(newGame?.my_team_id == teamData[i]?.id){

                    setTeam1(teamData[i].team_name)

                }
                
                if (newGame?.my_rival_id == teamData[i]?.id){

                    setTeam2(teamData[i]?.team_name)

                }

            }
        }, [newGame]);

        useEffect(() => {
            //in case that a field is empty
            for(let empty in newGame){

                if(newGame[empty] === ''){

                    return setSubmitActive(false);

                }
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

        })

        useEffect(() => {

            dispatch(reload({updatedData: {}}))

            if(gameData.length === 0){    
                
                try {
                    
                    getAllMyGames(userDataRdx?.userCredentials?.token)
                        .then(
                            result => {                                    
                                let data = Object.values(result.data.data)

                                setGameData(data.flat(2))    
                            }
                            
                        )
                        .catch(error => console.log(error));
                            
                    getAllMyTeams(userDataRdx?.userCredentials?.user?.id ,userDataRdx?.userCredentials?.token)
                        .then(
                            result => {
                                setTeamData(result.data.data)                      
                            }
                            
                        )
                        .catch(error => console.log(error));

                    getAllSeasons(userDataRdx?.userCredentials?.token)
                        .then(
                            result => {
                                setSeasonData(result.data.data)                      
                            }
                            
                        )
                        .catch(error => console.log(error));
                    
                    getAllMyPlayers(userDataRdx?.userCredentials?.user?.id ,userDataRdx?.userCredentials?.token)
                    .then(
                        result => {
                            setPlayerData(result.data.data)                      
                        }
                        
                    )
                    .catch(error => console.log(error));

                } catch (error) {
                    
                    setShowAddGame(true)
                }     
            };
    
        }, [gameData]);
    
        useEffect(() => {

            if(updateInfo?.updatedData?.success){

                setGameData([]);
    
            };
        },[updateInfo]);
    
        //FUNCTIONS
        const checkError = (e) => {

            let error = "";
        
            let check = validate(
                e.target.name,
                e.target.value,
                e.target.required
                );
                

            error = check.message
        
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
            if(newGame.my_team_id === newGame.my_rival_id && newGame.friendly === false && newGame.my_team_id !== ""){

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
    
        const createGame = () => {
    
            createNewGame(newGame, userDataRdx?.userCredentials?.token)
                .then(backendCall=> {                

                    setMessage(backendCall.data.message)
        
                    let success = {success: backendCall.data.success}
                    
                    setTimeout(() => {
                            
                        dispatch(reload({updatedData: success}))
                        
                        setNewGame(
                            {
                                user_id: userDataRdx?.userCredentials?.user.id,
                                season_id: '',
                                my_team_id: '',
                                my_rival_id: '',
                                locale: true,
                                friendly: false
                            }
                        )

                        setErrorInputField(
                            [{
                                season_idError: '',
                                my_team_idError: '',
                                my_rival_idError: '',
                                friendlyError: ''
                            }]
                        )
        
                        setValidInputfield(
                            [{
                                season_idValid: false,
                                my_team_idValid: false,
                                my_rival_idValid: false,
                            }]
                        )
        
                        setShowAddGame(false)
        
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
                        user_id: userDataRdx?.userCredentials?.user.id,
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
                        user_id: userDataRdx?.userCredentials?.user.id,
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
                        user_id: userDataRdx?.userCredentials?.user.id,
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
                        user_id: userDataRdx?.userCredentials?.user.id,
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
                <Row className='font fw-bold text-start pt-3'>
                    If you want to know more about the game, like the information about the goals, just click the information button to the side of the game.
                </Row>
                <Row className='font fw-bold text-start pt-3'>
                    Teams resalted are your own teams.
                </Row>
                <Row className='mt-5 mb-3'>
                    <Col xs={9} className='d-flex justify-content-start '>
                    <h2 className='font fw-bold'>Your Games</h2>
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end fw-bold text-primary'>
                        <p>Add Game</p>
                    </Col>
                    <Col xs={1}>
                        <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddGameShow()}/>
                    </Col>
                    <hr className='font fw-bold'></hr>
                </Row>
                    {
                        gameData.length === 0 ? (
                            <>                            
                                <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                                <h3 className='font fw-bold'>Looking for your information.</h3>                            
                            </>
                        ) : (
                            <>
                                <Container>  
                                <Row className='my-3 '>
                                    <Col xs={1} className='d-flex justify-content-center'></Col>
                                    <Col xs={4} className='d-flex justify-content-center font fw-bold'>
                                    Locale
                                    </Col>
                                    <Col xs={4} className='d-flex justify-content-center font fw-bold'>
                                    Visitor
                                    </Col>
                                    <Col xs={3}></Col>                    
                                </Row>                          
                                    <Row>
                                        {gameData.map(data =>
                                                {
                                                    return <TableGames 
                                                                key={data.id}
                                                                id={data.id}
                                                                data={gameData} 
                                                                seasons={seasonData}
                                                                seasonId={data.season_id}
                                                                myTeams={teamData} 
                                                                myPlayers={playerData}
                                                                teamId= {data.my_team_id}
                                                                rivalId={data.my_rival_id}
                                                                locale={data.locale}
                                                                friendly={data.friendly}
                                                                blurFunction={(e) => checkError(e)}
                                                                />
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
                            <Modal show={showAddGame} onHide={() => handleAddGameClose()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new game for your data.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>                                            
                                            <Select
                                                title={'Select the season'}
                                                name={"season_id"}
                                                dataMap={seasonData}
                                                required={true}
                                                changeFunction={(e)=>inputHandler(e)}
                                                blurFunction={(e)=>checkError(e)}
                                                error={errorInputField.season_idError}
                                                />
                                            <Select
                                                title={'Select your team'}
                                                name={"my_team_id"}
                                                dataMap={teamData}
                                                required={true}
                                                changeFunction={(e)=>inputHandler(e)}
                                                blurFunction={(e)=>checkError(e)}
                                                error={errorInputField.my_team_idError}
                                                />
                                            <Select
                                                title={'Select your rival'}
                                                name={"my_rival_id"}
                                                dataMap={teamData}
                                                required={true}
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
                                        <Button variant="danger" onClick={() => handleAddGameClose()}>
                                            Cancel Changes
                                        </Button>
                                        {
                                            activeSubmit ? (
                                                <Button variant="success" onClick={() => createGame()}>
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
                                <Modal show={showAddGame} onHide={() => handleAddGameClose()}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a new game for your data.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>
                                            <h4 className='font fw-bold'>Season</h4>
                                            <div>{season}</div>
                                            <h4 className='font fw-bold'>Locale</h4>
                                            {newGame.locale ? (<div>{team1}</div>) : (<div>{team2}</div>)}
                                            <h4 className='font fw-bold'>Visitor</h4>
                                            {newGame.locale ? (<div>{team2}</div>) : (<div>{team1}</div>)}
                                            {newGame.friendly ? (<h4 className='font fw-bold'>Friendly game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}
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