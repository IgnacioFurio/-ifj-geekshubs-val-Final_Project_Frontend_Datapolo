import React from "react"
import { Body } from "./pages/Body/Body"
import { Header } from "./common/Header/Header"
import { Footer } from "./common/Footer/Footer"
import './App.css'

export const App = () => {

  return (
    <>
      <Header/>
      <div className="bodyDesign">
        <Body/>
      </div>
      <Footer/>
    </>
  )
}