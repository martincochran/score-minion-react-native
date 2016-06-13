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
 *  1. Hook up division / league selection to state of GamesComponent and TouranmentComponent.
 *  2. Hide back button on home screen.
 *  3. Go directly to games for MLU & AUDL & grey out division selection.
 *  4. Async / local storage for game data.
 *  5. Determine sorting of club / college / mlu / audl by API query.
 */
