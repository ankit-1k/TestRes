import React from 'react'
import Navbar from '../Navbar/Navbar'
import CBanner from '../Common/CBanner'
import Footer from '../Footer'
import TermsContent from './TermsContent'

const Terms = ({props}) => {
  return (
    <div>
      <Navbar/>
      <CBanner props={props}/>
      <TermsContent/>
      <Footer/>
    </div>
  )
}

export default Terms
