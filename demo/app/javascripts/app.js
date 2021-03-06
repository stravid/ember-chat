var messagesEndpoint = 'http://localhost:3000/messages';
var pushUpdatesEndpoint = 'ws://localhost:3001';

App = Ember.Application.create();

App.Router.map(function() {
  this.route('chat');
  this.route('user');
});

App.UserRoute = Ember.Route.extend({
  actions: {
    joinChat: function() {
      if (!Ember.isEmpty(this.controllerFor('user').get('nickname'))) {
        this.transitionTo('chat');
      }
    }
  }
});

App.ChatRoute = Ember.Route.extend({
  // activate: function() {
  //   var ws = new WebSocket(pushUpdatesEndpoint);

  //   ws.onmessage = function (message) {
  //     console.log('WebSocket message:', message);
  //   }.bind(this);
  // },

  beforeModel: function() {
    if (Ember.isEmpty(this.controllerFor('user').get('nickname'))) {
      this.transitionTo('user');
    }
  },

  model: function() {
    return Ember.$.getJSON(messagesEndpoint).then(function(response) {
      return response;
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('nickname', this.controllerFor('user').get('nickname'));
  }
});

App.UserController = Ember.Controller.extend({
  nickname: null
});

App.ChatController = Ember.Controller.extend({
  actions: {
    sendMessage: function() {
      if (Ember.isEmpty(this.get('newMessage'))) {
        return;
      }

      var message = {
        user: this.get('nickname'),
        message: this.get('newMessage')
      };

      this.get('model').pushObject(message);

      Ember.$.ajax({
        type: 'POST',
        url: messagesEndpoint,
        data: { message: message }
      });

      this.set('newMessage', '');
    }
  }
});
