import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FrontPage from './FrontPage';
import Birds from './projects/birds/Birds';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={FrontPage} />
      <Route path='/birds' component={Birds} />
    </Switch>
  </BrowserRouter>
);

export default App;
