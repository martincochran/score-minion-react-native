import Reflux from 'reflux';

import {SelectLeague} from './../components/actions';

// This simple store just keeps track of the selected league so we know
// when to hide the div selection.
export default Reflux.createStore({
  init() {
    this._league = "Club";
    this.listenTo(SelectLeague, (league) => this.selectLeague(league));
  },

  getInitialState() {
    return {};
  },

  selectLeague(league) {
    this._league = league;
    this.emit();
  },

  emit() {
    this.trigger(this._league);
  },
});
