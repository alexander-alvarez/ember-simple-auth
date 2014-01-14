'use strict';

/**
  The mixin for the authentication controller that handles the
  `authenticationRoute` specified in
  [Ember.SimpleAuth#setup](#Ember.SimpleAuth#setup)). It provides the
  `authenticate` action that will authenticate the session with the configured
  authenticator when invoked.

  Accompanying the login controller the application needs to have a `login`
  template with the fields `indentification` and `password` as well as an
  actionable button or link that triggers the `login` action, e.g.:

  ```handlebars
  <form {{action login on='submit'}}>
    <label for="identification">Login</label>
    {{view Ember.TextField id='identification' valueBinding='identification' placeholder='Enter Login'}}
    <label for="password">Password</label>
    {{view Ember.TextField id='password' type='password' valueBinding='password' placeholder='Enter Password'}}
    <button type="submit">Login</button>
  </form>
  ```

  @class AuthenticationControllerMixin
  @namespace Ember.SimpleAuth
  @extends Ember.Mixin
*/
Ember.SimpleAuth.AuthenticationControllerMixin = Ember.Mixin.create({
  /**
    The authenticator class used to authenticate the session.

    @property authenticator
    @type Ember.SimpleAuth.Authenticators.Base
    @default null
  */
  authenticator: null,

  actions: {
    /**
      This action will authenticate the session with an instance of the
      configured `authenticator` class. It will pass the `identification` and
      `password` properties to the a

      @method actions.authenticate
      @private
    */
    authenticate: function(options) {
      var _this = this;
      this.get('session').authenticate(this.get('authenticator').create(), options).then(function() {
        _this.send('sessionAuthenticationSucceeded');
      }, function(error) {
        _this.send('sessionAuthenticationFailed', error);
      });
    }
  }
});
