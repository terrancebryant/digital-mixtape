import Ember from 'ember';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  store: services,
  session: services,

  actions: {
    createMixtape: function (title) {
      let user = this.get('userId')
      let token = this.get('session.data.authenticated.access_token')
      let store = this.get('store')
      
      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)

      return spotifyApi.createPlaylist(user, title, { 'public': true })
        .then( (playlist) => {
          let currentUser = store.peekRecord('user', user);
          let newMixtape = store.createRecord('mixtape', {
            id: playlist.body.id,
            title: playlist.body.name,
            user: this.get('userId')
          });
          return newMixtape.save().then(() => {
            return this.transitionToRoute('mixtape.add', this.get('userId'), playlist.body.id)
          })
        }).catch(function (err) {
      });
    }
  }
});
