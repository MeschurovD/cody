
//<--------------------IMPORT-------------------------->
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './features/Main/Main';
//import WorkSpace from './features/WorkSpace/WorkSpace';
import { startService } from './esBuild/esbuild';
import Registration from './features/Registration/Registration';

const WorkSpace = lazy(() => import('./features/WorkSpace/WorkSpace'))

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
    <Suspense fallback={<div>Загрузка...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;