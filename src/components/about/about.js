import React, { useEffect, useRef } from 'react';
import Navbar from '../navbar/navbar.js';
import Footer from '../footer/footer.js';
import Sleep from '../../assets/sleep.svg';
import {TweenMax, Power3, gsap} from 'gsap';


function About() {
    let titleText = useRef(null);
    let aboutText = useRef(null);
    let aboutImage = useRef(null);

    useEffect(() => {
        TweenMax.from('.text', {opacity: 0, duration: 1, x:-50, y:-50, stagger: 0.6, ease: Power3});

        TweenMax.from('.image', {opacity: 0, duration: 0.6, x:-50, ease: Power3});

        TweenMax.from(
            titleText,
            1.4,
            {
                opacity: 0,
                y: -50,
                ease: Power3.easeOut,
            }
        );
    })


    return (
        <div className="h-full md:h-screen splash-screen dark:splash-screen-dark transition duration-500">
            <Navbar />
            <div 
            className="text-center font-bold my-10"
            ref={el => titleText = el}>
                <p className="transition-all duration-500 text-black dark:text-yellow-500 text-7xl"><span className="transition-all duration-500 text-yellow-500 dark:text-white">Zzz</span> Tracker</p>
                <p className="transition-all duration-500 text-black dark:text-yellow-500 text-5xl my-5">More Than Just A <span className="transition-all duration-500 text-yellow-500 dark:text-white">Sleep Tracker</span></p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-14">
                <div 
                ref={el => aboutImage = el}
                className="m-auto hidden lg:block image">
                    <img src={Sleep} alt="" />
                </div>
                <div
                ref={el => aboutText = el}
                className="text-3xl font-bold mb-8 mr-10 lg:mr-20 text">
                    <p className="text bg-yellow-400 text-gray-800 dark:text-white text-center p-10 lg:p-8 mt-5 ml-5 lg:-ml-10 mr-5 lg:mr-14 rounded-full">Track your sleep everyday using details such as the date, the time you went to sleep and the time you woke up.</p>
                    <p className="text bg-gray-600 dark:bg-gray-500 text-yellow-500 dark:text-yellow-400 text-center p-10 lg:p-8 rounded-full my-10 ml-20">Once you have a few entries, <span className="text-white dark:text-white">Zzz Tracker</span> can offer you some insights about your sleep health.</p>
                    <p className="text bg-yellow-400 text-gray-800 dark:text-white text-center p-10 lg:p-8 mt-5 ml-5 lg:-ml-10 mr-5 lg:mr-14 rounded-full">With the use of the graph, you can track patterns and bad habits that have been affecting your overall performance</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About;