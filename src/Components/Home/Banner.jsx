import React from 'react'
import { Link } from 'react-router-dom'
import hero from './../../assets/img/hero.png'
const Banner = () => {
    return (
        <div>
            <div class="container-xxl py-5 bg-dark hero-header mb-5">
                <div class="container my-5 py-5">
                    <div class="row align-items-center g-5">
                        <div class="col-lg-6 text-center text-lg-start">
                            <h1 class="display-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Meal</h1>
                            <p class="text-white animated slideInLeft mb-4 pb-2">Savor the finest flavors at Teston! Our menu offers a delightful variety of meals crafted with passion, ensuring every bite is a feast for your senses.</p>
                            <Link to='' class="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">Book A Table</Link>
                        </div>
                        <div class="col-lg-6 text-center text-lg-end overflow-hidden">
                            <img class="img-fluid" src={hero} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
