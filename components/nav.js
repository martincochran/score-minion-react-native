import React, {
  Component,
  Image,
  Navigator,
  Text,
} from 'react-native';

import TournamentComponent from './tournaments';
import GamesComponent from './game';

import {GoHome, GoBack, RenderScene} from './../components/actions';

class NavComponent extends Component {

  popToTop() {
    GoHome();
    this.refs.navigator.popToTop();
  }

  pop() {
    GoBack();
    this.refs.navigator.pop();
  }
  
  numRoutes() {
    if (this.refs.navigator == null) {
      return 0
    }
    if (this.refs.navigator.getCurrentRoutes() == null) {
      return 0
    };
    return this.refs.navigator.getCurrentRoutes().length;
  }


  render() {
    return (
        <Navigator ref='navigator' initialRoute={{
          name: 'Tournaments',
        }}
        renderScene={(route, navigator) => {
          RenderScene(this.numRoutes());
          if (route.name == 'Tournaments') {
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
  }
}

module.exports = NavComponent;
