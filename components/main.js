'use strict';

const NavComponent = require('./nav')
const Header = require('./header')
const SmSegmentedControl = require('./sm_segmented_control')
const DivSegmentedControl = require('./div_segmented_control')

import React, {
  Component,
  Navigator,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {SelectLeague, SelectDivision} from './../components/actions';
import scores from './../stores/scores';

class MainComponent extends Component {

  goHome() {
    // TODO: show hover text saying loading new scores?
    scores.fetchScores();
    this.refs.navigator.popToTop();
  }

  goBack() {
    this.refs.navigator.pop();
  }

  numRoutes() {
    if (this.refs.navigator == null) {
      return 0;
    }
    return this.refs.navigator.numRoutes();
  }

  render() {
    return (
        <View style={styles.mainView}>
          <Header ref='header'
            ref='header'
            onClickBack={() => this.goBack()}
            onClickIcon={() => this.goHome()}
            />
          <SmSegmentedControl/>
          <NavComponent
            ref='navigator'
            style={styles.navView}
          />
          <DivSegmentedControl/>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  mainView: {
    flex: 3,
    marginTop:30,
  },
  navView: {
  },
  divisionControlView: {
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MainComponent;
