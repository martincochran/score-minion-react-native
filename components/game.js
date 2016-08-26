/**
 * Component used to render a list of games.
 */

'use strict';

const TournamentCell = require('./tournament_cell')

import Reflux from 'reflux';
import scores from './../stores/scores';

import React, {
  Component,
  Image,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var GamesComponent = React.createClass({
  displayName: 'GamesComponent',

  mixins: [Reflux.connect(scores, 'tournaments')],

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount() {
    scores.emit();
  },

  refreshGames() {
    this.setState({refreshing: true});
    scores.fetchScores().done();
    this.setState({refreshing: false});
  },

  getGamesForTournament() {
    if (!this.state.tournaments) {
      return [];
    }
    var tourneys = this.state.tournaments;
    for (var i = 0; i < tourneys.length; i++) {
      if (tourneys[i].id_str === this.props.tournament.id_str) {
        return tourneys[i].filteredGames;
      }
    }
    return [];
  },

  render() {
    if (this.getGamesForTournament().length === 0) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.outerContainer}>
        <TournamentCell tournament={this.props.tournament}/>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(
            this.getGamesForTournament())}
          renderRow={(game) => this.renderGame(game)}
          style={styles.listView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshGames()}
            />
          }
        />
      </View>
    );
  },

  renderLoadingView() {
    return (
      <View style={styles.loadContainer}>
        <Text> No matching games</Text>
      </View>
    );
  },

  renderGame(game) {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{this.getTitle(game.name, game.last_update_source.update_time_utc_str)}</Text>
          <Text style={styles.gameStatus}>{game.game_status}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.teamContainer}>
            <Image
              source={{uri: getImage(game.teams[0])}}
              style={styles.thumbnail}
            />
            <Text style={styles.teams}>{getTeamName(game.teams[0])}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLeft}>{getRawScore(game.scores, 0)}</Text>
            <Text style={styles.dash}>-</Text>
            <Text style={styles.scoreRight}>{getRawScore(game.scores, 1)}</Text>
          </View>
          <View style={styles.teamContainer}>
            <Image
              source={{uri: getImage(game.teams[1])}}
              style={styles.thumbnail}
            />
            <Text style={styles.teams}>{getTeamName(game.teams[1])}</Text>
          </View>
        </View>
      </View>
    );
  },

  // TODO: format the date better. See related TODO in tournament_cell.
  getTitle(name, update_time) {
    return name + " - " + update_time.substring(4, 10);
  }
});

// TODO: come up with a cooler default image.
function getImage(team) {
  var dUrl = "https://play.usaultimate.org/assets/EventPictures/logo.png";
  var url = "";
  if (team.twitter_account) {
    url = team.twitter_account.profile_image_url_https;
  } else {
    if (team.score_reporter_account) {
      url = team.score_reporter_account.profile_image_url_https;
    }
  }
  if (url) {
    return url;
  }
  return dUrl;
}


function getTeamName(team) {
  if (team.score_reporter_account) {
    return team.score_reporter_account.name;
  } else {
    return team.twitter_account.user_defined_name;
  }
}

function getScoreString(scores) {
  var home = scores[0];
  if (home == -1) {
    home = 0;
  }
  var away = scores[1];
  if (away == -1) {
    away = 0;
  }
  return home + " - " + away;
}

function getRawScore(scores, index) {
  var score = scores[index];
  if (score == -1) {
    return 0;
  }
  return score;
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    height: 85,
  },
  outerContainer: {
    flex: 2,
    flexDirection: 'column',
    borderBottomWidth: 1,
    height: 85,
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  teamContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 12,
    textAlign: 'left',
  },
  gameStatus: {
    paddingRight: 10,
    fontSize: 10,
    textAlign: 'left',
  },
  dash: {
    flex: 3,
    fontSize: 30,
    textAlign: 'center',
  },
  scoreLeft: {
    flex: 3,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Avenir Heavy'
  },
  scoreRight: {
    flex: 3,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Avenir Heavy'
  },
  teams: {
    fontSize: 10,
    textAlign: 'center',
  },
  // TODO: see if there is a property to ensure photos don't get cropped. 
  thumbnail: {
    width: 60,
    height: 40,
  },
  listView: {
    flex: 3,
    backgroundColor: '#F5FCFF',
  },
});

export default GamesComponent;
