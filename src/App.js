import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pokedex from './Pokedex';
import Pokemon from './Pokemon';

function App() {
  return (
    <Switch>
      <Route exact path='/:pokemonId' render={(props) => <Pokemon {...props} />} />
      <Route path='/' render={(props) => <Pokedex {...props} />} />
    </Switch>
  );
}

export default App;
