import React, { useState, useEffect, useContext } from 'react';
import flatpickr from 'flatpickr';
import Navbar from '../navbar/navbar';

export default function Homepage() {
    const [displayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        const dateSelect = document.getElementById('dateSelect');
        flatpickr(dateSelect, {
            dateFormat: "d-m-y"
        });
    })

    return (
        <div className="h-screen">
            <Navbar />
            <div className="flex justify-center">
                <button onClick={() => {setDisplayModal(!displayModal)}} type="button" className="bg-yellow-500 hover:bg-yellow-600 px-10 py-6 font-bold text-2xl mt-20 rounded-full flex transition duration-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>New Entry</button>
            </div>
            <div className={displayModal ? 'block' : 'hidden'}>
                <div className="w-full text-center">
                    <form>
                        <label htmlFor="date"> Select the date
                            <input name="date" type="text" id="dateSelect"/>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}