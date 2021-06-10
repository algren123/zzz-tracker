import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import app from '../../firebase/base';
import useDarkMode from '../../services/useDarkMode';
import { AuthContext } from '../auth/auth';
import Navbar from '../navbar/navbar';
import './login.scss';

const Login = ({ history }) => {
    useDarkMode();

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try { 
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push('/');
                window.location.href = '/home';
            } catch(error) {
                alert(error);
            }
        }, [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to='/home' />;
    }

    return (
        <div id="background" className="h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
          <Navbar />
          <div className="mx-auto text-center align-middle w-min pt-32 flex">
            <div className="p-10 lg:p-24 bg-gray-200 dark:bg-gray-700 transition duration-500 rounded">
              <h1 className="text-5xl text-black dark:text-yellow-500 font-bold mb-5 transition-all duration-500"><span className="text-yellow-500 dark:text-white transition-all duration-500">Zzz</span> Tracker</h1>
              <form onSubmit={handleLogin}>
                <input className="input-email font-bold placeholder-yellow-500 bg-gray-600 text-black dark:text-white w-60 rounded my-5 text-center" name="email" type="email" placeholder="Email" />
                <input className="input-password font-bold placeholder-yellow-500 text-black dark:text-white w-60 rounded text-center mb-10" name="password" type="password" placeholder="Password" />
                <button className="font-bold bg-yellow-400 hover:bg-yellow-500 w-60 p-2 rounded transition-all duration-300" type="submit">Log in</button>
                <p className="mt-5 font-bold text-black dark:text-white transition duration-500">Don't have an account? <Link to="/signup" className="text-yellow-500 cursor-pointer">Sign Up</Link></p>
            </form>
            </div>
          </div>
        </div>
      );
}

export default withRouter(Login);
