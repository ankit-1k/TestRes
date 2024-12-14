import React from 'react'
import Navbar from '../Navbar/Navbar'
import CBanner from '../Common/CBanner'
import Footer from '../Footer'
import Team from '../Home/Team'

const Testimonial = ({props}) => {
  return (
    <div>
      <Navbar/>
      <CBanner props={props}/>
      <Team/>
      <Footer/>
    </div>
  )
}

export default Testimonial
