import React from 'react';

function Footer() {
    return (
        <footer className={`${window.location.href.includes('login') || window.location.href.includes('signup') ? 'absolute' : 'relative'} ${window.location.href.includes('entries') ? 'hidden' : 'block'} md:relative lg:absolute bottom-0 w-full mt-auto py-3 bg-gray-400 bg-opacity-60 dark:bg-opacity-80 dark:bg-gray-800 transition-all duration-500 text-center`}>
            <p className="font-bold text-black dark:text-gray-300">Algren Pauna © 2021</p>
        </footer>
    )
}

export default Footer;