'use strict';

const NavComponent = require('./nav')
const Header = require('./header')

import React, {
  Component,
  Navigator,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {SelectLeague, SelectDivision} from './../components/actions';

class MainComponent extends Component {

  goHome() {
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
            isHome={() => this.numRoutes() == 0}
            onClickBack={() => this.goBack()}
            onClickIcon={() => this.goHome()}
            numRoutes={() => this.numRoutes()}
            />
          <SegmentedControlIOS
            values={["Club", "College", "AUDL", "MLU"]}
            selectedIndex={0}
            enabled={true}
            style={styles.divisionControlView}
            // TODO: if AUDL / MLU is selected, force selection of division
            // and grey out control.
            onValueChange={(league) => SelectLeague(league)}
          />
          <NavComponent
            ref='navigator'
            style={styles.navView}
          />
          <SegmentedControlIOS
            values={["All", "Women", "Men", "Mixed"]}
            selectedIndex={0}
            enabled={true}
            style={styles.divisionControlView}
            onValueChange={(div) => SelectDivision(div)}
          />
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
