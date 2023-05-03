import React from 'react'
import { Route, Routes } from 'react-router-dom'
//render
import { Home } from '../Home/Home'
import { LogIn } from '../LogIn/LogIn'
import { SignUp } from '../SignUp/SignUp'
import { Teams } from '../Teams/Teams'
import { Players } from '../Players/Players'
import { AdminSeasons } from '../AdminSeasons/AdminSeasons'

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/signup' element={ <SignUp />} />
                <Route path='/login' element={ <LogIn />} />
                <Route path='/teams' element={ <Teams />} />
                <Route path='/players' element={ <Players /> } />
                <Route path='/admin/seasons' element={ <AdminSeasons /> } />
            </Routes>
        </>
    )
}
