import React, { useState } from 'react';
//redux
import { useSelector } from 'react-redux';
import { userData } from '../../pages/Slices/userSlice';
import { adminData } from '../../pages/Slices/isAdminSlice';
//render
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

export const Header = () => {

    const dataRdx = useSelector(userData);

    const isAdminRdx = useSelector(adminData);

    useState(() => {
        console.log(dataRdx.userCredentials.token);
    })

    return (

        <Navbar bg="dark" variant="dark" className='headerDesign'>
            <Container>
                <Navbar.Brand href="#home" className='fontNav fw-bold'>Datapolo</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home" className='fontNav'>Home</Nav.Link>
                    <Nav.Link href="#features" className='fontNav'>Features</Nav.Link>
                    <Nav.Link href="#pricing" className='fontNav'>Pricing</Nav.Link>
                </Nav>
                {
                    dataRdx.userCredentials.token ? (
                        <>
                        <NavDropdown title={dataRdx.userCredentials.user.userName} id="basic-nav-dropdown" className='dropDownDesign  fontNav fw-bold'>
                            <NavDropdown.Item  onClick={()=>navigate('/')}>
                                My profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>navigate('/')}>
                                My patients
                            </NavDropdown.Item>
                            <NavDropdown.Item className='fontNav' onClick={()=>navigate('/')}>
                                My appointments
                            </NavDropdown.Item>
                            <NavDropdown.Item className='fontNav' onClick={()=>navigate('/')}>
                                Doctor info
                            </NavDropdown.Item>
                            {
                                isAdminRdx.isAdmin === true ? (
                                <>
                                <NavDropdown.Item className='fontNav' onClick={()=>navigate('/')}>
                                Admin info
                                </NavDropdown.Item>
                                </>
                                ) : (
                                <></>
                                )
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item className='fontNav' onClick={()=>logOut()}>
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                    ) : (
                    <>
                        <NavDropdown title='Log In' id="basic-nav-dropdown" className='dropDownDesign'>
                        <NavDropdown.Item onClick={()=>navigate('/register')}>
                            Sign Up
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>navigate('/login')}>
                            Sign In
                        </NavDropdown.Item>
                        </NavDropdown>
                    </>
                    ) 
                }
            </Container>
        </Navbar>

    )
}
