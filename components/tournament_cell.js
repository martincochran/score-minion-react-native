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
          <Image
            source={{uri: this.getTourneyImage()}}
            style={styles.thumbnail}
          />
        </View>
        <View style={styles.tournamentInfoContainer}>
          <TouchableHighlight onPress={() => this.selectTournament(this.tournament)}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {this.shortenName(this.props.tournament.name)}
              </Text>
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

  // shortenName ensures the tournament name fits within the enclosing area
  // on the smallest platform (iPhone 4s).
  // TODO: dynamically size based on platform. Names look awkwardly truncated on
  // iPhone 6s Plus.
  shortenName(name) {
    if (name.length > 32) {
      return name.substring(0, 32) + "...";
    }
    return name;
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
    flex: 2,
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
