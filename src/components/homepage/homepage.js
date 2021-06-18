import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../navbar/navbar';
import TextField from '@material-ui/core/TextField';
import app from '../../firebase/base';
import './homepage.scss';
import useDarkMode from '../../services/useDarkMode';
import { v4 as uuidv4} from 'uuid';
import { AuthContext } from '../auth/auth';
import moment from 'moment';
import Swal from 'sweetalert2';
import Footer from '../footer/footer.js';

export default function Homepage() {
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    const [displayModal, setDisplayModal] = useState(false);
    const [sleepDate, setSleepDate] = useState('');
    const [asleepTime, setAsleepTime] = useState('');
    const [wakeupTime, setWakeupTime] = useState('');

    const [sleepArray, setSleepArray] = useState([]);

    const ref = app.firestore().collection('sleepData');

    function getSleepData() {
        ref
            .where('owner', '==', currentUserId)
            .orderBy('sleepDate', 'desc')
            .orderBy('asleepTime', 'desc')
            .limit(12)
            .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setSleepArray(items);
        })
    };

    useEffect(() => {
        getSleepData();
        // eslint-disable-next-line
    }, []);

    // Add sleep entry to DB
    function addSleepEntry() {
        const owner = currentUser ? currentUser.uid : 'unknown';
        const ownerEmail = currentUser ? currentUser.email : 'unknown';
        const newSleepEntry = {
            sleepDate,
            asleepTime,
            wakeupTime,
            id: uuidv4(),
            owner,
            ownerEmail,
            createdAt: new Date().toLocaleDateString()
            // lastUpdate: app.firestore.FieldValue.serverTimestamp(),
        };

        if (sleepDate === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter the sleep date'
            })
        } else if (asleepTime === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter the time you went to sleep'
            })
        } else if (wakeupTime === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter the time you woke up'
            })
        } else {
            ref
            .doc(newSleepEntry.id)
            .set(newSleepEntry)
            .catch((err) => {
                console.error(err);
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your sleep entry has been added'
            })
        };
    }

    // Delete sleep entry from DB
    function deleteSleepEntry(sleepEntry) {
        ref
            .doc(sleepEntry.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    };

    // Reset the sleep entry
    function resetEntry() {
        let date = document.getElementById('date');
        let asleep = document.getElementById('asleep');
        let wakeup = document.getElementById('wakeup');

        date.value = new Date().toISOString().slice(0, 10);
        asleep.value = '22:00';
        wakeup.value = '06:00';

        setSleepDate('');
        setAsleepTime('');
        setWakeupTime('');
    }

    // Get total sleep time
    function getTimeDiff(asleepTime, wakeupTime, entry) {
        // hours
        let asleepHour = parseInt(new Date("01/01/2007 " + asleepTime).getTime());
        let wakeupHour = parseInt(new Date("01/01/2007 " + wakeupTime).getTime());

        // decimal value
        let totalSleepDecimal = (wakeupHour - asleepHour) / 60000 / 60;

        if (totalSleepDecimal < 0) {
            totalSleepDecimal = 24 + totalSleepDecimal;
        }

        // decimal -> hh:mm format
        let duration = moment.duration(totalSleepDecimal, 'hours');
        let result = `${duration._data.hours < 10 ? '0' + duration._data.hours : duration._data.hours}:${duration._data.minutes < 10 ? '0' + duration._data.minutes : duration._data.minutes}`
        
        ref.doc(entry.id).update({
            totalSlept: result
        }).catch((err) => {console.error(err);})

        return result;

    }

    useDarkMode();

    return (
        <div id="background" className={`bg-gray-100 dark:bg-gray-900 splash-screen dark:splash-screen-dark transition duration-500 ${!displayModal && sleepArray.length < 5 ? 'h-screen' : 'h-full'} md:h-screen`}>
            <Navbar />
            <h1 className="text-3xl text-center font-bold text-black dark:text-white mt-10 mb-5 transition duration-500">{sleepArray.length !== 0 ? 'Your Sleep Entries' : "You haven't added any entries yet, you can add one by clicking the button below"}</h1>
            <div className={`${sleepArray.length < 1 ? '' : 'grid grid-cols-none md:grid-cols-2 mt-12'}`}>
                <div>
                    <div className="flex justify-center">
                        <button onClick={() => {setDisplayModal(!displayModal)}} 
                        type="button" 
                        className="bg-yellow-500 hover:bg-yellow-600 px-10 py-6 font-bold text-black dark:text-gray-200 text-2xl my-10 rounded-full flex transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>New Entry</button>
                     </div>
                     <div className={displayModal ? 'block' : 'hidden'}>

                    {/* Date Selection */}
                        <div className="p-10 lg:p-24 bg-gray-200 dark:bg-gray-700 transition duration-500 rounded w-min mx-auto">
                            <div className="mx-auto text-center align-middle w-64">
                                <div>
                                    <label htmlFor="date" className="font-bold text-black dark:text-white transition duration-500"> Select the date
                                    <TextField
                                        id="date"
                                        type="date"
                                        className="w-60"
                                        onChange={(event) => {setSleepDate(event.target.value)}}
                                        required
                                    />
                                    </label>
                                    <label htmlFor="asleepTime" className="font-bold text-black dark:text-white transition duration-500"> What time did you fall asleep?
                                    <TextField
                                        id="asleep"
                                        type="time"
                                        className="w-60"
                                        onChange={(event) => {setAsleepTime(event.target.value)}}
                                        required
                                    />
                                    </label>
                                    <label htmlFor="wakeupTime" className="font-bold text-black dark:text-white transition duration-500"> What time did you wake up?
                                    <TextField
                                        id="wakeup"
                                        type="time"
                                        className="w-60"
                                        onChange={(event) => {setWakeupTime(event.target.value)}}
                                        required
                                    />
                                    </label>
                                    <div className="flex">
                                        <button
                                        onClick={() => resetEntry()}
                                        className="font-bold bg-gray-300 dark:bg-gray-500 m-auto px-5 hover:bg-gray-400 dark:hover:bg-gray-600 py-2 rounded transition-all duration-300">Reset</button>
                                        <button
                                        onClick={() => addSleepEntry()}
                                        className="font-bold bg-yellow-400 m-auto px-4 hover:bg-yellow-500 py-2 rounded transition-all duration-300">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-10 mt-8 text-center">
                    {sleepArray.map((entry) => (
                    <div className="flex text-xs md:text-lg text-black dark:text-white justify-center bg-gray-200 dark:bg-yellow-600 w-full py-2 my-3 mx-auto opacity-90 transition duration-500 rounded md:rounded-full overflow-auto" key={entry.id}>
                        <h1 className="mx-2 lg:mx-5 my-auto"><span className="font-bold">{entry.sleepDate}</span></h1>
                        <h1 className="mx-2 lg:mx-5">Asleep time: <span className="font-bold">{entry.asleepTime}</span></h1>
                        <h1 className="mx-2 lg:mx-5">Wakeup time: <span className="font-bold">{entry.wakeupTime}</span></h1>
                        <h1 className="mx-2 lg:mx-5"><span className="font-bold">{getTimeDiff(entry.asleepTime, entry.wakeupTime, entry)} Hours Slept</span></h1>
                        <span className="cursor-pointer my-auto hover:text-red-600 mr-2" onClick={() => {deleteSleepEntry(entry)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </span>
                    </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}