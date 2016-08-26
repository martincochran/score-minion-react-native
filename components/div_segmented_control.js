'use strict';
import Reflux from 'reflux';

import league from './../stores/league';

import React, {
  StyleSheet,
  SegmentedControlIOS,
} from 'react-native';

import {SelectDivision} from './../components/actions';

var SmSegmentedControl = React.createClass({
  displayName: 'SmSegmentedControl',

  mixins: [Reflux.connect(league, 'league')],

  componentDidMount() {
    league.emit();
  },

  selectDivision(div) {
    this.selectedDiv = div;
    SelectDivision(div);
  },

  render() {
    var enabled = (this.state.league !== "AUDL" && this.state.league !== "MLU");
    if (this.selectedIndex == null) {
      this.selectedIndex = 0;
      this.selectedDiv = "Women";
    }
    if (!enabled) {
      SelectDivision("Men")
    } else {
      this.selectDivision(this.selectedDiv);
    }
    this.prevEnabled = enabled;
    return (<SegmentedControlIOS
            ref='segcontrol'
            values={["Women", "Men", "Mixed"]}
            selectedIndex={this.selectedIndex}
            enabled={enabled}
            style={styles.divisionControlView}
            onValueChange={(div) => this.selectDivision(div)}
          />);
    },
});

var styles = StyleSheet.create({
  divisionControlView: {
    backgroundColor: '#F5FCFF',
  },
 });

module.exports = SmSegmentedControl;
