import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import FrontPage from './FrontPage';
import Birds from './projects/birds/Birds';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/canvas-toy' exact component={FrontPage} />
      <Route path='/canvas-toy/birds' component={Birds} />
      <Route path='*'>
        <Redirect to={'/canvas-toy'} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
