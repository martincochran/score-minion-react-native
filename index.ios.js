/**
 * iOS app for score minion.
 */
'use strict';
import React, {
  AppRegistry,
} from 'react-native';


const MainComponent = require('./components/main');

AppRegistry.registerComponent('AwesomeProject', () => MainComponent);

/**
 * TODO:
 *  1. Small tweaks to make UI prettier.
 *  2. Allow 'refresh' even when there are no tournaments shown.
 *  3. Async / local storage for game data.
 *  4. Go directly to games for MLU & AUDL & grey out division selection.
 *    a. Consider greying out league select in game view.
 *  5. Determine sorting of club / college / mlu / audl by API query.
 */
