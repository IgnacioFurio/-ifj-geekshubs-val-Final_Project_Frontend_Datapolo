import React, { useDebugValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { getAllUsers } from '../../services/apiCalls';
import { bringData, reload } from '../Slices/reloadSlice';
//render
import { TableUsers } from '../../common/TableUsers/TableUsers';
import spiner from '../../assets/waterpolo.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const AdminUsers = () => {

    const userDataRdx = useSelector(userData);

    const updateInfo = useSelector(bringData);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //HOOKS
    const [usersData, setUsersData] = useState([]);

    // USEEFFECT
    useEffect(() => {
        if(usersData.length === 0){

            dispatch(reload({updatedData: {}}))

            try {
                setTimeout(() => {
                
                    getAllUsers(userDataRdx.userCredentials.token)
                        .then(
                            result => {
                                setUsersData(result.data.data)                      
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

            setUsersData([]);

        };
    });

    return (
        <>
        <Container fluid>
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
                                                return <TableUsers 
                                                    key={data.id} 
                                                    id={data.id} 
                                                    userName={data.username}
                                                    userEmail={data.email}
                                                    userRole={data.role_id}
                                                    />
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
