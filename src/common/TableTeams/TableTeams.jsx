import React from 'react'
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const TableTeams = ({teamName, clickFunction}) => {
    return (
        <>
            <Container fluid>
                <Row className='my-3 mx-2'>
                    <Col xs={10} className='d-flex justify-content-start' onClick={clickFunction}>
                    {teamName}
                    </Col>
                    <Col>mod</Col>
                    <Col>del</Col>
                </Row>
            </Container>
        </>
    )
};

