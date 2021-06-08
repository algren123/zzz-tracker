import React, { useRef, useEffect, useState } from 'react'
import './splash-screen.scss';
import {TweenMax, Power3} from 'gsap';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import useDarkMode from '../../services/useDarkMode';

function SplashScreen() {
    let jumbotronItem = useRef(null);

		const [colorTheme, setTheme] = useState(localStorage.theme);

		useEffect(() => {
			setTheme(localStorage.theme)
		}, [colorTheme])

    useEffect(() => {
        TweenMax.to(
            jumbotronItem,
            1,
            {
                opacity: 1,
                y: -50,
                ease: Power3.easeOut
            }
        );
    }, [])

    return(
			<div id="background" className="h-screen transition-all duration-500">
			<Navbar />
				<div 
					className="jumbotron text-center py-48 lg:py-72 transition-all duration-500">
						<div ref={el => {jumbotronItem = el}}>
							<h1 className="text-7xl text-black dark:text-yellow-400 font-bold transition-all duration-500">Zzz Tracker</h1>
							<p className="text-4xl p-6 text-black dark:text-white font-bold transition-all duration-500">Create an account and track your 
							daily sleep</p>
							<Link to='/signup' className="bg-gray-700 hover:bg-gray-800 dark:bg-yellow-400 text-white dark:hover:bg-yellow-500 dark:text-black font-bold py-2 px-5 rounded mb-32 transition-all duration-500">Sign up now</Link>
						</div>
					</div>
			</div>
    )
}

export default SplashScreen;