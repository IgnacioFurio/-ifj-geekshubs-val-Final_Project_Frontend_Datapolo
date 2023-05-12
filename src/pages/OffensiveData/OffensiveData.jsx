import React, { useEffect, useState } from 'react';
//apicalls
import { Select } from '../../common/Select/Select';
import { getAllMyGoalStadistics, getAllMyTeams, getAllSeasons } from '../../services/apiCalls';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../Slices/userSlice';
import { bringData } from '../Slices/reloadSlice';
//render
import { SelectNoDefault } from '../../common/SelectNoDefault/SelectNoDefault';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import spiner from '../../assets/waterpolo.png'
import stadistics from '../../assets/Stadistics.jpg'


export const OffensiveData = () => {

    const userDataRdx = useSelector(userData);

    const updateInfo = useSelector(bringData);

    const dispatch = useDispatch();

    //HOOKS
    const [teamsData, setTeamsData] = useState([]);

    const [seasonsData, setSeasonsData] = useState([]);

    const [filters, setFilters] = useState(
        {
            team_id: 0,
            rival_id: 0,
            season_id: 0,
            locale: ""
        }
    );

    const [stadisticsData, setStadisticsData] = useState([]);

    const [message, setMessage] = useState('');

    const zones = [1,2,3,4,5,6,7,8,9];

    const [zonePercentage, setZonePercentage] = useState();

    
    const [zone1, setZone1] = useState(0);
    const [zone2, setZone2] = useState(0);
    const [zone3, setZone3] = useState(0);
    const [zone4, setZone4] = useState(0);
    const [zone5, setZone5] = useState(0);
    const [zone6, setZone6 ] = useState(0);
    const [zone7, setZone7 ] = useState(0);
    const [zone8, setZone8 ] = useState(0);
    const [zone9, setZone9 ] = useState(0);
    


    //HANDLER
    const inputHandler = (e) => {
        

        setFilters((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //USEEFFECT
    useEffect(()=>{
        console.log(filters);
        console.log(zone1);
        console.log(zone2);
        console.log(zone3);
        console.log(zone4);
        console.log(zone5);
        console.log(zone6);
        console.log(zone7);
        console.log(zone8);
        console.log(zone9);
        console.log(stadisticsData);
    })

    useEffect(() => {

        if (teamsData.length === 0) {
            
            setTimeout(() => {
                
                getAllMyTeams(userDataRdx?.userCredentials?.user?.id, userDataRdx?.userCredentials?.token)
                    .then(
                        result => {
                            setTeamsData(result.data.data)                    
                        }
                        
                    )
                    .catch(error => console.log(error));

                getAllSeasons(userDataRdx?.userCredentials?.token)
                .then(
                    result => {
                        setSeasonsData(result.data.data)                      
                    }
                    
                )
                .catch(error => console.log(error));
                        
            }, 3000)

        }

    }, [teamsData]);

    useEffect(() => {

        let z1= 0
        let z2= 0
        let z3= 0
        let z4= 0
        let z5= 0
        let z6= 0
        let z7= 0
        let z8= 0
        let z9= 0

        for (let i = 0; i < stadisticsData?.length; i++) {            


            if (stadisticsData[i]?.zone == 1) {
            
                z1++

            } else if (stadisticsData[i]?.zone == 2) {
            
                z2++

            } else if (stadisticsData[i]?.zone == 3) {
            
                z3++

            } else if (stadisticsData[i]?.zone == 4) {
            
                z4++

            } else if (stadisticsData[i]?.zone == 5) {
            
                z5++

            } else if (stadisticsData[i]?.zone == 6) {
            
                z6++

            } else if (stadisticsData[i]?.zone == 7) {
            
                z7++

            } else if (stadisticsData[i]?.zone == 8) {
            
                z8++

            } else if (stadisticsData[i]?.zone == 9) {
            
                z9++

            }

            setZone1(percentage(z1,stadisticsData.length));
            setZone2(percentage(z2,stadisticsData.length));
            setZone3(percentage(z3,stadisticsData.length));
            setZone4(percentage(z4,stadisticsData.length));
            setZone5(percentage(z5,stadisticsData.length));
            setZone6(percentage(z6,stadisticsData.length));
            setZone7(percentage(z7,stadisticsData.length));
            setZone8(percentage(z8,stadisticsData.length));
            setZone9(percentage(z9,stadisticsData.length));
        }


    }, [stadisticsData]);

    //FUNCIONTS

    const bringStadistics = () => {

        setMessage('')

        setZone1(0)
        setZone2(0)
        setZone3(0)
        setZone4(0)
        setZone5(0)
        setZone6(0)
        setZone7(0)
        setZone8(0)
        setZone9(0)

        getAllMyGoalStadistics(filters, userDataRdx?.userCredentials?.token)
            .then(
                result => {

                    let data = Object.values(result.data.data)
                    
                    setStadisticsData(data.flat(2))

                    setMessage(result.data.message)
                }
                
            )
            .catch(error => console.log(error));

    };

    const percentage = (x,y) => {

        let result = (100 * x) / y
        return result.toFixed(2);

    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                    <img src={stadistics} class="img-fluid mb-3 rounded-bottom" alt="..."></img>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} className='d-flex justify-content-start '>
                        <h2 className='font fw-bold'>Offensive Data</h2>
                    </Col>
                </Row>
                <hr className='font fw-bold'/>
            </Container>
            {
                teamsData.length === 0 ? (
                    <>                            
                        <img src={spiner} className="spinnerDesign m-5" alt="spinner"/>
                        <h4 className='font fw-bold'>Looking for your information.</h4>                            
                    </>
                ) : (
                    <>
                    <Container fluid>
                        <Row className='my-3'>
                            <Col className='text-start'>
                                <h3 className='font fw-bold'>Instructions:</h3>
                                <ol>
                                    <li>Choose the team you want to see the goal stadistics (Choose your team).</li>
                                    <li>Think if you need to check this information filtered.</li>
                                    <li>Select those fields you want to filter and then choose an option inside the selectors, you can choose
                                        to filter your information by rivals, seasons or even if the game was friendly or not.
                                    </li>
                                    <li>Click the "Show Stadistics" button bellow the filters and wait for your information to come.</li>
                                    <li>Thank you for trusting this aplication.</li>
                                </ol>
                                <p className='fs-6 px-5 text-center'> * fields marked with this are required.</p>
                            </Col>
                        </Row>
                        <Row className='my-3'>
                            <Col xs={12} lg={4}>
                                <SelectNoDefault
                                    title={'Choose your team.*'}
                                    name={'team_id'}
                                    dataMap={teamsData}
                                    required={true}
                                    changeFunction={(e)=>inputHandler(e)}
                                    blurFunction={()=>{}}
                                    error={''}
                                    /> 
                            </Col>
                            <Col xs={12} lg={4}>
                                <SelectNoDefault
                                    title={'Rival teams'}
                                    name={'rival_id'}
                                    dataMap={teamsData}
                                    required={false}
                                    changeFunction={(e)=>inputHandler(e)}
                                    blurFunction={()=>{}}
                                    error={''}
                                    /> 
                            </Col>
                            <Col xs={12} lg={2}>
                                <SelectNoDefault
                                    title={'Season'}
                                    name={'season_id'}
                                    dataMap={seasonsData}
                                    required={false}
                                    changeFunction={(e)=>inputHandler(e)}
                                    blurFunction={()=>{}}
                                    error={''}
                                    /> 
                            </Col>
                            <Col xs={12} lg={2}>
                                <div className='font fw-bold'>{'Locale/Visitor'}</div>
                                <select name={'locale'} className={'form-select my-1 py-2'} required={false} onChange={(e)=>inputHandler(e)} onBlur={() => {}}>
                                    <option value={""} >----------</option>                                    
                                    <option value={"locale"} >Locale</option>                                    
                                    <option value={"visitor"} >Visitor</option>                                    
                                </select>
                            </Col>
                        </Row>
                        <Row className='my-3 '>
                            <Col></Col>
                            <Col>
                                <Button variant="primary" onClick={() => bringStadistics()}>
                                Search
                                </Button>
                            </Col>
                            <Col></Col>                            
                        </Row>
                    </Container>
                    <Container fluid className='fieldRow'>
                        <Row className='my-3'>
                            <Col className='text-center font fw-bold'><h3>{message}</h3></Col>
                        </Row>
                        <Row className='mt-2 px-5'>
                                        <Col></Col>
                                        <Col className='goal'></Col>
                                        <Col></Col>
                                    </Row>
                        <Row className='water mx-2 fieldRow'>
                            <Col xs={4} className='field1 d-flex justify-content-center align-items-center' title={1} >
                                <h3 className='font fw-bold'>{zone1} %</h3>
                            </Col>
                            <Col xs={4} className='field2 d-flex justify-content-center align-items-center' title={2}> 
                                <h3 className='font fw-bold'>{zone2} %</h3>
                            </Col>
                            <Col xs={4} className='field3 d-flex justify-content-center align-items-center' title={3}>
                                <h3 className='font fw-bold'>{zone3} %</h3>
                            </Col>
                        </Row>
                        <Row className='water mx-2 fieldRow'>
                            <Col xs={4} className='field4 d-flex justify-content-center align-items-center' title={4}>
                                <h3 className='font fw-bold'>{zone4} %</h3>
                            </Col>
                            <Col xs={4} className='field5 d-flex justify-content-center align-items-center' title={5}>
                                <h3 className='font fw-bold'>{zone5} %</h3>
                            </Col>
                            <Col xs={4} className='field6 d-flex justify-content-center align-items-center' title={6}>
                                <h3 className='font fw-bold'>{zone6} %</h3>
                            </Col>
                        </Row>
                        <Row className='water mb-5 mx-2 fieldRow'>
                            <Col xs={4} className='field7 d-flex justify-content-center align-items-center' title={7}>
                                <h3 className='font fw-bold'>{zone7} %</h3> 
                            </Col>
                            <Col xs={4} className='field8 d-flex justify-content-center align-items-center' title={8}>
                                <h3 className='font fw-bold'>{zone8} %</h3>
                            </Col>
                            <Col xs={4} className='field9 d-flex justify-content-center align-items-center' title={9}>
                                <h3 className='font fw-bold'>{zone9} %</h3>
                            </Col>
                        </Row>
                    </Container>
                    </>
                )
            }            
        </>
    )
};
