import Authentication from './components/Authentication/Authentication';
import {Route,Switch} from "react-router-dom";
import './App.css';
import Welcome from './components/Pages/Welcome';

function App() {
  return (
    <Switch>
    <Route path="/auth" exact>
    <Authentication/>
    </Route>
    <Route path="/">
      <Welcome/>
    </Route>
    </Switch>
  );
}

export default App;
