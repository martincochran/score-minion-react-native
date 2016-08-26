/**
 * Component used to render a list of tournaments.
 */

'use strict';
const TournamentCell = require('./tournament_cell')

import Reflux from 'reflux';
import scores from './../stores/scores';

import React, {
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var API_URL = 'https://omega-bearing-780.appspot.com/_ah/api/scores/v1/tournaments';
var NUM_TOURNEYS = 5;
var PARAMS = '?count=' + NUM_TOURNEYS;
var REQUEST_URL = API_URL + PARAMS;

var TournamentComponent = React.createClass({
  displayName: 'TournamentComponent',

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

  render() {
    if (!this.state.tournaments || this.state.tournaments.length === 0) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.outerContainer}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshGames()}
            />
          }
          dataSource={this.state.dataSource.cloneWithRows(this.state.tournaments)}
          renderRow={(tournament) => this.renderTournament(tournament)}
          navigator={this.props.navigator}
          style={styles.listView}
        />
      </View>
    );
  },

  renderLoadingView() {
    return (
      <View style={styles.loadContainer}>
        <Text>
          No matching tournaments
        </Text>
      </View>
    );
  },

  renderTournament(tournament) {
    return (
      <TournamentCell tournament={tournament} navigator={this.props.navigator} />
    );
  },
});

var styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  listView: {
    flex: 3,
    backgroundColor: '#F5FCFF',
  },
});

export default TournamentComponent;
