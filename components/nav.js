'use strict';

import Reflux from 'reflux';

import React, {
  Component,
  Image,
  Navigator,
  Text,
} from 'react-native';

import TournamentComponent from './tournaments';
import GamesComponent from './game';
import league from './../stores/league';
import scores from './../stores/scores';

import {GoHome, GoBack, RenderScene} from './../components/actions';

var NavComponent = React.createClass({
  displayName: 'NavComponent',

  mixins: [
      Reflux.connect(league, 'league'),
      Reflux.connect(scores, 'tournaments')
  ],

  componentDidMount() {
    scores.emit();
    league.emit();
  },

  popToTop() {
    GoHome();
    this.refs.navigator.popToTop();
  },

  pop() {
    GoBack();
    this.refs.navigator.pop();
  },
  
  numRoutes() {
    if (this.refs.navigator == null) {
      return 0
    }
    if (this.refs.navigator.getCurrentRoutes() == null) {
      return 0
    };
    return this.refs.navigator.getCurrentRoutes().length;
  },

  render() {
    return (
        <Navigator ref='navigator' initialRoute={{
          name: 'Tournaments',
        }}
        renderScene={(route, navigator) => {
          RenderScene(this.numRoutes());
          if (route.name == 'Tournaments') {
            if (this.state.league == "AUDL" || this.state.league == "MLU") {
              return (<GamesComponent name={route.name}
                tournament={this.state.tournaments[0]}
              />);
            }
            return (<TournamentComponent name={route.name} navigator={navigator} />);
          } else {
            return (
            <GamesComponent name={route.name}
              tournament={route.passProps.tournament}
            />);
          }
        }}
      />
    );
  },
});

module.exports = NavComponent;
