import React, { useEffect } from 'react';
// @ts-ignore
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './features/Main/Main';
import Cody from './Cody'
import WorkSpace from './features/WorkSpace/WorkSpace';
import { startService } from './esBuild/esbuild';
import Registration from './features/Registration/Registration';

const App: React.FC = () => {

  const isReg = true

  useEffect(() => {
    startService()
  }, [])
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/main' >
            {isReg ? <Main /> : <Redirect to='/register' />}
          </Route>
          <Route path='/cody' component={Cody} />
          <Route path='/register' component={Registration} />
          {/* <Route path='/card/:username/:reponame' component={Repository} /> */}
          <Route path='/work_space/:id' component={WorkSpace} />
          <Redirect to="/main" />
        </Switch>
    </BrowserRouter>
  );
};

export default App;