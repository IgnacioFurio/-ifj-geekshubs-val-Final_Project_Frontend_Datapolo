import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//apicall
import { getAllMyGames, getAllMyGoals, getAllMyPlayers, getAllMyTeams, getAllSeasons } from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TableGoals } from '../../common/TableGoals/TableGoals';
import { Select } from '../../common/Select/Select';
import Form from 'react-bootstrap/Form';
import spiner from '../../assets/waterpolo.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import add from '../../assets/agregar.png';
import { SelectGame } from '../../common/SelectGame/SelectGame';

export const Goals = () => {

        const userDataRdx = useSelector(userData);

        const updateInfo = useSelector(bringData);
    
        const dispatch = useDispatch();
    
        const navigate = useNavigate();
    
        //HOOKS
        const [goalData, setGoalData] = useState([]);

        const [gameData, setGameData] = useState([]);

        const [teamData, setTeamData] = useState([]);
        
        const [playerData, setPlayerData] = useState([]);

        const [seasonData, setSeasonData] = useState([]);

        const [zoneData, setZoneData] = useState([1,2,3,4,5,6,7,8,9]);

        const [capData, setCapData] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13]);
        
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
    
        //set add team modal
        const [showAddGame, setShowAddGame] = useState();
    
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
        const handleAddGameClose = () => {
            
            setNewGoal(
                {
                    user_id: userDataRdx?.userCredentials?.user.id,
                    team_id: '',
                    game_id: '',
                    player_id: '',
                    zone: true,
                    player_nº: false
                }
            )
    
            setShowAddGame(false)
    
            setErrorInputField(
                {
                    team_idError: '',
                    game_idError: '',
                    player_idError: '',
                    player_nºError: ''
                }
            )
    
            setValidInputfield(
                {
                    team_idValid: false,
                    game_idValid: false,
                    player_idValid: false,
                }
            )

            setSubmitActive(false)
    
        };
    
        const handleAddGameShow = () => {
    
            setShowAddGame(true)
    
        };
    
        // USEEFFECT
        useEffect(() => {
            // console.log(teamData);
            // console.log(gameData);
            // console.log(playerData);
            // console.log(seasonData);
        });
        //manage information for the game and teams implied on it
        // useEffect(() => {

        //     for (let i = 0 ; i < seasonData?.length; i++) {

        //         if(newGoal?.team_id == seasonData[i]?.id){

        //             setSeason(seasonData[i].season)

        //             i = season.length

        //         }
        //     }

        //     for (let i = 0 ; i < teamData.length ; i++) {

        //         if(newGoal?.game_id == teamData[i]?.id){

        //             setTeam1(teamData[i].team_name)

        //         }
                
        //         if (newGoal?.player_id == teamData[i]?.id){

        //             setTeam2(teamData[i]?.team_name)

        //         }

        //     }
        // }, [newGoal]);

        useEffect(() => {
            //in case that a field is empty
            for(let empty in newGoal){

                if(newGoal[empty] === ''){

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

            if(goalData.length === 0){    
                
                try {
                    
                    getAllMyGoals(userDataRdx?.userCredentials?.token)
                        .then(
                            result => {                                    
                                let data = Object.values(result.data.data)

                                setGoalData(data.flat(2))    
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

                    getAllMyGames(userDataRdx?.userCredentials?.token)
                    .then(
                        result => {                                    
                            let data = Object.values(result.data.data)

                            setGameData(data.flat(2))    
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
    
        }, [goalData]);
    
        useEffect(() => {

            if(updateInfo?.updatedData?.success){

                setGoalData([]);
    
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

        };
    
        const createGame = () => {
    
            createnewGoal(newGoal, userDataRdx?.userCredentials?.token)
                .then(backendCall=> {                

                    setMessage(backendCall.data.message)
        
                    let success = {success: backendCall.data.success}
                    
                    setTimeout(() => {
                            
                        dispatch(reload({updatedData: success}))
                        
                        setNewGoal(
                            {
                                user_id: userDataRdx?.userCredentials?.user.id,
                                team_id: '',
                                game_id: '',
                                player_id: '',
                                zone: true,
                                player_nº: false
                            }
                        )

                        setErrorInputField(
                            [{
                                team_idError: '',
                                game_idError: '',
                                player_idError: '',
                                player_nºError: ''
                            }]
                        )
        
                        setValidInputfield(
                            [{
                                team_idValid: false,
                                game_idValid: false,
                                player_idValid: false,
                            }]
                        )
        
                        setShowAddGame(false)
        
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
                    <h2 className='font fw-bold'>Your Goals</h2>
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end fw-bold text-primary'>
                        <p>Add Goal</p>
                    </Col>
                    <Col xs={1}>
                        <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddGameShow()}/>
                    </Col>
                    <hr className='font fw-bold'></hr>
                </Row>
                    {
                        goalData.length === 0 ? (
                            <>                            
                                <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                                <h3 className='font fw-bold'>Looking for your information.</h3>                            
                            </>
                        ) : (
                            <>
                                <Container>  
                                    <Row className='d-flex justify-content-start my-2'>
                                        <Col xs={3} className='d-flex justify-content-center font fw-bold'>
                                            Game
                                        </Col>
                                        <Col xs={3} className='d-flex justify-content-center font fw-bold'>
                                            Team
                                        </Col>
                                        <Col xs={3} className='d-flex justify-content-center font fw-bold'>
                                            Player and cap 
                                        </Col>
                                        <Col xs={2}></Col>                    
                                    </Row>                          
                                    <Row>
                                        {goalData.map(data =>
                                                {
                                                    return <TableGoals
                                                                key={data.id}
                                                                id={data.id} 
                                                                gameId={data.game_id}
                                                                teamId={data.team_id} 
                                                                playerId={data.player_id}
                                                                zones= {data.zone}
                                                                capNumbers={data.player_nº}
                                                                teamsInfo={teamData}
                                                                gamesInfo={gameData}
                                                                playersInfo={playerData}
                                                                seasonsInfo={seasonData}
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
                                        <Modal.Title>Add a new goal for your data.</Modal.Title>
                                    </Modal.Header>                        
                                        <Modal.Body>                                            
                                            <SelectGame
                                                title={'Select a game.'}
                                                name={"game_id"}
                                                gamesDataMap={gameData}
                                                seasonsData={seasonData}
                                                teamsData={teamData}
                                                required={true}
                                                changeFunction={()=>{}}
                                                blurFunction={()=>{}}
                                                error={errorInputField.team_idError}
                                                />
                                            <Select
                                                title={'Select a team.'}
                                                name={"team_id"}
                                                dataMap={teamData}
                                                required={true}
                                                changeFunction={(e)=>inputHandler(e)}
                                                blurFunction={(e)=>checkError(e)}
                                                error={errorInputField.game_idError}
                                                />
                                            <Select
                                                title={'Select a player.'}
                                                name={"player_id"}
                                                dataMap={playerData}
                                                required={true}
                                                changeFunction={(e)=>inputHandler(e)}
                                                blurFunction={(e)=>checkError(e)}
                                                error={errorInputField.player_idError}
                                                />
                                            
                                            <Container className='font fw-bold my-3'>{errorInputField.player_nºError}</Container>
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
                                            <h4 className='font fw-bold'>zone</h4>
                                            {newGoal.zone ? (<div>{team1}</div>) : (<div>{team2}</div>)}
                                            <h4 className='font fw-bold'>Visitor</h4>
                                            {newGoal.zone ? (<div>{team2}</div>) : (<div>{team1}</div>)}
                                            {newGoal.player_nº ? (<h4 className='font fw-bold'>player_nº game</h4>) : (<h4 className='font fw-bold'>Official game</h4>)}
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