import React from 'react'
import img1 from './../../assets/img/about-1.jpg'
import img2 from './../../assets/img/about-2.jpg'
import img3 from './../../assets/img/about-3.jpg'
import { useNavigate } from 'react-router-dom'
// import img4 from './../../assets/img/about-4.jpg'

const About = () => {
    const navigate=useNavigate()

  return (
    <div>
      {/* <!-- About Start --> */}
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6">
                        <div class="row g-3">
                            <div class="col-6 text-start">
                                <img class="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src={img1} alt=''/>
                            </div>
                            <div class="col-6 text-start">
                                <img class="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src={img2} alt='' style={{marginTop: '25%'}}/>
                            </div>
                            <div class="col-6 text-end">
                                <img class="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src={img3} alt=''/>
                            </div>
                            <div class="col-6 text-end">
                                <img class="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src={img3} alt=''/>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h5 class="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
                        <h1 class="mb-4">Welcome to <i class="fa fa-utensils text-primary me-2"></i>TasteOn</h1>
                        <p class="mb-4">Discover the ultimate dining experience with flavors that delight your senses.</p>
                        <p class="mb-4">At TasteOn, we blend passion and quality to serve meals you'll love, creating unforgettable moments every time.</p>
                        <div class="row g-4 mb-4">
                            <div class="col-sm-6">
                                <div class="d-flex align-items-center border-start border-5 border-primary px-3">
                                    <h1 class="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">15</h1>
                                    <div class="ps-4">
                                        <p class="mb-0">Years of</p>
                                        <h6 class="text-uppercase mb-0">Experience</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-flex align-items-center border-start border-5 border-primary px-3">
                                    <h1 class="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">50</h1>
                                    <div class="ps-4">
                                        <p class="mb-0">Popular</p>
                                        <h6 class="text-uppercase mb-0">Master Chefs</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary py-3 px-5 mt-2" onClick={()=>navigate('/about')}>Read More</button>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- About End --> */}
    </div>
  )
}

export default About
