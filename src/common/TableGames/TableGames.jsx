import React, { useEffect, useState } from 'react'
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../pages/Slices/userSlice';
import { reload } from '../../pages/Slices/reloadSlice';
//apicall
import { createNewGoal, deleteGame, getAllMyGoalsByTeamIdAndGameId, modifyGame } from '../../services/apiCalls';
//render
import { TableGoals } from '../TableGoals/TableGoals';
import { Select } from '../Select/Select';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import info from '../../assets/info.png';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import add from '../../assets/agregar.png';
import './TableGames.css'


export const TableGames = ({id, seasons, seasonId, myTeams, myPlayers, teamId, rivalId, locale, friendly, blurFunction}) => {

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

    const [ newGoal, setNewGoal] = useState(
        {
            team_id: '',
            game_id: id,
            player_id: '',
            zone: '',
            player_nº: ''
        }
    );

    const [checkMyGoals, setCheckMyGoals] = useState(
        {
            team_id: teamId,
            game_id: id
        }
    );

    const [myGoals, setMyGoals] = useState([]);

    const [checkRivalGoals, setCheckRivalGoals] = useState(
        {
            team_id: rivalId,
            game_id: id
        }
    );

    const [rivalGoals, setRivalGoals] = useState([]);

    const [ teamsData, setTeamsData ] = useState([]);

    const [ seasonsData, setSeasonsData ] = useState([]);

    const [ seasonDate, setSeasonsDate] = useState('');

    const [ myTeam, setMyTeam ] = useState('');

    const [ rivalTeam, setRivalTeam ] = useState('');

    const [zoneData, setZoneData] = useState([1,2,3,4,5,6,7,8,9]);
    const [zoneDataInformation, setZoneDataInformation] = useState('');

    const [capData, setCapData] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13]);

    const localeGame = locale;

    //set info modal
    const [showInfo, setShowInfo] = useState(false);

    //set add game modal
    const[showAddGame, setShowAddGame] = useState(false);

    //set add goal modal
    const[showAddGoal, setShowAddGoal] = useState(false);

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
    
    const inputHandlerGoal = (e) => {

        setNewGoal((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }
    //info modal
    const handleInfoClose = () => {

        setShowInfo(false)
        setShowAddGame(false)
        setShowAddGoal(false)
        setZoneDataInformation('')
        setMessage('');

        setNewGame(
            {
                team_id: '',
                game_id: id,
                player_id: '',
                zone: '',
                player_nº: ''
            }
        )
    };
    
    const handleInfoShow = () => {
        
        getAllMyGoalsByTeamIdAndGameId(checkMyGoals, userDataRdx?.userCredentials?.token)
        .then(
            result => {   
                setMyGoals(result.data.data)    
            }
            
        )
        .catch(error => console.log(error));

        getAllMyGoalsByTeamIdAndGameId(checkRivalGoals, userDataRdx?.userCredentials?.token)
            .then(
                result => {    
                    setRivalGoals(result.data.data)    
                }
                
            )
            .catch(error => console.log(error));

        setShowInfo(true)                

    };

    const handleAddGoalShow = () =>{

        setShowAddGoal(true)

    }

    //add game modal
    const handleAddGameClose = () => {

        setShowAddGame(false)
        setMessage('');

    };

    const handleAddGameShow = () => {

        setShowAddGame(true);
        
    };

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

        setValidInputfield(
            {
                season_idValid: false,
                my_team_idValid: false,
                my_rival_idValid: false,
            }
        )

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

    //manage field zone information
    const inputFieldHandler = (e) => {

        setNewGoal(
            {
                team_id: newGoal.team_id,
                game_id: id,
                player_id: newGoal.player_id,
                zone: e.target.title,
                player_nº: newGoal.player_nº
            }
        );

    }

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
    }, [newGame]);

    useEffect(()=>{
        //functions to make submit button activated
        //in case that a field is empty
        for(let empty in newGoal){
            
            if(newGoal[empty] === ""){
                
                setSubmitActive(false);
                
                return;
            };
        };

        setSubmitActive(true);

    },[newGoal])

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

    //function to agg goal
    const addGoal = () => {

        createNewGoal(newGoal, userDataRdx?.userCredentials?.token)
            .then(backendCall=> {                
                console.log(backendCall.data);
                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}

                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setMessage('')

                }, 3000)
                })
            .catch(error => console.log(error))
    };

    //function to update a team name
    const modGame = () => {

        modifyGame(newGame, userDataRdx?.userCredentials?.token)
            .then(backendCall=> {                

                setMessage(backendCall.data.message)

                let success = {success: backendCall.data.success}
                
                setTimeout(() => {
                    
                    dispatch(reload({updatedData: success}))

                    setNewGame(
                        {
                            id: id,
                            season_id: seasonId,
                            my_team_id: teamId,
                            my_rival_id: rivalId,
                            locale: true,
                            friendly: false
                        }
                    );
                
                    setErrorInputField(
                        {
                            season_idError: '',
                            my_team_idError: '',
                            my_rival_idError: '',
                            friendlyError: ''
                        }
                    );
                
                    setValidInputfield(
                        {
                            season_idValid: false,
                            my_team_idValid: false,
                            my_rival_idValid: false,
                        }
                    );

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

                    setNewGame(
                        {
                            id: id,
                            season_id: seasonId,
                            my_team_id: teamId,
                            my_rival_id: rivalId,
                            locale: true,
                            friendly: false
                        }
                    );

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
                    <Col xs={1} className='text-center px-1'>
                    {seasonDate}
                    </Col>
                    <Col xs={4} className='text-center'>
                    {localeGame == true ? (<div className='fw-bold'>{myTeam}</div>) : (<div>{rivalTeam}</div>)}
                    </Col>
                    <Col xs={4} className='text-center'>
                    {localeGame == true ? (<div>{rivalTeam}</div>) : (<div className='fw-bold'>{myTeam}</div>)}
                    </Col>
                    <Col xs={1}><img src={info} alt="update" className='infoIcon' onClick={() => handleInfoShow()}/></Col>                    
                    <Col xs={1}><img src={update} alt="update" className='updateIcon' onClick={() => handleUpdateShow()}/></Col>                    
                    <Col xs={1}><img src={del} alt="delete" className='deleteIcon' onClick={() => handleDeleteShow()}/></Col>
                </Row>
            </Container>
            {
                message === '' ? (
                    <>
                        <Modal show={showInfo} onHide={() => handleInfoClose()}>
                            {
                                !showAddGoal ? (
                                    <>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Information about the game.</Modal.Title>
                                        </Modal.Header>                        
                                            <Modal.Body>
                                                <div className='font fw-bold'>Result</div> 
                                                <hr />                               
                                                <div className='d-flex my-2'>
                                                    <div className='d-flex mx-2 fw-bold'>{myTeam}:</div>
                                                    <div className='d-flex mx-2 fontNoHover fw-bold'>{myGoals.length}</div>                                        
                                                </div>  
                                                <TableGoals
                                                    game_id={id}
                                                    team_id={teamId}
                                                    myPlayers={myPlayers}
                                                /> 
                                                <hr />
                                                <div className='d-flex my-2'>
                                                    <div className='d-flex mx-2'>{rivalTeam}:</div>
                                                    <div className='d-flex mx-2 fontNoHover fw-bold'>{rivalGoals.length}</div>                                        
                                                </div>
                                                <TableGoals
                                                    game_id={id}
                                                    team_id={rivalId}
                                                    myPlayers={myPlayers}
                                                /> 
                                            </Modal.Body>        
                                        <Modal.Footer>
                                            <div xs={2} className='d-flex justify-content-end fw-bold text-primary'>Add goal</div>
                                            <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddGoalShow()}/>
                                        </Modal.Footer>
                                    </>
                                ) : (
                                    <>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add a new goal for this game.</Modal.Title>
                                        </Modal.Header>                        
                                            <Modal.Body>
                                            <div>Filled all the fields and click in one zone of the waterpolo field below to unlock the submit button.</div>
                                            <div className='font fw-bold'>Select a team to add a goal.</div>
                                            <select name={'team_id'} className={'form-select my-1 py-2'} onChange={(e)=>inputHandlerGoal(e)}>
                                                <option value={"default"} >----------</option>
                                                <option value={teamId}>{myTeam}</option>
                                                <option value={rivalId}>{rivalTeam}</option>
                                            </select>
                                            <div className='font fw-bold'>Select a player who made the goal.</div>
                                            <select name={'player_id'} className={'form-select my-1 py-2'} onChange={(e)=>inputHandlerGoal(e)}>
                                                <option value={"default"} >----------</option>
                                                {
                                                    myPlayers.map(data => 
                                                            {
                                                                return <option  key={data.id} value={data.id}>
                                                                            {data.name}
                                                                        </option>
                                                            }
                                                        )
                                                }
                                            </select>
                                            <div className='font fw-bold'>Select the number of the player.</div>
                                            <select name={'player_nº'} className={'form-select my-1 py-2'} onChange={(e)=>inputHandlerGoal(e)}>
                                                <option value={"default"} >----------</option>
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
                                            <div className='font fw-bold my-2'>Click where the goal came from.</div>
                                            <Container className='water'>
                                                <Row>
                                                    <Col xs={4} className='zone1' title={1} onClick={(e)=>inputFieldHandler(e)}></Col>
                                                    <Col xs={4} className='d-flex justify-content-center zone2' title={2} onClick={(e)=>inputFieldHandler(e)}> 
                                                        <div className=' goal'></div>
                                                    </Col>
                                                    <Col xs={4} className='zone3' title={3} onClick={(e)=>inputFieldHandler(e)}></Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={4} className='zone4' title={4} onClick={(e)=>inputFieldHandler(e)}></Col>
                                                    <Col xs={4} className='zone5 text-center font fw-bold' title={5} onClick={(e)=>inputFieldHandler(e)}>4m</Col>
                                                    <Col xs={4} className='zone6' title={6} onClick={(e)=>inputFieldHandler(e)}></Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={4} className='zone7' title={7} onClick={(e)=>inputFieldHandler(e)}></Col>
                                                    <Col xs={4} className='zone8 text-center font fw-bold' title={8} onClick={(e)=>inputFieldHandler(e)}>7m</Col>
                                                    <Col xs={4} className='zone9' title={9} onClick={(e)=>inputFieldHandler(e)}></Col>
                                                </Row>
                                            </Container>
                                            </Modal.Body>        
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={() => handleInfoClose()}>
                                                Cancel Changes
                                            </Button>
                                            {
                                                activeSubmit ? (
                                                    <Button variant="success" onClick={() => addGoal()}>
                                                        Save Changes
                                                    </Button>
                                                ) : (
                                                    <Button variant="secondary">
                                                        Save Changes
                                                    </Button>
                                                )
                                            }
                                        </Modal.Footer>
                                    </>
                                )
                            }                            
                        </Modal>
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
                        <Modal show={showAddGoal} onHide={() => handleInfoClose()}>                           
                            <Modal.Header closeButton>
                                <Modal.Title>Add a new goal for this game.</Modal.Title>
                            </Modal.Header>                        
                                <Modal.Body>
                                </Modal.Body>        
                            <Modal.Footer>
                                <h4 className='d-flex justify-content-center font fw-bold'>{message}</h4>
                            </Modal.Footer>                           
                        </Modal>
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