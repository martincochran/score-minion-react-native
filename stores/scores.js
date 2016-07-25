import Reflux from 'reflux';
import {SelectLeague, SelectDivision} from './../components/actions';

import React from 'react-native';
var {AsyncStorage} = React;

var API_URL = 'https://omega-bearing-780.appspot.com/_ah/api/scores/v1/tournaments';
var NUM_TOURNEYS = 5;
var PARAMS = '?count=' + NUM_TOURNEYS;
var REQUEST_URL = API_URL + PARAMS;

export default Reflux.createStore({
  init() {
    this._division = "ALL";
    this._ageBracket = "CLUB";
    this._league = "USAU";
    this._loadScores().done();
    this.listenTo(SelectLeague, (league) => this.selectLeague(league));
    this.listenTo(SelectDivision, (div) => this.selectDivision(div));
  },

  // Loads the scores to the local storage.
  async _loadScores() {
    console.log('No matching games')
    // TODO: load from local storage.
    this._fetchScores();
  },

  // Writes the scores to the local storage.
  async _writeScores() {
  },

  // Fetches the scores from the API.
  async _fetchScores() {
    // TODO: fetch from API instead.
    this._fetchMockScores();
    //this._fetchApiScores();
    this._writeScores();
    this._updateVisibleScores();
  },

  _fetchApiScores() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this._allData = responseData.tournaments;
      })
      .done();
  },

  _fetchMockScores() {
    console.log('fetching mock data')
    this._allData = [
          {
            "url": "https://play.usaultimate.org/events/Round-Stone-2016",
            "name": "Round Stone 2016",
            "id_str": "Round-Stone-2016",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            // TODO: for each (division, age_bracket) pair include a sub-tournament object
            // that has a list of games. Then we just use one API call to fetch everything.
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
            "age_brackets": ["NO_RESTRICTION"],
            "league": "AUDL",
            "dates": "April 9th-10th",
          },
          {
            "url": "https://play.usaultimate.org/events/CUC-Ridgefield-High-School-Club-Practices",
            "name": "CUC Ridgefield High School Club Practices",
            "id_str": "CUC-Ridgefield-High-School-Club-Practices",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["MIXED", "OPEN"],
            "age_brackets": ["NO_RESTRICTION"],
            "league": "MLU",
            "dates": "April 9th",
          },
        ];
  },

  _updateVisibleScores() {
    // Go through all scores, omitting tournaments and games that don't match.
    var filteredData = [];
    if (this._division == "ALL") {
      filteredData = this._allData;
    } else {
      for (var i = 0; i < this._allData.length; i++) {
        var row = this._allData[i];
        for (var j = 0; j < row["divisions"].length; j++) {
          if (row["divisions"][j] == this._division) {
            // TODO: this is probably n^2; probably a better way. Here and other
            // loops below.
            filteredData = filteredData.concat([row]);
          }
        }
      }
    }
    var ageBracketFiltered = [];
    for (var i = 0; i < filteredData.length; i++) {
      var row = filteredData[i];
      for (var j = 0; j < row["age_brackets"].length; j++) {
        if (row["age_brackets"][j] == this._ageBracket) {
          ageBracketFiltered = ageBracketFiltered.concat([row]);
        }
      }
    }
    var leagueFiltered = [];
    for (var i = 0; i < ageBracketFiltered.length; i++) {
      var row = ageBracketFiltered[i];
      if (row["league"] == this._league) {
        leagueFiltered = leagueFiltered.concat([row]);
      }
    }
    this._visibleScores = leagueFiltered
    this.emit();
  },

  emit() {
    this.trigger(this._visibleScores);
  },

  selectLeague(league) {
    l = league.toUpperCase();
    if (l === "CLUB") {
      this._league = "USAU";
      this._ageBracket = "CLUB";
    }
    if (l === "COLLEGE") {
      this._league = "USAU";
      this._ageBracket = "COLLEGE";
    }
    if (l === "AUDL") {
      this._league = "AUDL";
      this._ageBracket = "NO_RESTRICTION";
    }
    if (l === "MLU") {
      this._league = "MLU";
      this._ageBracket = "NO_RESTRICTION";
    }
    this._updateVisibleScores();
  },

  selectDivision(division) {
    this._division = division.toUpperCase();
    this._updateVisibleScores();
  },
});
