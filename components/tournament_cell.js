'use strict';

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
          <View style={styles.thumbnailShadow}>
            <Image
              source={{uri: this.getTourneyImage()}}
              style={styles.thumbnail}
            />
          </View>
        </View>
        <View style={styles.tournamentInfoContainer}>
          <TouchableHighlight onPress={() => this.selectTournament(this.tournament)}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{this.props.tournament.name}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.tournamentDateContainer}>
            <TouchableHighlight onPress={() => Linking.openURL(this.props.tournament.url).catch(err => console.error('An error occurred', err))}>
              <Text style={styles.link}>{'Score reporter'}</Text>
            </TouchableHighlight>
            <Text style={styles.date}>{
              this.formatDateString()
            }</Text>
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

  getTourneyImage() {
    if (this.props.tournament.image_url_https) {
      return this.props.tournament.image_url_https;
    }
    return "https://play.usaultimate.org/assets/1/15/EventLogoDimension/USAUSanctioned.jpg";
  }

  // TODO: come up with better-formatted date string. eg 'this weekend'.
  // TODO: See related TODO in game.
  formatDateString() {
    var start = this.props.tournament.start_date;
    var end = this.props.tournament.end_date;
    return start.substring(4, 10) + " - " + end.substring(4, 10);
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
  thumbnailShadow: {
    width: 80,
    height: 60,
    borderRadius: 5,
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#000000',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 80,
    height: 60,
  },
  tournamentInfoContainer: {
    flex: 3,
    height: 70,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  tournamentDateContainer: {
    backgroundColor: '#F5FCFF',
    paddingRight: 10,
    paddingBottom: 2,
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 2,
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    height: 51,
    fontSize: 21,
    textAlign: 'left',
  },
  link: {
    flex: 1,
    fontSize: 12,
    textAlign: 'left',
    color: '#000FFF',
  },
  date: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});

module.exports = TournamentCell;
