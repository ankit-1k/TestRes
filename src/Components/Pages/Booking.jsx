import React from 'react'
import Navbar from '../Navbar/Navbar'
import CBanner from '../Common/CBanner'
import Reaservation from './../Home/Reaservation'
import Footer from './../Footer'
const Booking = ({ props, user }) => {
  return (
    <div>
      <Navbar/>
      <CBanner props={props}/>
      <Reaservation props={props} user={user}/>
      <Footer/>
    </div>
  )
}

export default Booking
