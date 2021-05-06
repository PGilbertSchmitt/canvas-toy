import { join } from 'path';
import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { BASE_ROUTE } from '../constants/route';

import FrontPage from './FrontPage';
import Birds from './projects/birds/Birds';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={BASE_ROUTE} exact component={FrontPage} />
      <Route path={join(BASE_ROUTE, 'birds')} component={Birds} />
      <Route path='*'>
        <Redirect to={BASE_ROUTE} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
