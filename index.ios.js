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
 *  1. Hide back button on home screen.
 *  2. Go directly to games for MLU & AUDL & grey out division selection.
 *  3. Async / local storage for game data.
 *  4. Determine sorting of club / college / mlu / audl by API query.
 */
