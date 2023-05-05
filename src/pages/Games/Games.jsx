import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//apicall
import { getAllMyGames, getAllMyTeams, getAllSeasons } from '../../services/apiCalls';
//helper
import { validate } from '../../helpers/useful';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TableGames } from '../../common/TableGames/TableGames';
import { Input } from '../../common/Input/Input';
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

        const [seasonData, setSeasonData] = useState([]);
    
        const [newGame, setNewGame] = useState(
            {
                user_id: userDataRdx?.userCredentials?.user.id,
                season_id: '',
                my_team_id: '',
                my_rival_id: '',
                locale: false,
                friendly: false
            }
        );
    
        const [errorInputField, setErrorInputField] = useState(
            {
                season_idError: '',
                my_team_idError: '',
                my_rival_idError: ''
            }
        );
    
        const [validInputField, setValidInputfield] = useState(
            {
                season_idValid: '',
                my_team_idValid: '',
                my_rival_idValid: '',
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
                    locale: false,
                    friendly: false
                }
            )
    
            setShowAddGame(false)
    
            setErrorInputField(
                {
                    season_idError: '',
                    my_team_idError: '',
                    my_rival_idError: '',
                }
            )
    
            setValidInputfield(
                {
                    season_idValid: '',
                    my_team_idValid: '',
                    my_rival_idValid: '',
                }
            )

            setSubmitActive(false)
    
        };
    
        const handleAddPlayerShow = () => {
    
            setShowAddGame(true)
    
        };
    
        // USEEFFECT
        useEffect(() => {
            console.log(newGame);
            console.log(errorInputField);
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
    
            if(gameData.length === 0){
    
                dispatch(reload({updatedData: {}}))
    
                try {
                    
                        getAllMyGames(userDataRdx?.userCredentials?.token)
                            .then(
                                result => {
                                    setGameData(result.data.data.flat(2))                      
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
                } catch (error) {
                    
                    setShowAddGame(true)
                }     
            };
    
        },[]);
    
        useEffect(() => {
    
            if(updateInfo?.updatedData?.success){
    
                setGameData([]);
    
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
    
        const createPlayer = () => {
    
            createnewGame(newGame, userDataRdx?.userCredentials?.token)
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
                        }
                    )
    
                    setValidInputfield(
                        {
                            season_idValid: '',
                            my_team_idValid: '',
                            my_rival_idValid: ''
                        }
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
                        season_id: '',
                        my_team_id: '',
                        my_rival_id: '',
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
                        season_id: '',
                        my_team_id: '',
                        my_rival_id: '',
                        locale: newGame.locale,
                        friendly: false
                    }
                )
            } 
        }

        return (
            <>
            <Container fluid>
                <Row className='mt-5 mb-3'>
                    <Col xs={9} className='d-flex justify-content-start '>
                    <h2 className='font fw-bold'>Your Games</h2>
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end fw-bold text-primary'>
                        <p>Add Game</p>
                    </Col>
                    <Col xs={1}>
                        <img src={add} className="updateIcon" alt="addIcon" onClick={() => handleAddPlayerShow()}/>
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
                                <Row className='teamId my-3 mx-2'>
                                    <Col xs={2} className='d-flex justify-content-start'></Col>
                                    <Col xs={4} className='d-flex justify-content-start font fw-bold'>
                                    Local
                                    </Col>
                                    <Col xs={4} className='d-flex justify-content-start font fw-bold'>
                                    Visitor
                                    </Col>
                                    <Col xs={2}></Col>                    
                                </Row>                          
                                    <Row>
                                        {gameData.map(data =>
                                                {
                                                    return <TableGames 
                                                                key={data.id} 
                                                                seasons={seasonData}
                                                                seasonId={data.season_id}
                                                                myTeams={teamData} 
                                                                teamId= {data.my_team_id}
                                                                rivalId={data.my_rival_id}
                                                                locale={data.locale}
                                                                friendly={data.friendly}
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
                                                <Form.Check // prettier-ignore
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="Locale Game"
                                                    onClick={() => localeCheck()}
                                                />                                            
                                            </Form>
                                            <Form>
                                                <Form.Check // prettier-ignore
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="Friendly game"
                                                    onClick={() => friendlyCheck()}
                                                />                                            
                                            </Form>
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
                                <Modal show={showAddGame} onHide={() => handleAddGameClose()}>
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