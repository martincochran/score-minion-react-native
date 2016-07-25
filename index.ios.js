/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
} from 'react-native';


const MainComponent = require('./components/main');

AppRegistry.registerComponent('AwesomeProject', () => MainComponent);

/**
 * TODO:
 *  1. Go directly to games for MLU & AUDL & grey out division selection.
 *    a. Consider greying out league select in game view.
 *  2. Async / local storage for game data.
 *  3. Determine sorting of club / college / mlu / audl by API query.
 *  4. Hook up to real API.
 *    a. Pull down to refresh scores.
 */
