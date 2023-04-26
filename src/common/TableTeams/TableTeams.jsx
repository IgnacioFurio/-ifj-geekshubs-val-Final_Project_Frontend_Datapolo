import React, { useState } from 'react'
//render
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TableTeams.css'

export const TableTeams = ({key, teamName, clickFunction}) => {

    //HOOKS
    const [teamId, setTeamId] = useState(key)

    //

    return (
        <>
            <Container fluid>
                <Row className='teamName my-3 mx-2'>
                    <Col xs={10} className='d-flex justify-content-start' onClick={clickFunction}>
                    {teamName}
                    </Col>
                    <Col><img src={update} alt="update" className='updateIcon' /></Col>
                    <Col><img src={del} alt="delete" className='deleteIcon' /></Col>
                </Row>
            </Container>
        </>
    )
};

