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
  beforeModel: function() {
    if (Ember.isEmpty(this.controllerFor('user').get('nickname'))) {
      this.transitionTo('user');
    }
  },

  model: function() {
    return {
      nickname: this.controllerFor('user').get('nickname'),
      messages: [
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'David', message: 'Hallo von Salzburg!' },
        // { user: 'Hannah', message: 'Hallo von Salzburg!' },
        // { user: 'Johann', message: 'Hallo von Salzburg!' },
        // { user: 'KB', message: 'Hallo von Salzburg!' }
      ]
    };
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

      this.get('model.messages').pushObject({
        user: this.get('model.nickname'),
        message: this.get('newMessage')
      });

      this.set('newMessage', '');
    }
  }
});
