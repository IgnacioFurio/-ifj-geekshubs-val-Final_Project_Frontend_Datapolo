import React, { useState, useEffect } from 'react'
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

    return (
        <>
            <div>
                <Input
                    className={errorInputField.emailError === '' ? 'shadowBox' : 'shadowBoxError'}
                    type={'email'}
                    name={'email'}
                    placeholder={'cdwturia@email.com'}
                    required={true}
                    error={errorInputField.usernameError}
                    changeFunction={(e)=>inputHandler(e)}
                    blurFunction={(e)=>checkError(e)}
                />
                <Input
                    className={errorInputField.passwordError === '' ? 'shadowBox' : 'shadowBoxError'}
                    type={'password'}
                    name={'password'}
                    placeholder={'123456W'}
                    required={true}
                    error={errorInputField.usernameError}
                    changeFunction={(e)=>inputHandler(e)}
                    blurFunction={(e)=>checkError(e)}
                />
            </div>
            <div className='d-flex justify-content-center align-items-center my-5'>
                <SubmitButton
                className={submitActive ? 'activeSubmit' : 'disableSubmit'}
                name={'Log In'}
                clickFunction={submitActive ? () =>{} : () => {}}
                />
            </div>
        </>
    )
}
