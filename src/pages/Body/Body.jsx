import React from 'react'
import { Route, Routes } from 'react-router-dom'
//render
import { Home } from '../Home/Home'
import { LogIn } from '../LogIn/LogIn'
import { SignUp } from '../SignUp/SignUp'
import { Teams } from '../Teams/Teams'
import { Players } from '../Players/Players'
import { AdminSeasons } from '../AdminSeasons/AdminSeasons'
import { Games } from '../Games/Games'
import { OffensiveData } from '../OffensiveData/OffensiveData'
import { AdminUsers } from '../AdminUsers/AdminUsers'

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/signup' element={ <SignUp />} />
                <Route path='/login' element={ <LogIn />} />
                <Route path='/teams' element={ <Teams />} />
                <Route path='/players' element={ <Players /> } />
                <Route path='/admin-area/seasons' element={ <AdminSeasons /> } />
                <Route path='/admin-area' element={ <AdminUsers /> } />
                <Route path='/games' element={ <Games /> } />
                <Route path='/offensive-data' element={ <OffensiveData /> } />
            </Routes>
        </>
    )
}
