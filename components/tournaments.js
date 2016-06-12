/**
 * Component used to render a list of tournaments.
 */

'use strict';
const TournamentCell = require('./tournament_cell')

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var API_URL = 'https://omega-bearing-780.appspot.com/_ah/api/scores/v1/tournaments';
var NUM_TOURNEYS = 5;
var PARAMS = '?count=' + NUM_TOURNEYS;
var REQUEST_URL = API_URL + PARAMS;

class TournamentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      allData: [],
      filteredData: [],
      // TODO: get this from the selection of the segmented controls
      division: "WOMEN",
      ageBracket: "COLLEGE",
      // Probably don't need league for tournament component, but definitely for game component.
      league: "USAU",
      loaded: false,
    };
  }

  componentDidMount() {
    // TODO: change to fetchData()
    this.fetchMockData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.tournaments),
          loaded: true,
        });
      })
      .done();
  }

  fetchMockData() {
    var allData = [
          {
            "url": "https://play.usaultimate.org/events/Round-Stone-2016",
            "name": "Round Stone 2016",
            "id_str": "Round-Stone-2016",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN", "WOMEN"],
            "age_brackets": ["COLLEGE", "CLUB"],
            "league": "USAU",
            "dates": "April 16th-17th",
          },
          {
            "url": "https://play.usaultimate.org/events/TCT-Pro-Elite-Challenge-2016-Colorado-Cup",
            "name": "TCT Pro Elite Challenge 2016 Colorado Cup",
            "id_str": "TCT-Pro-Elite-Challenge-2016-Colorado-Cup",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["MIXED", "WOMEN"],
            "age_brackets": ["COLLEGE"],
            "league": "AUDL",
            "dates": "April 9th-10th",
          },
          {
            "url": "https://play.usaultimate.org/events/CUC-Ridgefield-High-School-Club-Practices",
            "name": "CUC Ridgefield High School Club Practices",
            "id_str": "CUC-Ridgefield-High-School-Club-Practices",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["MIXED", "OPEN"],
            "age_brackets": ["CLUB"],
            "league": "MLU",
            "dates": "April 9th",
          },
        ];
    this.filterData(allData);
  }

  // filterData restricts the visible games by the filters selected in the UI.
  filterData(allData) {
    var filteredData = [];
    if (this.state.division == "ALL") {
      filteredData = allData;
    } else {
      for (var i = 0; i < allData.length; i++) {
        var row = allData[i];
        for (var j = 0; j < row["divisions"].length; j++) {
          if (row["divisions"][j] == this.state.division) {
            // TODO: this is probably n^2; probably a better way
            filteredData = filteredData.concat([row]);
          }
        }
      }
    }
    var ageBracketFiltered = [];
    for (var i = 0; i < filteredData.length; i++) {
      var row = filteredData[i];
      for (var j = 0; j < row["age_brackets"].length; j++) {
        if (row["age_brackets"][j] == this.state.ageBracket) {
          // TODO: this is probably n^2; probably a better way
          ageBracketFiltered = ageBracketFiltered.concat([row]);
        }
      }
    }
    var leagueFiltered = [];
    for (var i = 0; i < ageBracketFiltered.length; i++) {
      var row = ageBracketFiltered[i];
      if (row["league"] == this.state.league) {
        // TODO: this is probably n^2; probably a better way
        leagueFiltered = leagueFiltered.concat([row]);
      }
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(ageBracketFiltered),
      allData: allData,
      filteredData: ageBracketFiltered,
      division: this.state.division,
      league: this.league,
      ageBracket: this.ageBracket,
      loaded: true,
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(tournament) => this.renderTournament(tournament)}
          navigator={this.props.navigator}
          style={styles.listView}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.loadContainer}>
        <Text>
          Loading tournaments...
        </Text>
      </View>
    );
  }

  renderTournament(tournament) {
    return (
      <TournamentCell tournament={tournament} navigator={this.props.navigator} />
    );
  }
}

var styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    flex: 2,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = TournamentComponent;
