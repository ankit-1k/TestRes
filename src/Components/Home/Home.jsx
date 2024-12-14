import React from 'react'
import Navbar from '../Navbar/Navbar'
import AboutSec from './AboutSec'
import Menu from './Menu'
import Reaservation from './Reaservation'
import Team from './Team'
import Testimonial from './Testimonial'
import Footer from '../Footer'
import Banner from './Banner'

const Home = ({ user }) => {
    
    return (
        <div>
            <Navbar />
            <Banner/>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="service-item rounded pt-3">
                                <div class="p-4">
                                    <i class="fa fa-3x fa-user-tie text-primary mb-4"></i>
                                    <h5>Master Chefs</h5>
                                    <p>Our master chefs create culinary masterpieces with unmatched skill and passion.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="service-item rounded pt-3">
                                <div class="p-4">
                                    <i class="fa fa-3x fa-utensils text-primary mb-4"></i>
                                    <h5>Quality Food</h5>
                                    <p>Enjoy quality food crafted with fresh, premium ingredients every time.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="service-item rounded pt-3">
                                <div class="p-4">
                                    <i class="fa fa-3x fa-cart-plus text-primary mb-4"></i>
                                    <h5>Online Order</h5>
                                    <p>Order your favorite dishes online and enjoy fresh flavors delivered fast.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div class="service-item rounded pt-3">
                                <div class="p-4">
                                    <i class="fa fa-3x fa-headset text-primary mb-4"></i>
                                    <h5>24/7 Service</h5>
                                    <p>Enjoy our 24/7 service, ensuring delicious meals and support anytime you need.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AboutSec />
            <Menu />
            <Reaservation/>
            <Team />
            <Testimonial />
            <Footer/>
        </div>
    )
}

export default Home
