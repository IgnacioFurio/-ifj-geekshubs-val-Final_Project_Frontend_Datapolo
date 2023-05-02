import React, { useState } from 'react'
import './Home.css'
//redux
import { useDispatch } from 'react-redux'
import { reload } from '../Slices/reloadSlice'

export const Home = () => {

    const dispatch = useDispatch()

    useState(() => {
        dispatch(reload({updatedData: {}}))
    },[])

    return (
        <div className='homeDesign'>Home</div>
    )
}
