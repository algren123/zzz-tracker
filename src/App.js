import './App.css';
import SplashScreen from './components/splash-screen/splash-screen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Signup from './components/signup-page/signup';
import { AuthProvider } from './components/auth/auth.js';
import Login from './components/login-page/login';
import Homepage from './components/homepage/homepage';

function App() {
  return (
    <AuthProvider>
      <Router basename="/zzz-tracker">
        <Switch>
          <Route path="/" exact>
            <SplashScreen />
          </Route>
          <Route path="/signup" component={Signup}>
            <Signup />
          </Route>
          <Route path="/login" component={Login}>
            <Login />
          </Route>
          <Route path="/home" component={Homepage}>
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
    
  );
}

export default App;