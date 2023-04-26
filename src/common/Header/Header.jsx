import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { logout, userData } from '../../pages/Slices/userSlice';
import { adminData, roleOut } from '../../pages/Slices/isAdminSlice';
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

    const isAdminRdx = useSelector(adminData);

    //USEEFFECT
    // useEffect(() => {
    //     console.log(dataRdx);
    // })

    //FUNCTIONS
    const logOut = () => {
        
        let backendData = {}

        dispatch(logout({userCredentials: backendData}));
        dispatch(roleOut({isAdmin: false}));

        setTimeout(() => {navigate('/')}, 1000)
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
                                <NavDropdown title={dataRdx?.userCredentials?.user?.username} id="collasible-nav-dropdown">
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/teams')}>
                                        My teams
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/')}>
                                        Action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => navigate('/')}>
                                        Offensive data
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center'onClick={() => navigate('/')}>
                                        Defensive Data
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='font fw-bold d-flex justify-content-center' onClick={() => logOut()}>
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
