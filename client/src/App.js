import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {Switch,Route} from "react-router-dom"

import SignIn from './components/Signin';

import AdminPage from './components/adminPage';
import ClientPage from './components/clientpage';

function App() {

  
  return (
   <>
    <Switch>

      
      <Route exact path="/" component={SignIn} />
    
      <Route exact path="/adminpage" component={AdminPage} />
      <Route exact path="/clientpage" component={ClientPage} />
      <Route exact path="/register/:user" component={Register} />
      <Route exact path="/edit/:id/:user" component={Edit} />
      <Route exact path="/view/:id" component={Details} />
    </Switch>
   
   </>
  );
}

export default App;






