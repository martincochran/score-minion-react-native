/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
} from 'react-native';


const GamesComponent = require('./components/game');
const TournamentComponent = require('./components/tournaments');
const NavComponent = require('./components/nav');

AppRegistry.registerComponent('AwesomeProject', () => NavComponent);
