import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "../Login";
import SignUp from "../SignUp";

function App() {
  return (
      <BrowserRouter>
        <div className="">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}
export default App;
