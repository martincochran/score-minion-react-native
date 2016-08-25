'use strict';
import Reflux from 'reflux';

import nav from './../stores/nav';

import React, {
  StyleSheet,
  SegmentedControlIOS,
} from 'react-native';

import {SelectLeague} from './../components/actions';

var SmSegmentedControl = React.createClass({
  displayName: 'SmSegmentedControl',

  mixins: [Reflux.connect(nav, 'index')],

  componentDidMount() {
    nav.emit();
  },

  render() {
    var enabled = (this.state.index < 2);
    if (!this.selectedIndex) {
      this.selectedIndex = 0;
    }
    return (<SegmentedControlIOS
            values={["Club", "College", "AUDL", "MLU"]}
            selectedIndex={this.selectedIndex}
            enabled={enabled}
            style={styles.divisionControlView}
            onValueChange={(league) => SelectLeague(league)}
          />);
    },
});

var styles = StyleSheet.create({
  divisionControlView: {
    backgroundColor: '#F5FCFF',
  },
 });

module.exports = SmSegmentedControl;
