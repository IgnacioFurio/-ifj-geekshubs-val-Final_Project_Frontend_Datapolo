import React from 'react'
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import github from '../../assets/github.png';
import linkedIn from '../../assets/linkedIn.png';
import turia from '../../assets/LogoWTuriaRed.png';
import geekdhubs from '../../assets/geekshubs.png';
import './Footer.css'

export const Footer = () => {
    return (
        <>
            <Container fluid className={'footerDesign fontNoHover '}>
                <Row>
                    <Col xs={12} md={12}></Col>
                    <Col xs={12} md={4} >
                        <h6 className='d-flex justify-content-center text-decoration-underline fw-bold'>DEVELOPER</h6>
                        <p className='d-flex justify-content-center'>Ignacio Furió José</p>
                        <p className='d-flex justify-content-center'>Valencia, Comunitat Valenciana,</p>
                        <p className='d-flex justify-content-center'>Spain</p>
                    </Col>
                    <Col xs={12} md={4} >                        
                        <h6 className='d-flex justify-content-center text-decoration-underline fw-bold'>SOCIAL MEDIA</h6>
                        <div class="text-center">
                            <a href="https://github.com/IgnacioFurio"><img src={github} className="footerLogo" alt="GitHub"/></a>
                        </div>
                        <div class="text-center">
                            <a href="https://www.linkedin.com/in/ignacio-furi%C3%B3-0a9010233/"><img src={linkedIn} className="footerLogo" alt="LinkedIn"/></a>
                        </div>
                    </Col>
                    <Col xs={12} md={4} >
                        <h6 className='d-flex justify-content-center text-decoration-underline fw-bold'>SPECIAL THANKS TO</h6>                    
                        <div className='d-flex justify-content-center'>
                            <a href="https://www.linkedin.com/in/ignacio-furi%C3%B3-0a9010233/"><img src={geekdhubs} className="geekshubsLogo" alt="LinkedIn"/></a>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <a href="https://www.linkedin.com/in/ignacio-furi%C3%B3-0a9010233/"><img src={turia} className="turiaLogo" alt="LinkedIn"/></a>
                            </div>
                    </Col>
                    <Col xs={12} md={12} ></Col>
                </Row>
            </Container>
        </>
    );
};
