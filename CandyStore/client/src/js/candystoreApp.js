(function() {
  "use strict;"

  var csScope = {};

function createApp() {

    var initiatedTransition = false;

    var App = Ember.Application.create({
        LOG_TRANSITIONS: false,
        LOG_TRANSITIONS_INTERNAL: false,
        rootElement : "#candy-application-root"
    });

    App.Router.reopen({
        location: 'none'
    });


    App.ApplicationAdapter = DS.RESTAdapter.extend({
        host: 'http://candy.dev:8075',
        namespace: 'api',
        headers: Ember.computed(function() {
          return {
            "Authorization": 'Bearer '+window.localStorage.getItem('token')
          };
        }).volatile(),
        ajax: function(url, method, hash) {
            var theHash = hash || {};
            theHash.crossDomain = true;
            theHash.xhrFields = {withCredentials: true};
            return this._super(url, method, theHash);
        }
    });

    var candyListRaw = '\
{{#each candy in candyList}}\
{{#unless candy.isDirty}}\
<div class="row">\
    <div class="col-xs-2">{{candy.name}}</div>\
    <div class="col-xs-2">{{candy.size}}</div>\
    <div class="col-xs-2">{{#link-to "candy" candy}}Details{{/link-to}}</div>\
    <div class="col-xs-2"><button {{action "delete" candy }}>Delete</button></div>\
</div>\
{{/unless}}\
{{/each}}\
\
<div class="row">\
    <div class="col-xs-4">{{#link-to "create"}}Create Candy{{/link-to}}</div>\
</div>\
';


    var candyRaw = '\
<div>{{name}}</div>\
<div>{{size}}</div>\
{{#link-to "candyList"}}List{{/link-to}}\
';

    var createRaw = '\
{{input type="text" id="name" value=name placeholder="Enter the name" }}<p/>\
{{input type="text" id="size" value=size placeholder="Enter the size" }}<p/>\
<button {{action "submit" this }} >Submit</button>\
';

    Ember.TEMPLATES["application"] = Ember.Handlebars.compile('<div class="container"><h2>US - Ember Candy Store</h2>{{outlet}}</div>');
    Ember.TEMPLATES["candyList"] = Ember.Handlebars.compile(candyListRaw);
    Ember.TEMPLATES["candy"] = Ember.Handlebars.compile(candyRaw);
    Ember.TEMPLATES["create"] = Ember.Handlebars.compile(createRaw);

    App.Candy = DS.Model.extend({
        name: DS.attr('string'),
        size: DS.attr('string')
    });

    App.Router.map(function() {
        this.resource('candyList');
        this.resource('create', { path: 'candy/create' });
        this.resource('candy', { path: 'candy/:candy_id'	});
    });

    App.ApplicationController = Ember.Controller.extend({
        init: function() {
          function transitionToNewRoute(newUrl)
          {
            if (initiatedTransition) { return; }

            if (newUrl.indexOf('candy') == -1) {
              return;
            }

            var currentUri = new URI(window.location);
            currentUri = new URI(currentUri.fragment());
            var newRoute = currentUri.query(true)['emberRoute'];
            this.transitionTo(newRoute);
          }

          function setInitialRouteFromUrl(newUrl)
          {
            var initialUri = new URI(newUrl);
            initialUri = new URI(initialUri.fragment());
            var initialRoute = initialUri.query(true)['emberRoute'];
            this.transitionTo(initialRoute);
          }

          csScope.transitionToNewRoute = transitionToNewRoute.bind(this);
          csScope.setInitialRouteFromUrl = setInitialRouteFromUrl.bind(this);
        },
        updateRouteInUrl: function() {
          var base = this.target.router.currentHandlerInfos[1].name;
          var routeParams = this.target.router.currentHandlerInfos[1].params;
          var newRoute = base;

          if (routeParams != null && Object.keys(routeParams) != null && Object.keys(routeParams).length > 0) {
            newRoute = '/'+base+'/'+routeParams[Object.keys(routeParams)[0]];
          }


          var currentUri = new URI(window.location);
          currentUri.removeQuery('emberRoute').addQuery('emberRoute', newRoute);

          var hash = currentUri.hash();
          if (hash.indexOf('?') !== -1) {
            hash = hash.substr(0, hash.indexOf('?'));
          }

          initiatedTransition = true;
          window.location = currentUri.protocol()+'://'+currentUri.host()+'/'+hash+'?'+currentUri.query();
          setTimeout(function() { initiatedTransition = false; }, 100);

        }.observes('currentPath')

    });

    App.IndexRoute = Ember.Route.extend({
        beforeModel: function() {
            this.transitionTo('candyList');
        }
    });

    App.CandyListRoute = Ember.Route.extend({
        model: function() {
            return {
                candyList: this.store.find('candy')
            };
        },
        actions: {
            delete: function(candy) {
                candy.destroyRecord();
            }
        }
    });

    App.CreateRoute = Ember.Route.extend({
        model: function() {
            return this.store.createRecord('candy');
        }
    });

    App.CreateController = Ember.ObjectController.extend({
        error: "",
        actions: {
            submit: function(candy) {
                candy.save();
                this.transitionToRoute('candyList');
            }
        }
    });

    return App;
}


// add and remove the ember app from the dom
$(document).ready(function() {

  function checkForEntryToCandyStore(oldUrl, newUrl) {
      if ( (oldUrl.indexOf('candy') == -1) && newUrl.indexOf('candy') >= 0) {
          // entering
          var App = createApp();
          checkForEntryToCandyStore.lastApp = App;

          setTimeout(function() {
            csScope.setInitialRouteFromUrl(newUrl);
          }, 1);

      } else if (oldUrl.indexOf('candy') >= 0 && newUrl.indexOf('candy') == -1) {
          // leaving
          checkForEntryToCandyStore.lastApp.destroy();
      } else if (oldUrl.indexOf('candy') >= 0 && newUrl.indexOf('candy') >= 0) {
          // still here
          csScope.transitionToNewRoute(newUrl);
      }
  }

  $(window).bind('hashchange', function(evt) {
    var oldUrl = evt.originalEvent.oldURL;
    var newUrl = evt.originalEvent.newURL;
    checkForEntryToCandyStore(oldUrl, newUrl);
  });

  var startUrl = window.location.origin+'/'+ window.location.hash;
  checkForEntryToCandyStore('', startUrl);

});

})();


