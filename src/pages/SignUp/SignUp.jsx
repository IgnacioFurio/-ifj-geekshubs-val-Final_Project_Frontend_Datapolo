import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Input } from '../../common/Input/Input';

export const SignUp = () => {

    //HOOKS

    //set data for the new user
    const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    );

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
    useEffect(()=>{
        console.log(newUser);
    },[newUser])

    return (
        <>
            <Input
                className={'shadowBox'}
                type={'text'}
                name={'name'}
                placeholder={'CDW Turia'}
                required={true}
                changeFunction={(e)=>inputHandler(e)}
                blurFunction={()=>{}}
            />
            <Input
                className={'shadowBox'}
                type={'email'}
                name={'email'}
                placeholder={'cdwturia@email.com'}
                required={true}
                changeFunction={(e)=>inputHandler(e)}
                blurFunction={()=>{}}
            />
            <Input
                className={'shadowBox'}
                type={'password'}
                name={'password'}
                placeholder={'1234567W'}
                required={true}
                changeFunction={(e)=>inputHandler(e)}
                blurFunction={()=>{}}
            />
            <Input
                className={'shadowBox'}
                type={'password'}
                name={'password2'}
                placeholder={'1234567W'}
                required={true}
                changeFunction={(e)=>inputHandler(e)}
                blurFunction={()=>{}}
            />
        </>
    )
}
