import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load: function () {
    return new Promise((resolve, reject) => {
      //@TODO user_id needs to properly be set somehow
      let userId = this.get('session.data.authenticated.user_id');
      // authenticated contains access token, authentication id, etc.
      console.log(userId)
      if (!isEmpty(userId)) {
        return this.get('store').query('user', { equalTo: userId }).then((user) => {
          // console.log(user)
          this.set('currentUser', user);
        }, reject);
      } else {
        resolve();
      }
    });
  }
});