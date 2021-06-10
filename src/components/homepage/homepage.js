import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import TextField from '@material-ui/core/TextField';
import './homepage.css';
import useDarkMode from '../../services/useDarkMode';

export default function Homepage() {
    const [displayModal, setDisplayModal] = useState(false);

    useDarkMode();

    return (
        <div id="background" className="h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
            <Navbar />
            <div className="flex justify-center">
                <button onClick={() => {setDisplayModal(!displayModal)}} type="button" className="bg-yellow-500 hover:bg-yellow-600 px-10 py-6 font-bold text-2xl my-20 rounded-full flex transition duration-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>New Entry</button>
            </div>
            <div className={displayModal ? 'block' : 'hidden'}>

                {/* Date Selection */}
                <div className="p-10 lg:p-24 bg-gray-200 dark:bg-gray-700 transition duration-500 rounded w-min mx-auto">
                    <div className="mx-auto text-center align-middle w-64">
                    <form>
                        <label htmlFor="date" className="font-bold text-black dark:text-white transition duration-500"> Select the date
                        <TextField
                            id="date"
                            type="date"
                            className="w-60"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                            required
                        />
                        </label>
                        <label htmlFor="asleepTime" className="font-bold text-black dark:text-white transition duration-500"> What time did you fall asleep?
                        <TextField
                            id="date"
                            type="time"
                            className="w-60"
                            defaultValue="22:00"
                            required
                        />
                        </label>
                        <label htmlFor="wakeupTime" className="font-bold text-black dark:text-white transition duration-500"> What time did you wake up?
                        <TextField
                            id="date"
                            type="time"
                            className="w-60"
                            defaultValue="06:00"
                            required
                        />
                        </label>
                        <button type="submit" className="font-bold bg-yellow-400 hover:bg-yellow-500 w-60 p-2 rounded transition-all duration-300">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
            { /* If user doesn't have any entries, show message */}
        </div>
    )
}