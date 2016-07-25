'use strict';
import Reflux from 'reflux';

import nav from './../stores/nav';

import React, {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var BackButton = React.createClass({
  displayName: 'BackButton',

  mixins: [Reflux.connect(nav, 'index')],

  componentDidMount() {
    nav.emit();
  },

  render() {
    if (this.state.index < 2) {
      return (
        <View style={styles.visible}>
        </View>);
    }
    return (
      <View style={styles.visible}>
        <TouchableHighlight onPress={() => this.props.onPress()}>
          <Text style={styles.button}>Back</Text>
        </TouchableHighlight>
      </View>);
  },
});

var styles = StyleSheet.create({
  invisible: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 48,
  },
  visible: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 48,
  },
  button: {
    borderLeftWidth: 5,
    borderBottomWidth: 10,
  },
 });

module.exports = BackButton;
