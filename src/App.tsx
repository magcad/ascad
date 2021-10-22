import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScenarioEditor from './components/ScenarioEditor';
import MainWindow from './MainWindow';

function App(): JSX.Element {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={MainWindow} />
        <Route exact path="/scenario-editor" component={ScenarioEditor} />
        <Route>
          404
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
