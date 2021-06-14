import React, {useState, useContext, useEffect} from 'react';
import Navbar from '../navbar/navbar';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import app from '../../firebase/base.js';
import { AuthContext } from '../auth/auth.js';

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    const [sleepArray, setSleepArray] = useState([]);

    const [averageSleepTime, setAverageSleep] = useState(0);

    const [less6Hours, setLess6Hours] = useState(0);
    const [more8Hours, setMore8Hours] = useState(0);

    const ref = app.firestore().collection('sleepData');

    function getSleepData() {
        ref
            .where('owner', '==', currentUserId)
            .orderBy('sleepDate', 'desc')
            .orderBy('asleepTime', 'desc')
            .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setSleepArray(items);
        })
    };

    useEffect(() => {
        getSleepData()
        getSleepStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSleepStats]);

    function getSleepStats() {
        let averageSleep = 0;

        let less6Hours = [];
        let more8Hours = [];

        for (let i = 0; i < sleepArray.length; i++) {
            var hoursMinutesTotalSlept = sleepArray[i].totalSlept.split(/[.:]/);
            var hours = parseInt(hoursMinutesTotalSlept[0], 10);
            var minutes = hoursMinutesTotalSlept[1] ? parseInt(hoursMinutesTotalSlept[1], 10) : 0;
            var decimalTime = hours + minutes / 60;

            averageSleep += decimalTime;
        }

        setAverageSleep(Math.round(averageSleep / sleepArray.length * 10) / 10);

        sleepArray.map((entry) => {
            if (parseInt(entry.totalSlept) < 7) {
                return less6Hours.push(parseInt(entry.totalSlept));
            } else if (parseInt(entry.totalSlept) > 8) {
                return more8Hours.push(parseInt(entry.totalSlept));
            }
        });

        setLess6Hours(less6Hours.length);
        setMore8Hours(more8Hours.length);
    }

    return (
        <div className="h-screen splash-screen dark:splash-screen-dark transition duration-500">
            <Navbar />
            <div className="text-center">
                <h1 className="font-bold text-3xl lg:text-5xl my-8 text-black dark:text-white transition-all duration-500">Your Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto my-32">
                <div className='justify-center text-center bg-gray-400 dark:bg-gray-700 text-black dark:text-white opacity-80 w-3/4 py-5 mx-auto rounded-md transition-all duration-500'>
                    <h1 className="text-3xl font-bold mb-3">Graph</h1>
                    <XYPlot className="mx-auto" height={400} width= {600} xType="ordinal" yDomain={[1, 12]} stroke="orange">
                        <XAxis style={{fontSize: 13, fontWeight: 'bold', color: 'black'}} />
                        <YAxis style={{fontSize: 16, fontWeight: 'bold'}} />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <LineSeries 
                        data={sleepArray.map((entry) => {
                            return {x: entry.sleepDate, y: parseInt(entry.totalSlept)}
                        })}
                        style={{strokeWidth: 6}}
                        />

                    </XYPlot>
                </div>
                <div className="text-center justify-center w-4/5 mx-auto">
                    <div className="bg-gray-400 dark:bg-gray-700 opacity-80 rounded-lg py-5 text-black dark:text-white transition-all duration-500" style={{height: 500}}>
                        <h1 className="text-3xl font-bold mb-3">Stats</h1>
                        <h1 className="text-xl font-bold my-5">Your average sleep time: {averageSleepTime} Hours</h1>
                        <h1 className="text-xl font-bold my-5">Number of days with less than 6 hours sleep: {less6Hours}</h1>
                        <h1 className="text-xl font-bold my-5">Number of days with more than 8 hours sleep: {more8Hours}</h1>
                        <h1 className="text-3xl font-bold mt-24 mx-5">{averageSleepTime < 7 ? "You should sleep more. Healthy adults need between 7 and 9 hours of sleep" : averageSleepTime > 9 ? 'You sleep too much. Healthy adults need between 7 and 9 hours of sleep' : 'You are having the recommended amount of sleep. Keep it up!'}</h1>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard;