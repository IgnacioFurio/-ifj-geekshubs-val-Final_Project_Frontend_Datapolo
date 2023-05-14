import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//render
import { useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
//render
import { Cards } from '../../common/Cards/Cards';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pool from '../../assets/Piscina.jpg';
import turia from '../../assets/Turia.png';
import team from '../../assets/Team1.jpg';
import goal from '../../assets/Goal.jpg';
import game from '../../assets/GameHome.jpg';
import data from '../../assets/Data.jpg';
import './Home.css'


export const Home = () => {

    const navigate = useNavigate();

    const userDataRdx = useSelector(userData);



    return (
        <Container fluid>
            <Row>
                <Col>
                <img src={pool} className="img-fluid mb-3 rounded-bottom" alt="..."></img>
                </Col>
            </Row>
            <Row>
                <h3 className='font fw-bold'> One page to keep it all together.</h3>
                <p>     
                    Designed by a waterpolo coach, for waterpolo coaches. This tool will help you keep track of the information that you may need to check later.
                    Imagine a way of storing all the goals of the match, "But I can just check at the FINA page or similar", and you'd be right, but... Where 
                    is your friendly matches data? And what about your training games? or even better... Do you know what is your strongest area?. Datapolo tries
                    to solve all these problems.
                </p>
            </Row>
            <Row className='py-5 ' >
                <Col className='pt-3 d-flex justify-content-center' md={4}>
                    <Cards
                        src={turia}
                        title={'Create unlimited teams!'}
                        text={'You can record as much data as you want from your own teams and your opponents, no limits!. Just visit the section "My teams" and explore the possibilities.'}
                        link={userDataRdx.userCredentials.token ? () => navigate('/teams') : () => navigate('/login')}
                        textLink={'My teams'}
                    />
                </Col>
                <Col className='pt-3 d-flex justify-content-center' md={4}>
                    <Cards
                        src={team}
                        title={'Players, players and more players...'}
                        text={"Every team deserve to have players, at least 13 for every game. ¡Don't forget to populate your data with a bunch of players!"}
                        link={userDataRdx.userCredentials.token ? () => navigate('/players') : () => navigate('/login')}
                        textLink={'My players'}
                    />
                </Col>
                <Col  className='pt-3 d-flex justify-content-center' md={4}>
                    <Cards
                        src={game}
                        title={'The players of the teams should match up.'}
                        text={"Teams, players... and games. Add as many games as you need with useful information, like the season when the game was played..."}
                        link={userDataRdx.userCredentials.token ? () => navigate('/games') : () => navigate('/login')}
                        textLink={'My games'}
                    />
                </Col>
                <Col  className='pt-3 d-flex justify-content-center' md={4}>
                    <Cards
                        src={goal}
                        title={'What would it be of this game without goals.'}
                        text={"It's time to record the goals on your games, just by clicking on the info button on the side of your games."}
                        link={userDataRdx.userCredentials.token ? () => navigate('/games') : () => navigate('/login')}
                        textLink={'My games'}
                    />
                </Col>
                <Col  className='pt-3 d-flex justify-content-center' md={4}>
                    <Cards
                        src={data}
                        title={'Filter you data and then analize your goals.'}
                        text={"Once you have all the previous data logged, you will be able to check statisticcal data on it. No more pencil and paper!"}
                        link={userDataRdx.userCredentials.token ? () => navigate('/offensive-data') : () => navigate('/login')}
                        textLink={'Offensive Data'}
                    />
                </Col>
            </Row>
        </Container>
    )
}
