import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "../Login";
import SignUp from "../SignUp";
import ForgotPassword from "../ForgotPassword";
import RecoverPassword from "../RecoverPassword";
import Home from "../Home";

function App() {
    return (
        <BrowserRouter>
            <div className="">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/contact" component={Home}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/recover_password/:key" component={RecoverPassword}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
