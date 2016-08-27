import Reflux from 'reflux';
import {SelectLeague, SelectDivision} from './../components/actions';

import React from 'react-native';
var {AsyncStorage} = React;

var API_URL = 'https://omega-bearing-780.appspot.com/_ah/api/scores/v1/tournaments';
var NUM_TOURNEYS = 10;
var PARAMS = '?count=' + NUM_TOURNEYS;
var REQUEST_URL = API_URL + PARAMS;

const SCORES_KEY = 'score-minion:scores';

export default Reflux.createStore({
  init() {
    this._division = "WOMENS";
    this._ageBracket = "NO_RESTRICTION";
    this._league = "USAU";
    this._loadScores().done();
    this.listenTo(SelectLeague, (league) => this.selectLeague(league));
    this.listenTo(SelectDivision, (div) => this.selectDivision(div));
  },

  // Loads the scores from the local storage then queues up a refresh from the
  // API.
  async _loadScores() {
    this._allData = [];
    try {
      var val = await AsyncStorage.getItem(SCORES_KEY);
      if (val !== null) {
        this._allData = JSON.parse(val);
        this.emit();
      }
      else {
        console.info(`${SCORES_KEY} not found on disk.`);
        this._allData = [];
      }
    }
    catch (error) {
      console.error('AsyncStorage error: ', error.message);
      this._allData = [];
    }

    this.fetchScores().done();
  },

  // Writes the scores to the local storage.
  async _writeScores() {
    try {
      await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(this._allData));
    }
    catch (error) {
      console.error('AsyncStorage error: ', error.message);
    }
  },

  // Fetches the scores from the API.
  async fetchScores() {
    //this._fetchMockScores();
    this._fetchApiScores();
    this._writeScores();
    this._updateVisibleScores();
  },

  _fetchApiScores() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this._allData = responseData.tournaments;
        this._writeScores();
        this._updateVisibleScores();
      })
      .done();
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
    // Now go through each tournament and filter the games that don't match.
    for (var i = 0; i < leagueFiltered.length; i++) {
      var games = leagueFiltered[i].games;
      filteredGames = [];
      for (var j = 0; j < games.length; j++) {
        var g = games[j];
        if (this._division != "ALL" && g.division != this._division) {
          continue
        }
        if (g.age_bracket === this._ageBracket) {
          filteredGames = filteredGames.concat([g]);
        }
      }
      leagueFiltered[i].filteredGames = filteredGames;
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
      this._ageBracket = "NO_RESTRICTION";
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
    if (this._division === "WOMEN") {
      this._division = "WOMENS";
    }
    if (this._division === "MEN") {
      this._division = "OPEN";
    }
    this._updateVisibleScores();
  },

  _fetchMockScores() {
    console.log('fetching mock data')
    this._allData = [
          {
            "url": "https://play.usaultimate.org/events/Round-Stone-2016",
            "name": "Round Stone 2016",
            "id_str": "Round-Stone-2016",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN", "WOMENS"],
            "age_brackets": ["COLLEGE", "NO_RESTRICTION"],
            "league": "USAU",
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [{
                name: 'game 1',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'open college team A'} },
                  { score_reporter_account: {name: 'open college team B'} },
                ],
                scores: [12, 2],
                division: "OPEN",
                age_bracket: "COLLEGE",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 2',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'womens college team A'} },
                  { score_reporter_account: {name: 'womens college team B'} },
                ],
                scores: [3, 14],
                division: "WOMENS",
                age_bracket: "COLLEGE",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 3',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'womens club team A'} },
                  { score_reporter_account: {name: 'womens club team B'} },
                ],
                scores: [15, 6],
                division: "WOMENS",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 4',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'open club team A'} },
                  { score_reporter_account: {name: 'open club team B'} },
                ],
                scores: [7, 8],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "FINAL",
              },
              {
                name: 'game 5',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'womens club team C'} },
                  { score_reporter_account: {name: 'womens club team D'} },
                ],
                scores: [15, 16],
                division: "WOMENS",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 6',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'open club team X'} },
                  { score_reporter_account: {name: 'open club team Y'} },
                ],
                scores: [7, 10],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "FINAL",
              },

            ],
          },
          {
            "url": "https://play.usaultimate.org/events/TCT-Pro-Elite-Challenge-2016-Colorado-Cup",
            "name": "TCT Pro Elite Challenge 2016 Colorado Cup super long name that wraps",
            "id_str": "TCT-Pro-Elite-Challenge-2016-Colorado-Cup",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["MIXED", "WOMENS"],
            "age_brackets": ["NO_RESTRICTION", "COLLEGE"],
            "league": "USAU",
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [{
                name: 'game 1',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'mixed college team A'} },
                  { score_reporter_account: {name: 'mixed college team B'} },
                ],
                scores: [1, 2],
                division: "MIXED",
                age_bracket: "COLLEGE",
                game_status: "FINAL",
              },
              {
                name: 'game 2',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'womens college team X'} },
                  { score_reporter_account: {name: 'womens college team Y'} },
                ],
                scores: [3, 4],
                division: "WOMENS",
                age_bracket: "COLLEGE",
                game_status: "FINAL",
              },
              {
                name: 'game 3',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'womens club team W'} },
                  { score_reporter_account: {name: 'womens club team V'} },
                ],
                scores: [5, 6],
                division: "WOMENS",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 4',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'The Chad Larson Experience'} },
                  { score_reporter_account: {name: 'mixed club team B'} },
                ],
                scores: [7, 8],
                division: "MIXED",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
            ],
          },
          {
            "url": "https://play.usaultimate.org/events/CUC-Ridgefield-High-School-Club-Practices",
            "name": "MLU Games weekend of Jun 14th & 15th",
            "id_str": "CUC-Ridgefield-High-School-Club-Practices",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN"],
            "age_brackets": ["NO_RESTRICTION"],
            "league": "MLU",
            // TODO: parse the format ("today and yesterday", "today")
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [{
                name: 'game 1',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'mlu team A'} },
                  { score_reporter_account: {name: 'mlu team B'} },
                ],
                scores: [1, 2],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 4',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'mlu team C'} },
                  { score_reporter_account: {name: 'mlu team D'} },
                ],
                scores: ["7", "8"],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
            ],
          },
          {
            "url": "https://play.usaultimate.org/events/TCT-Pro-Elite-Challenge-2016-Colorado-Cup",
            "name": "AUDL games - week of blah",
            "id_str": "AUDL",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN"],
            "age_brackets": ["NO_RESTRICTION"],
            "league": "AUDL",
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [{
                name: 'game 1',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'audl team A'} },
                  { score_reporter_account: {name: 'audl team C'} },
                ],
                scores: [1, 2],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 2',
                last_update_source: {update_time_utc_str: 'yesterday'},
                teams: [
                  { score_reporter_account: {name: 'audl team C'} },
                  { score_reporter_account: {name: 'audl team D'} },
                ],
                scores: [3, 4],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "FINAL",
              },
            ],
          },
          {
            "url": "https://play.usaultimate.org/events/Round-Sharp-2020",
            "name": "Sharp Stone 2020",
            "id_str": "Sharp-Stone-2020",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN", "WOMENS"],
            "age_brackets": ["COLLEGE", "NO_RESTRICTION"],
            "league": "USAU",
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [{
                name: 'game 1',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'open college team A'} },
                  { score_reporter_account: {name: 'open college team B'} },
                ],
                scores: [12, 2],
                division: "OPEN",
                age_bracket: "COLLEGE",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 2',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'womens club team A'} },
                  { score_reporter_account: {name: 'womens club team B'} },
                ],
                scores: [5, 7],
                division: "WOMENS",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 3',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'open club team A'} },
                  { score_reporter_account: {name: 'open club team B'} },
                ],
                scores: [4, 8],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 4',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'womens college team A'} },
                  { score_reporter_account: {name: 'womens college team B'} },
                ],
                scores: [0, 1],
                division: "WOMENS",
                age_bracket: "COLLEGE",
                game_status: "UNKNOWN",
              },
            ],
          },
          {
            "url": "https://play.usaultimate.org/events/Round-Stone-2023",
            "name": "Square Stone 2023",
            "id_str": "Square-Stone-2023",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN", "WOMENS"],
            "age_brackets": ["COLLEGE"],
            "league": "USAU",
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [{
                name: 'game 1',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'open college team A'} },
                  { score_reporter_account: {name: 'open college team B'} },
                ],
                scores: [12, 2],
                division: "OPEN",
                age_bracket: "COLLEGE",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 4',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'womens college team A'} },
                  { score_reporter_account: {name: 'womens college team B'} },
                ],
                scores: [0, 1],
                division: "WOMENS",
                age_bracket: "COLLEGE",
                game_status: "UNKNOWN",
              },
            ],
          },
          {
            "url": "https://play.usaultimate.org/events/Round-Stone-2057",
            "name": "Odd-Shaped Stone 2057",
            "id_str": "Odd-Shaped-Stone-2057",
            "image_url_https": "file:///Users/martincochran/Pictures/thumb_IMG_1069_1024.jpg",
            "divisions": ["OPEN", "WOMENS"],
            "age_brackets": ["NO_RESTRICTION"],
            "league": "USAU",
            "start_date": "Sun Jun 14 00:00:00 2015",
            "end_date": "Mon Jun 15 00:00:00 2015",
            "games": [
              {
                name: 'game 2',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'womens club team A'} },
                  { score_reporter_account: {name: 'womens club team B'} },
                ],
                scores: [5, 7],
                division: "WOMENS",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
              {
                name: 'game 3',
                last_update_source: {update_time_utc_str: 'today'},
                teams: [
                  { score_reporter_account: {name: 'open club team A'} },
                  { score_reporter_account: {name: 'open club team B'} },
                ],
                scores: [4, 8],
                division: "OPEN",
                age_bracket: "NO_RESTRICTION",
                game_status: "UNKNOWN",
              },
            ],
          },
        ];
  },


});
