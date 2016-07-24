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

  // TODO: move data to tournament json blob and change render function below to use that data.
  fetchMockData() {
    var allData = [
        {
          name: 'game 1',
          last_update_source: {update_time_utc_str: 'today'},
          teams: [
            { score_reporter_account: {name: 'team 1'} },
            { score_reporter_account: {name: 'team 2'} },
          ],
          scores: [1, 2],
          division: "OPEN",
          age_bracket: "COLLEGE",
        },
        {
          name: 'game 2',
          last_update_source: {update_time_utc_str: 'yesterday'},
          teams: [
            { score_reporter_account: {name: 'team 3'} },
            { score_reporter_account: {name: 'team 4'} },
          ],
          scores: [3, 4],
          division: "WOMEN",
          age_bracket: "COLLEGE",
        },
        {
          name: 'game 3',
          last_update_source: {update_time_utc_str: 'yesterday'},
          teams: [
            { score_reporter_account: {name: 'team 5'} },
            { score_reporter_account: {name: 'team 6'} },
          ],
          scores: [5, 6],
          division: "MIXED",
          age_bracket: "CLUB",
        },
      ];
    return allData;
  },

  render() {
    if (!this.state.tournaments || this.state.tournaments.length === 0) {
      return this.renderLoadingView();
    }

    // ListView contents should look more like the following:
    //      dataSource={this.state.dataSource.cloneWithRows(
    //        this.state.tournaments[this.props.tournament])}
    return (
      <View style={styles.outerContainer}>
        <TournamentCell tournament={this.props.tournament}/>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(
            this.fetchMockData())}
          renderRow={(game) => this.renderGame(game)}
          style={styles.listView}
        />
      </View>
    );
  },

  renderLoadingView() {
    return (
      <View style={styles.loadContainer}>
        <Text> No matching games.</Text>
      </View>
    );
  },

  renderGame(game) {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{game.name + " - " + game.last_update_source.update_time_utc_str}</Text>
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
});

function getImage(team) {
  return 'file:///Users/martincochran/Pictures/IMG_1073.JPG'
  /*
  if (team.score_reporter_account) {
    return team.score_reporter_account.profile_image_url_https;
  } else {
    return team.twitter_account.profile_image_url_https;
  }
  */
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
    fontSize: 10,
    textAlign: 'right',
  },
  dash: {
    flex: 3,
    fontSize: 30,
    textAlign: 'center',
  },
  scoreLeft: {
    flex: 3,
    fontSize: 35,
    textAlign: 'left',
    fontFamily: 'Avenir Heavy'
  },
  scoreRight: {
    flex: 3,
    fontSize: 35,
    textAlign: 'right',
    fontFamily: 'Avenir Heavy'
  },
  teams: {
    fontSize: 10,
    textAlign: 'center',
  },
  thumbnail: {
    width: 51,
    height: 40,
  },
  listView: {
    flex: 3,
    backgroundColor: '#F5FCFF',
  },
});

export default GamesComponent;
