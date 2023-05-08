import React, { useEffect, useState } from 'react';
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Field.css';

export const Field = ({clickFunction}) => {

    //HOOKS
    const [zone, setZone] = useState('');

    //HANDLER
    //input
    const inputHandler = (e) => {

        setZone(e.target.__reactProps$w5j1szmoszn.name);

    }

    //USEEFFECT
    useEffect(() =>{
        console.log(zone);
    });

    return (
        <>
            <Container className='water'>
                <Row>
                    <Col xs={4} className='zone1' name={1} onClick={(e)=>inputHandler(e)}></Col>
                    <Col xs={4} className='d-flex justify-content-center zone2' name={2} onClick={(e)=>inputHandler(e)}> 
                        <div className=' goal'></div>
                    </Col>
                    <Col xs={4} className='zone3' name={3} onClick={(e)=>inputHandler(e)}></Col>
                </Row>
                <Row>
                    <Col xs={4} className='zone4' name={4} onClick={(e)=>inputHandler(e)}></Col>
                    <Col xs={4} className='zone5 text-center font fw-boldJ' name={5} onClick={(e)=>inputHandler(e)}>4m</Col>
                    <Col xs={4} className='zone6' name={6} onClick={(e)=>inputHandler(e)}></Col>
                </Row>
                <Row>
                    <Col xs={4} className='zone7' name={7} onClick={(e)=>inputHandler(e)}></Col>
                    <Col xs={4} className='zone8 text-center font fw-bold' name={8} onClick={(e)=>inputHandler(e)}>7m</Col>
                    <Col xs={4} className='zone9' name={9} onClick={(e)=>inputHandler(e)}></Col>
                </Row>
            </Container>
        </>
    )
}
