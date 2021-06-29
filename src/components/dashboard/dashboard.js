import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer.js';
import '../../../node_modules/react-vis/dist/style.css';
import { LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, FlexibleXYPlot} from 'react-vis';
import app from '../../firebase/base.js';
import { AuthContext } from '../auth/auth.js';
import './dashboard.scss';

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
            .limit(7)
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

        // eslint-disable-next-line array-callback-return
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
        sleepArray.length > 0 ?
        <div className="h-full md:h-screen splash-screen dark:splash-screen-dark transition duration-500">
            <Navbar />
            <div className="text-center">
                <h1 className="font-bold text-3xl lg:text-5xl my-8 text-black dark:text-white transition-all duration-500">Your Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mx-10 my-12 md:my-0 lg:my-24 relative">
                <div className="dashboard-container w-full lg:w-4/5 justify-center text-center my-5 mx-auto bg-gray-400 dark:bg-gray-700 text-black dark:text-white opacity-80 pb-16 pt-5 px-5 rounded-md transition-all duration-500">
                    <h1 className="text-3xl font-bold mb-3 text-black dark:text-yellow-500 transition-all duration-500">Graph</h1>
                    <FlexibleXYPlot className="mx-auto" xType="time" yDomain={[1, 12]} stroke="orange">
                        <XAxis style={{fontSize: 12, fontWeight: 'bold', fill: `${document.documentElement.classList.contains('dark') ? 'white' : 'black'}`}} />
                        <YAxis style={{fontSize: 16, fontWeight: 'bold', fill: `${document.documentElement.classList.contains('dark') ? 'white' : 'black'}`}} />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <LineSeries 
                        data={sleepArray.map((entry) => {
                            return {x: new Date(entry.sleepDate), y: parseInt(entry.totalSlept)}
                        })}
                        style={{strokeWidth: 6}}
                        />
                    </FlexibleXYPlot>
                </div>
                <div className="text-center justify-center m-5 w-full mx-auto">
                    <div className="bg-gray-400 dark:bg-gray-700 opacity-80 rounded-lg py-5 text-black dark:text-white transition-all duration-500" style={{height: 500}}>
                        <h1 className="text-3xl font-bold mb-3 text-black dark:text-yellow-500 transition-all duration-500">Stats</h1>
                        <h1 className="text-xl font-bold my-5">Average sleep time: <br /> <span className="text-yellow-400 text-3xl">{averageSleepTime} Hours</span></h1>
                        <h1 className="text-xl font-bold my-5">Days with less than 6 hours sleep: <br /><span className="text-yellow-400 text-3xl">{less6Hours}</span></h1>
                        <h1 className="text-xl font-bold my-5">Days with more than 8 hours sleep: <br /><span className="text-yellow-400 text-3xl">{more8Hours}</span></h1>
                        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mt-10 mx-5">{averageSleepTime < 7 ? "You should sleep more. Healthy adults need between 7 and 9 hours of sleep" : averageSleepTime > 9 ? 'You sleep too much. Healthy adults need between 7 and 9 hours of sleep' : 'You are having the recommended amount of sleep. \n Keep it up!'}</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        :
        <div className="h-full md:h-screen splash-screen dark:splash-screen-dark transition duration-500">
            <Navbar />
            <div className="text-center">
                <h1 className="font-bold text-3xl lg:text-5xl my-8 text-black dark:text-white transition-all duration-500">Your Dashboard</h1>
                <h1 className="font-bold text-3xl lg:text-5xl mt-48 mx-5 text-black dark:text-white transition-all duration-500">You don't have any entries yet, <Link to="/entries" className="text-yellow-500">click here</Link> to add some</h1>
            </div>
        </div>
    )
}

export default Dashboard;