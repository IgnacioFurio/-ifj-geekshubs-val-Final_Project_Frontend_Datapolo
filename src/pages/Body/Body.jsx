import React from 'react'
import { Route, Routes } from 'react-router-dom'
//render
import { Home } from '../Home/Home'
import { LogIn } from '../LogIn/LogIn'
import { SignUp } from '../SignUp/SignUp'

export const Body = () => {
    return (
        <>
            <Routes classname='bodyDesign'>
                <Route path='/' element={ <Home />} />
                <Route path='/signup' element={ <SignUp />} />
                <Route path='/login' element={ <LogIn />} />
            </Routes>
        </>
    )
}
