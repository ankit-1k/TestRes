import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div class="container-xxl position-relative p-0 fixed-top">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                    <Link to='' class="navbar-brand p-0">
                        <h1 class="text-primary m-0"><i class="fa fa-utensils me-3"></i>TasteOn</h1>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="fa fa-bars"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav ms-auto py-0 pe-4">
                            <Link to="/home" class="nav-item nav-link active">Home</Link>
                            <Link to="/about" class="nav-item nav-link">About</Link>
                            <Link to="/services" class="nav-item nav-link">Service</Link>
                            <Link to="/menu" class="nav-item nav-link">Menu</Link>
                            <div class="nav-item dropdown">
                                <Link to="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                <div class="dropdown-menu m-0">
                                    <Link to="/booking" class="dropdown-item">Booking</Link>
                                    <Link to="/team" class="dropdown-item">Our Team</Link>
                                    <Link to="/testimonial" class="dropdown-item">Testimonial</Link>
                                    <Link to="/login" class="dropdown-item">Login</Link>
                                    <Link to="/register" class="dropdown-item">Register</Link>
                                </div>
                            </div>
                            <Link to="/contact" class="nav-item nav-link">Contact</Link>
                        </div>
                        <Link to='/booking' class="btn btn-primary py-2 px-4">Book A Table</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
