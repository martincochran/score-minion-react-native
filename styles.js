const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    height: 80,
  },
  container: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  tournamentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 12,
    textAlign: 'left',
  },
  gameStatus: {
    fontSize: 10,
    textAlign: 'right',
  },
  year: {
    textAlign: 'center',
  },
  score: {
    fontSize: 30,
    textAlign: 'center',
  },
  teams: {
    fontSize: 10,
    textAlign: 'center',
  },
  thumbnail: {
    width: 51,
    height: 25,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = styles
