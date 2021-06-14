import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Createpost from './Components/Createpost';

ReactDOM.render(
  
    <BrowserRouter>
    
    <Switch>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/login' component={Signin} />
    <Route exact path='/createpost' component={Createpost}/>
    
    <Route component={App} />
    </Switch>
    </BrowserRouter>,
    
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
