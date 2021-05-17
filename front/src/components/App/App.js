import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Login from "../Login";
import SignUp from "../SignUp";
import ForgotPassword from "../ForgotPassword";
import RecoverPassword from "../RecoverPassword";
import Home from "../Home";
import Cookies from "js-cookie";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
            if (Cookies.get("jwt") === undefined) {
                return <Redirect to="/"/>;
            } else {
                return (<Component {...props}/>);
            }
        }}
    />
);

function App() {
    return (
        <BrowserRouter>
            <div className="">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <PrivateRoute exact path="/contact" component={Home}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/recover_password/:key" component={RecoverPassword}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
