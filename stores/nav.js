import Reflux from 'reflux';

import {GoHome, GoBack, RenderScene} from './../components/actions';

// This simple store just keeps track of the navigation level so we know
// when to hide the back button.
export default Reflux.createStore({
  init() {
    this.renderScene(0);
    this.listenTo(GoHome, () => this.goHome());
    this.listenTo(GoBack, () => this.goBack());
    this.listenTo(RenderScene, (index) => this.renderScene(index));
  },

  getInitialState() {
    return {};
  },

  goHome() {
    this._index = 0;
    this.emit();
  },

  goBack() {
    this._index = this._index-1;
    this.emit();
  },

  renderScene(index) {
    this._index = index;
    this.emit();
  },

  emit() {
    this.trigger(this._index);
  },
});
