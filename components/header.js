'use strict';

import BackButton from './back_button';

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <BackButton onPress={() => this.props.onClickBack()}/>
        <Text style={styles.title}>{'score minion'}</Text>
        <TouchableHighlight onPress={() => this.props.onClickIcon()}>
          <Image
            source={require('image!score_minion')}
            style={styles.thumbnail}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    height: 48,
  },
  thumbnail: {
    width: 64,
    height: 48,
    borderRightWidth: 15,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'Avenir Heavy',
    textAlign: 'center',
    borderBottomWidth: 10,
  },
});

module.exports = Header;
