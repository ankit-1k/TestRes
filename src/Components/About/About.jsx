import React from 'react'
import Navbar from '../Navbar/Navbar'
import AboutSec from '../Home/AboutSec'
import Team from '../Home/Team'
import Footer from '../Footer'
import CBanner from '../Common/CBanner'

const About = ({props}) => {
  return (
    <div>
      <Navbar />
      <CBanner props={props}/>
      <AboutSec/>
      <Team />
      <Footer/>
    </div>
  )
}

export default About
