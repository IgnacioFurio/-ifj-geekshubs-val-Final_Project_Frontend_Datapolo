import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

export const Header = () => {

    return (

        <Navbar bg="dark" variant="dark" className='headerDesign'>
            <Container>
            <Navbar.Brand href="#home" className='fontNav fw-bold'>Datapolo</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home" className='fontNav'>Home</Nav.Link>
                <Nav.Link href="#features" className='fontNav'>Features</Nav.Link>
                <Nav.Link href="#pricing" className='fontNav'>Pricing</Nav.Link>
            </Nav>
            </Container>
        </Navbar>

    )
}
