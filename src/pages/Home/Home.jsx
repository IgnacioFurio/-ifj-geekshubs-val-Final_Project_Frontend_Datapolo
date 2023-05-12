import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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

    return (
        <Container fluid>
            <Row>
                <Col>
                <img src={pool} class="img-fluid my-3 rounded" alt="..."></img>
                </Col>
            </Row>
            <Row>
                <h3 className='font fw-bold'> One page to keep it all together.</h3>
                <p>     
                    Designed by a waterpolo coach, for waterpolo coaches, this tool will help you to keep track of the information that you may need to check later.
                    Imagine to have a way of store all the goals of the match, "But I can just check at the FINA page or similar", and you will be right, but... Where 
                    is the data of your friendly matches? And what about your training games? or even better... Do you know where is your strongest area?. Datapolo tries
                    to solve all this problems.
                </p>
            </Row>
            <Row className='py-5' >
                <Col className='pt-3' >
                    <Cards
                        src={turia}
                        title={'¡Create teams without limits!'}
                        text={'You may create your own teams and also your rival teams, ¡Without limits!, just visit the section "My teams" and explore the posibilities.'}
                        link={() => navigate('/teams')}
                        textLink={'My teams'}
                    />
                </Col>
                <Col className='pt-3'>
                    <Cards
                        src={team}
                        title={'Players, players and more players...'}
                        text={"Every team deserve to have players, at least 13 for every game. ¡Don't forget to populate your data with a bunch of players!"}
                        link={() => navigate('/players')}
                        textLink={'My players'}
                    />
                </Col>
                <Col  className='pt-3'>
                    <Cards
                        src={game}
                        title={'The players of the teams should match up.'}
                        text={"Teams, players... and games. Add as much games as you need with usefull information, like the season when the game was played..."}
                        link={() => navigate('/games')}
                        textLink={'My games'}
                    />
                </Col>
                <Col  className='pt-3'>
                    <Cards
                        src={goal}
                        title={'What would it be this game without goals.'}
                        text={"It's time to add some goals to your games, just by doing click at the info button to the side of your games."}
                        link={() => navigate('/games')}
                        textLink={'My games'}
                    />
                </Col>
                <Col  className='pt-3'>
                    <Cards
                        src={data}
                        title={'Filter you data and then analize your goals.'}
                        text={"Once you have all the previous data registered, you will be able to check some stadistic data. ¡No more pencil and paper anymore!"}
                        link={() => navigate('/offensive-data')}
                        textLink={'Offensive Data'}
                    />
                </Col>
            </Row>
        </Container>
    )
}
