/**
 * iOS app for score minion.
 */
'use strict';
import React, {
  AppRegistry,
} from 'react-native';


const MainComponent = require('./components/main');

AppRegistry.registerComponent('ScoreMinion', () => MainComponent);

/**
 * TODO:
 *  1. Determine sorting of club / college / mlu / audl by API query.
 */
