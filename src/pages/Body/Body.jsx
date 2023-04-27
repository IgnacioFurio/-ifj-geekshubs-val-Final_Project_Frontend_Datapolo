import React from 'react'
import { Route, Routes } from 'react-router-dom'
//render
import { Home } from '../Home/Home'
import { LogIn } from '../LogIn/LogIn'
import { SignUp } from '../SignUp/SignUp'
import { Teams } from '../Teams/Teams'

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/signup' element={ <SignUp />} />
                <Route path='/login' element={ <LogIn />} />
                <Route path='/teams' element={ <Teams />} />
            </Routes>
        </>
    )
}
