import React, {
  Component,
  Image,
  Navigator,
  Text,
} from 'react-native';

const GamesComponent = require('./game')
const TournamentComponent = require('./tournaments')

class NavComponent extends Component {

  popToTop() {
    this.refs.navigator.popToTop();
  }

  pop() {
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
          var numRoutes = this.numRoutes();
          var enabled = (numRoutes >= 2);
          //this.props.onNavigate(enabled);
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
