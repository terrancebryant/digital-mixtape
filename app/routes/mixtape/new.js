import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function (params) {
    this.set('userId', params.user_id)
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('userId', this.get('userId'))
  }
});
