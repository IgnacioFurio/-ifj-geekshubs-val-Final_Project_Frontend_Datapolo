import React, { useEffect, useState } from 'react';
//redux
import { zoneRdx } from '../../pages/Slices/zoneSlice';
import { useDispatch } from 'react-redux';
//render
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Field.css';

export const Field = ({clickFunction}) => {

    //HOOKS
    const [zone, setZone] = useState('');
    const dispatch = useDispatch();

    //HANDLER
    //input
    const inputHandler = (e) => {

        dispatch(zoneRdx({zoneInfo: {}}))

        setzoneDataInformation(e.target.title);

        let zoneInformation = {data: zone}

        dispatch(zoneRdx({zoneInfo: zoneInformation}))
    }

    //USEEFFECT
    useEffect(() =>{
        console.log(zone);
    });

    return (
        <>
            <Container className='water'>
                <Row>
                    <Col xs={4} className='zone1' title={1} onClick={(e)=>inputHandler(e)}></Col>
                    <Col xs={4} className='d-flex justify-content-center zone2' title={2} onClick={(e)=>inputHandler(e)}> 
                        <div className=' goal'></div>
                    </Col>
                    <Col xs={4} className='zone3' title={3} onClick={(e)=>inputHandler(e)}></Col>
                </Row>
                <Row>
                    <Col xs={4} className='zone4' title={4} onClick={(e)=>inputHandler(e)}></Col>
                    <Col xs={4} className='zone5 text-center font fw-bold' title={5} onClick={(e)=>inputHandler(e)}>4m</Col>
                    <Col xs={4} className='zone6' title={6} onClick={(e)=>inputHandler(e)}></Col>
                </Row>
                <Row>
                    <Col xs={4} className='zone7' title={7} onClick={(e)=>inputHandler(e)}></Col>
                    <Col xs={4} className='zone8 text-center font fw-bold' title={8} onClick={(e)=>inputHandler(e)}>7m</Col>
                    <Col xs={4} className='zone9' title={9} onClick={(e)=>inputHandler(e)}></Col>
                </Row>
            </Container>
        </>
    )
}
