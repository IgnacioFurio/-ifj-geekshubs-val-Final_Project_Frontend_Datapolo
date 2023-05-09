import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//apicall
import { logoutApi } from '../../services/apiCalls';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { logout, userData } from '../../pages/Slices/userSlice';
import { adminData, roleOut } from '../../pages/Slices/isAdminSlice';
import { bringData, reload } from '../../pages/Slices/reloadSlice';
//render
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

export const Header = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const dataRdx = useSelector(userData);
    const updateInfo = useSelector(bringData);

    const isAdminRdx = useSelector(adminData);

    //USEEFFECT
    useEffect(() => {
    })

    //FUNCTIONS
    const logOutUser = () => {
        
        logoutApi(dataRdx.userCredentials.token)
            .then(backendCall => {

                console.log(backendCall);

                setTimeout(() => {
                
                    navigate('/')
                    
                    dispatch(logout({userCredentials: {}}));
    
                    dispatch(roleOut({isAdmin: false}));
        
                    dispatch(reload({updatedData: {}}))
        
                    }, 1000)
                }
            )
            .catch(error => console.log(error))

    };

    return (
    <>
        {dataRdx.userCredentials.token ? 
            (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand onClick={() => navigate('/')} className='fontNav fw-bold'>Datapolo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className='fontNav' onClick={() => navigate('/')}>Features</Nav.Link>
                                <Nav.Link className='fontNav' onClick={() => navigate('/')}>Pricing</Nav.Link>
                            </Nav>
                            <Nav>
                                {
                                    isAdminRdx.isAdmin ? (
                                        <NavDropdown title="Admin" id="collasible-nav-dropdown">
                                            <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/teams')}>
                                                Teams
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/players')}>
                                                Players
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/admin/seasons')}>
                                                Seasons
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='font fw-bold d-flex justify-content-center'onClick={() => navigate('/')}>
                                                Games
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/')}>
                                                Trophies
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <></>
                                    )
                                }                                
                                <NavDropdown title={dataRdx?.userCredentials?.user?.username} id="collasible-nav-dropdown">
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/teams')}>
                                        My teams
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/players')}>
                                        My players
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/games')}>
                                        My games
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/')}>
                                        Offensive data
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center'onClick={() => navigate('/')}>
                                        Defensive Data
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => logOutUser()}>
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ) : (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand onClick={() => navigate('/')} className='fontNav fw-bold'>Datapolo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className='fontNav' onClick={() => navigate('/')}>Features</Nav.Link>
                                <Nav.Link className='fontNav' onClick={() => navigate('/')}>Pricing</Nav.Link>
                                
                            </Nav>
                            <Nav>
                            <Nav.Link className='fontNav' onClick={() => navigate('/signup')}>
                                Sign Up
                            </Nav.Link>
                            <Nav.Link className='fontNav' onClick={() => navigate('/login')}>
                                Log In
                            </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
    </>
    )
}
