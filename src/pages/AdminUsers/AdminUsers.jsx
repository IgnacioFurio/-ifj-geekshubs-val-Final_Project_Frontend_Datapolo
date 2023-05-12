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
import teams from '../../assets/Teams2.jpg';


export const AdminUsers = () => {

    const userDataRdx = useSelector(userData);

    const updateInfo = useSelector(bringData);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //HOOKS
    const [usersData, setusersData] = useState([]);

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

    //
    // USEEFFECT
    useEffect(() => {

        if(usersData.length === 0){

            dispatch(reload({updatedData: {}}))

            try {
                setTimeout(() => {
                
                    getAllMyTeams(userDataRdx?.userCredentials?.user?.id ,userDataRdx?.userCredentials?.token)
                        .then(
                            result => {
                                setusersData(result.data.data)                      
                            }
                            
                        )
                        .catch(error => console.log(error));
                            
                        }, 3000)
            } catch (error) {
                
                console.log(error);
            }
            
            

        };

    },[usersData]);

    useEffect(() => {

        if(updateInfo?.updatedData?.success){

            setusersData([]);

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

    return (
        <>
        <Container fluid>
            <Row>
                <Col>
                    <img src={teams} class="img-fluid mb-3 rounded-bottom" alt="..."></img>
                </Col>
            </Row>
            <Row className='mt-5 mb-3'>
                <Col className='d-flex justify-content-start '>
                <h2 className='font fw-bold'>Users</h2>
                </Col>                
                <hr className='font fw-bold'></hr>
            </Row>
                {
                    usersData.length === 0 ? (
                        <>                            
                            <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                            <h3 className='font fw-bold'>Looking for the information to come.</h3>                            
                        </>
                    ) : (
                        <>
                            <Container>                            
                                <Row>
                                    {usersData.map(data =>
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
            </Container>            
        </>
    )
}
