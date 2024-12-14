import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'
import CBannerNavbar from './../Common/CBanner'
import PrivacyContent from './PrivacyContent'
const Privacy = ({props}) => {
  return (
    <div>
      <Navbar/>
      <CBannerNavbar props={props}/>
      <PrivacyContent/>
      <Footer/>
    </div>
  )
}

export default Privacy
