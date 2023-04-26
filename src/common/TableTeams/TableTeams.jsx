import React, { useEffect, useState } from 'react'
//helper
import { validate } from '../../helpers/useful';
//render
import Modal from 'react-bootstrap/Modal';
import { Input } from '../../common/Input/Input';
import Button from 'react-bootstrap/Button';
import update from '../../assets/actualizar-flecha.png';
import del from '../../assets/borrar.png';
import accept from '../../assets/comprobado.png';
import cancel from '../../assets/cancelado.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TableTeams.css'

export const TableTeams = ({id, teamName, clickFunction}) => {

    //HOOKS
    const [teamData, setTeamData] = useState(
        {
            id: id,
            new_name: teamName
        }
    );

    const [errorInputField, setErrorInputField] = useState('');

    const [validInputField, setValidInputfield] = useState(false);

    //set accept/cancel button for modify info
    const [showUpdate, setShowUpdate] = useState(false);

    //HANDLER
    //input
    const inputHandler = (e) => {
        
        setTeamData((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //update modal 
    const handleUpdateClose = () => {
        
        setTeamData(
            {
                id: id,
                new_name: teamName
            }
        )

        setShowUpdate(false)

    };

    const handleUpdateShow = () => setShowUpdate(true);

    //USEEFFECT
    useEffect(() => {
        console.log(teamData);
        console.log(errorInputField);
        console.log(validInputField);
    })

    //FUNCTIONS
    const checkError = (e) => {
        
        let error = "";
    
        let check = validate(
            e.target.name,
            e.target.value,
            e.target.required
            );
            
        error = check.message
    
        setValidInputfield(check.valid);
    
        setErrorInputField(error);
    };

    return (
        <>
            <Container fluid>
                <Row className='teamName my-3 mx-2'>
                    <Col xs={10} className='d-flex justify-content-start' onClick={clickFunction}>
                    {teamName}
                    </Col>
                    <Col><img src={update} alt="update" className='updateIcon' onClick={handleUpdateShow}/></Col>                    
                    <Col><img src={del} alt="delete" className='deleteIcon' /></Col>
                </Row>
            </Container>
            <Modal show={showUpdate} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change the name of the team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mx-3 fw-bold'>Previous Name:</div>
                    <div className='mx-4'>{teamName}</div>
                    <Input
                        className={''}
                        type={'text'}
                        name={'new_name'}
                        placeholder={'Type the new name here'}
                        required={true}
                        error={errorInputField}
                        changeFunction={(e)=>inputHandler(e)}
                        blurFunction={(e)=>checkError(e)}
                        />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleUpdateClose}>
                        Cancel Changes
                    </Button>
                    <Button variant="success" onClick={handleUpdateClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

