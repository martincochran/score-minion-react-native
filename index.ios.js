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
 *  1. Use Reflux for MVC behavior.
 *  2. Hide back button on home screen.
 *  3. Hook up division / league selection to state of GamesComponent and TouranmentComponent.
 *  4. Go directly to games for MLU & AUDL & grey out division selection.
 *  5. Async / local storage for game data.
 *  6. Determine sorting of club / college / mlu / audl by API query.
 */
