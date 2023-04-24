import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from '../SignUp/SignUp'
import { LogIn } from '../LogIn/LogIn'

export const Body = () => {
    return (
        <>
            <Routes classname='bodyDesign'>
                {/* <Route path='/' element={ <Home />} /> */}
                <Route path='/signup' element={ <SignUp />} />
                <Route path='/login' element={ <LogIn />} />
            </Routes>
        </>
    )
}
