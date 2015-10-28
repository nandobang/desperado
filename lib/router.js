$D.Router = function () {
  var self = this;
  var routes = [];
  var remoteRoutes = [];
  var remoteBase = '';

  var setup = function () {
    $(window).on('load hashchange', function (evt) {
      evt.preventDefault();

      var url = location.hash.replace(/^#/, '/');
      var params = url.split('?')[1];
      
      url = url.split('?')[0] || '/';
      params = $D.Utils.queryToObject(params);

      self.navigate(url, params);
    });
  };

  /*
   * params (Object)
   *   .url (String|Regex): the path used for this route.
   *   .controller (String): the controller that will be instantiated.
   *   .action (String): the action that should be performed on the controller.
   */
  this.route = function (params) {
    var route = {};

    route.url = new RegExp('^' + params.url + '$');
    route.controller = params.controller;
    route.action = params.action;

    routes.push(route);
  };

  this.routes = function (routeArray) {
    for (var i = 0; i < routeArray.length; i++) {
      this.route(routeArray[i]);
    }
  };

  this.setRemote = function (baseUrl) {
    remoteBase = (baseUrl.startsWith('http') ? baseUrl : 'http://' + baseUrl).replace(/(.+)\/$/, '$1');
  };

  this.remoteRoute = function (params) {
    var route = {};

    route.url = new RegExp('^' + params.url + '$');
    route.controller = params.controller;
    route.action = params.action;

    remoteRoutes.push(route);
  };

  this.remoteRoutes = function (routeArray) {
    for (var i = 0; i < routeArray.length; i++) {
      this.remoteRoute(routeArray[i]);
    }
  };

  this.getFromRemote = function (url, params) {
  };

  this.postToRemote = function (url, params) {
  };

  this.navigate = function (url, params) {
    console.group('$D.Router.navigate()');
    console.log('start');
    console.log('url', url);
    console.log('params', params);

    var matchingRoute = $.grep(routes, function (e, i) { return url.match(e.url); })[0];

    console.log('matchingRoute', matchingRoute);

    var viewName = matchingRoute.controller + '/' + matchingRoute.action;
    var viewTemplate = Handlebars.compile($('script[data-view="' + viewName + '"]').html());
    var controller = new window[matchingRoute.controller + 'Controller']();
    var renderedView = viewTemplate(new controller[matchingRoute.action](params));

    $('body').empty()
             .html(renderedView);

    console.log('end');
    console.groupEnd();
  };

  setup();
};
