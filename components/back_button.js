import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: handle this appropriately once reflux is working.
    if (true) {
      return (
        <View style={styles.visible}>
          <TouchableHighlight onPress={() => this.props.onPress()}>
            <Text style={styles.button}>Back</Text>
          </TouchableHighlight>
        </View>);
    }
    return (
      <View style={styles.visible}>
      </View>);
  }
}

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
