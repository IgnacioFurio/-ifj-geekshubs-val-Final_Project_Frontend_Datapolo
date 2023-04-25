import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { login, userData } from '../Slices/userSlice';
import { adminData, roleIn } from '../Slices/isAdminSlice';
//helper
import { validate } from '../../helpers/useful';
//apicall
import { getUserDataByEmail, logIn } from '../../services/apiCalls';
//render
import { Input } from '../../common/Input/Input';
import { SubmitButton } from '../../common/SubmitButton/SubmitButton';

export const LogIn = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const dataRdx = useSelector(userData);

    const isAdminRdx = useSelector(adminData);

        //HOOKS

    //set data for the new user
    const [userInfo, setUserInfo] = useState(
        {
            email: '',
            password: ''
        }
    );

    //validate the value inside the inputs
    const [validInputField, setValidInputfield] = useState(
        {
            emailValid: false,
            passwordValid: false,
        }
    );

    //error messages if something is wrong inside the inputs
    const [errorInputField, setErrorInputField] = useState(
        {
            emailError: '',
            passwordError: '',
        }
    );

    //activate submit button
    const [submitActive, setSubmitActive] = useState(false);

    //welcome message
    const [welcome, setWelcome] = useState('');

    //HANDLER
    const inputHandler = (e) => {
    
        setUserInfo((prevState)=>(
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            )
        );
    }

    //USEEFFECT
    useEffect(() => {
        console.log(dataRdx);
        console.log(isAdminRdx);
    })
    useEffect(() => {
        //functions to make submit button activated
        //in case that a field is empty
        for(let empty in userInfo){
            
            if(userInfo[empty] === ""){
        
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

    //logIn function
    const logUser = () => {

        logIn(userInfo)
            .then((backendCall) => {
                
            let backendData = {
                token: backendCall.data.token,
                message: backendCall.data.message,
                success: backendCall.data.success,
                user: {}
            };

            dispatch(login({userCredentials: backendData}));

            getUserDataByEmail(userInfo.email, backendData)
                .then((backendCall) => {

                    backendData = {
                        token: backendData.token,
                        message: backendData.message,
                        success: backendData.success,
                        user: backendCall.data.data[0]
                    };
                    
                    setWelcome(backendData.message)

                    dispatch(login({userCredentials: backendData}));

                })
                .catch((error) => {
                    let backendErrorData = {
                        message: error.response.data.message,
                        valid: error.response.succes
                    }
    
                    errorInputField.passwordError = backendErrorData.message
    
                    setSubmitActive(false)
                    
                })
                
                if(backendData.user.role_id === 1 || backendData.user.role_id === 2){
                    
                    dispatch(roleIn({isAdmin: true}));
                    
                } else if (backendData.user.role_id === 3) {

                    dispatch(roleIn({isAdmin: false}));
                };
                // setTimeout(() => {navigate('/')}, 3000)
            })
            .catch((error) => {
                console.log(error);
                let backendErrorData = {
                    message: error.response.data.message,
                    valid: error.response.succes
                }

                errorInputField.passwordError = backendErrorData.message

                setSubmitActive(false)
            })

    };

    return (
        <>
            {dataRdx.userCredentials.token ?
                (
                    navigate('/') 
                ):(
                    <>
                        <div>
                            <Input
                                className={errorInputField.emailError === '' ? 'shadowBox' : 'shadowBoxError'}
                                type={'email'}
                                name={'email'}
                                placeholder={'cdwturia@email.com'}
                                required={true}
                                error={errorInputField.emailError}
                                changeFunction={(e)=>inputHandler(e)}
                                blurFunction={(e) => checkError(e)}
                            />
                            <Input
                                className={errorInputField.passwordError === '' ? 'shadowBox' : 'shadowBoxError'}
                                type={'password'}
                                name={'password'}
                                placeholder={'1234567W'}
                                required={true}
                                error={errorInputField.passwordError}
                                changeFunction={(e)=>inputHandler(e)}
                                blurFunction={(e) => checkError(e)}
                            />
                        </div>
                        <div className='d-flex justify-content-center align-items-center my-5'>
                            <SubmitButton
                            className={submitActive ? 'activeSubmit' : 'disableSubmit'}
                            name={'Log In'}
                            clickFunction={submitActive ? () =>logUser() : () => {}}
                            />
                        </div>
                    </>
                )}
        </>
    )
}
