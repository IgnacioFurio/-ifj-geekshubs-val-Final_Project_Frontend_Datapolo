import React, { useState, useEffect } from 'react'
//helper
import { validate } from '../../helpers/useful';
//apicall
import { getUserDataByEmail, logIn } from '../../services/apiCalls';
//render
import { Input } from '../../common/Input/Input';
import { SubmitButton } from '../../common/SubmitButton/SubmitButton';

export const LogIn = () => {

        //HOOKS

    //set data for the new user
    const [userData, setUserData] = useState(
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

    //HANDLER
    const inputHandler = (e) => {
    
        setUserData((prevState)=>(
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
        for(let empty in userData){
            
            if(userData[empty] === ""){
        
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

        
        getUserDataByEmail(userData.email)
            .then((backendCall) => {
            
                console.log(backendCall);

            })
            .catch((error) => {
                let backendErrorData = {
                    message: error.response.data.message,
                    valid: error.response.succes
                }

                errorInputField.passwordError = backendErrorData.message

                setSubmitActive(false)
            })
        
        // logIn(userData)
        //     .then((backendCall) => {
            //ToDo getUserData and then save it inside user instead of decoded token
            // getUserData(userData.email)
                
                // let backendData = {
                //     token: backendCall.data.token,
                //     message: backendCall.data.message,
                //     success: backendCall.data.success,
                    // user: decodedToken
                // };

                // dispatch(login({userCredentials: backendData}));

                // setWelcome(backendData.message)

                // if(backendData.user.roleId === 1 || backendData.user.roleId === 2){
                //     dispatch(roleIn({isAdmin: true}));
                // } else if (backendData.user.roleId === 3) {
                //     dispatch(roleIn({isAdmin: false}));
                // };

                
                // setTimeout(() => {navigate('/')}, 3000)
            // })
            // .catch((error) => {
            //     let backendErrorData = {
            //         message: error.response.data.message,
            //         valid: error.response.succes
            //     }

            //     errorInputField.passwordError = backendErrorData.message

            //     setSubmitActive(false)
            // })

    };

    return (
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
    )
}
