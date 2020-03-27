import React from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import routes from './routes';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/'
      ? (
        <>
        {routes}
        </>
      )
      : (
        <>
          <Nav />
          {routes}
        </>
      )
      }
    </div>
  );
}

export default withRouter(App);
