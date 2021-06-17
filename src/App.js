import './App.css';
import SplashScreen from './components/splash-screen/splash-screen';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
} from "react-router-dom";
import Signup from './components/signup-page/signup';
import { AuthProvider } from './components/auth/auth.js';
import Login from './components/login-page/login';
import Homepage from './components/homepage/homepage';
import Dashboard from './components/dashboard/dashboard';
import About from './components/about/about';

function App() {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light');
  }
  
  return (
    <AuthProvider>
      <Router>
        <HashRouter>
          <Route path="/" exact>
            {<SplashScreen />}
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/entries">
            <Homepage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </HashRouter>
      </Router>
    </AuthProvider>
    
  );
}

export default App;