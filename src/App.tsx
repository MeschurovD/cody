
//<--------------------IMPORT-------------------------->
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './features/Main/Main';
import WorkSpace from './features/WorkSpace/WorkSpace';
import { startService } from './esBuild/esbuild';
import Registration from './features/Registration/Registration';


//<--------------------COMPONENT----------------------->
const App: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const isReg = true


//<--------------------USE EFFECT---------------------->
  useEffect(() => {
    startService()
  }, [])

  
//<--------------------JSX COMPONENT------------------->
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/main' >
          {!isReg
            ? <Redirect to='/register' />
            : <Main />
          }
        </Route>
        <Route path='/register' component={Registration} />
        <Route path='/work_space/:id' component={WorkSpace} />
        <Redirect to="/main" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;