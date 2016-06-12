'use strict';
const GamesComponent = require('./game')

import React, {
  Component,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class TournamentCell extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.thumbnailBorder}>
          <Image
            source={{uri: this.props.tournament.image_url_https}}
            style={styles.thumbnail}
          />
        </View>
        <View style={styles.tournamentInfoContainer}>
          <TouchableHighlight onPress={() => this.selectTournament(this.tournament)}>
            <View>
              <Text style={styles.title}>{this.props.tournament.name}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.tournamentDateContainer}>
            <TouchableHighlight onPress={() => Linking.openURL(this.props.tournament.url).catch(err => console.error('An error occurred', err))}>
              <Text style={styles.link}>{'Score reporter'}</Text>
            </TouchableHighlight>
            <Text style={styles.date}>{this.props.tournament.dates}</Text>
          </View>
        </View>
      </View>
    );
  }

  selectTournament() {
    if (this.props.navigator == null) {
      return;
    }
    this.props.navigator.push({
      name: this.props.tournament.name,
      passProps: {tournament: this.props.tournament},
    });
  }
}

var styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 80,
  },
  thumbnailBorder: {
    width: 100,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
  },
  tournamentInfoContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  tournamentDateContainer: {
    backgroundColor: '#F5FCFF',
    paddingRight: 10,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    flex: 2,
    fontSize: 22,
    textAlign: 'left',
  },
  link: {
    flex: 1,
    fontSize: 12,
    textAlign: 'left',
  },
  date: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
});

module.exports = TournamentCell;
