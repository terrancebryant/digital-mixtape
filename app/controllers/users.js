import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),
  currentUser: service(),

  actions: {
    new: function () {
      this.transitionTo('mixtapes.new')
    }
  }

});
