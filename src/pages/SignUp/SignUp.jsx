import React, { useEffect, useState } from 'react';
//helper
import { validate } from '../../helpers/useful';
//apicall
import { createUser } from '../../services/apiCalls';
//render
import Form from 'react-bootstrap/Form';
import { Input } from '../../common/Input/Input';
import './SignUp.css';
import { SubmitButton } from '../../common/SubmitButton/SubmitButton';

export const SignUp = () => {

    //HOOKS

    //set data for the new user
    const [newUser, setNewUser] = useState(
        {
            username: '',
            email: '',
            password: '',
            password2: ''
        }
    );

    //validate the value inside the inputs
    const [validInputField, setValidInputfield] = useState(
        {
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            password2Valid: false
        }
    );

    //error messages if something is wrong inside the inputs
    const [errorInputField, setErrorInputField] = useState(
        {
            usernameError: '',
            emailError: '',
            passwordError: '',
            password2Error: ''
        }
    );

    //activate submit button
    const [submitActive, setSubmitActive] = useState(false);

    //HANDLER
    const inputHandler = (e) => {
        
        setNewUser((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //USEEFFECT
    useEffect(() => {
        //functions to make submit button activated
        //in case that a field is empty
        for(let empty in newUser){
            
            if(newUser[empty] === ""){
        
                setSubmitActive(false);
                
                return;
                };
        };
    
        //in case that a field is not valid
        for(let valid in validInputField){
    
            if(validInputField[valid] === false){
        
                setSubmitActive(false);
                return;
            };
        };
        
        //in case that a field shows an error
        for(let error in errorInputField){
    
            if(errorInputField[error]){
                
                setSubmitActive(false);
                return;
                };
        };
        
        //in case the data it's full validated
        setSubmitActive(true);
    });

    //FUNCTIONS
    const checkError = (e) => {
        
        let error = "";
    
        let check = validate(
            e.target.name,
            e.target.value,
            e.target.required
            );
            
        error = check.message
    
        setValidInputfield((prevState) => (
                {
                    ...prevState,
                    [e.target.name + 'Valid']: check.valid
                }
            )
        );
    
        setErrorInputField((prevState) => (
                {
                ...prevState,
                [e.target.name + 'Error']: error
                }
            )
        );
    };

    //confirm password function
    const confirmPass = (e) => {

        if(newUser.password2 === ''){

            setValidInputfield((prevState) => (
                {
                    ...prevState,
                    [e.target.name + 'Valid']: false
                }
                )
            );
    
            setErrorInputField((prevState) => (
                {
                    ...prevState,  
                    [e.target.name + 'Error']: "Field 'Confirm Password' required."
                }
                )
            );

        }else if(newUser.password2 !== newUser.password && newUser.password2 !== ""){

        setValidInputfield((prevState) => (
            {
                ...prevState,
                [e.target.name + 'Valid']: false
            }
            )
        );

        setErrorInputField((prevState) => (
            {
                ...prevState,  
                [e.target.name + 'Error']: 'Password and Confirm Password shoud be the same.'
            }
            )
        );

        } else {

        setValidInputfield((prevState) => (
            {
                ...prevState,
                [e.target.name + 'Valid']: true
            }
            )
        );

        setErrorInputField((prevState) => (
            {
                ...prevState,  
                [e.target.name + 'Error']: ''
            }
            )
        );

        };
    }

    //sing up function
    const submitUser = () => {
        
        createUser(newUser)
        .then(() => {

            navigate('/')

        })
        .catch(error => {
            
            let backendErrorData = {
            message: error.response.data.message,
            valid: error.response.data.succes

        }

        errorInputField.passwordError = backendErrorData.message
        })
    };


    return (
        <>
            <div>
                <Input
                    className={errorInputField.usernameError === '' ? 'shadowBox' : 'shadowBoxError'}
                    type={'text'}
                    name={'username'}
                    placeholder={'CDW Turia'}
                    required={true}
                    error={errorInputField.usernameError}
                    changeFunction={(e)=>inputHandler(e)}
                    blurFunction={(e)=>checkError(e)}
                />
                <Input
                    className={errorInputField.emailError === '' ? 'shadowBox' : 'shadowBoxError'}
                    type={'email'}
                    name={'email'}
                    placeholder={'cdwturia@email.com'}
                    required={true}
                    error={errorInputField.emailError}
                    changeFunction={(e)=>inputHandler(e)}
                    blurFunction={(e)=>checkError(e)}
                />
                <Input
                    className={errorInputField.passwordError === '' ? 'shadowBox' : 'shadowBoxError'}
                    type={'password'}
                    name={'password'}
                    placeholder={'1234567W'}
                    required={true}
                    error={errorInputField.passwordError}
                    changeFunction={(e)=>inputHandler(e)}
                    blurFunction={(e)=>checkError(e)}
                    />
                <Input
                    className={errorInputField.password2Error === '' ? 'shadowBox' : 'shadowBoxError'}
                    type={'password'}
                    name={'password2'}
                    placeholder={'1234567W'}
                    required={true}
                    error={errorInputField.password2Error}
                    changeFunction={(e)=>inputHandler(e)}
                    blurFunction={(e)=>confirmPass(e)}
                    />
            </div>
            <div className='d-flex justify-content-center align-items-center my-5'>
                <SubmitButton
                className={submitActive ? 'activeSubmit' : 'disableSubmit'}
                name={'submit'}
                clickFunction={submitActive ? () => submitUser() : () => {}}
                />
            </div>
            
        </>
    )
}
