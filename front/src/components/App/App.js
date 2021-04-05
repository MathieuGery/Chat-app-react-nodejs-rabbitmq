import '../../App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "../Login";

function App() {
  return (
      <BrowserRouter>
        <div className="">
          <Switch>
            <Route exact path="/" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
