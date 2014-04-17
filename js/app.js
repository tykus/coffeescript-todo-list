// Generated by CoffeeScript 1.6.3
(function() {
  var App;

  Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };

  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
  };

  App = (function() {
    function App() {
      this.bindEvents();
    }

    App.prototype.bindEvents = function() {
      return $('#new-todo').on('keyup', this.create);
    };

    App.prototype.create = function(e) {
      var $input, randomId, val;
      $input = $(this);
      val = $.trim($input.val());
      if (!(e.which === 13 && val)) {
        return;
      }
      randomId = Math.round(Math.random() * 999999);
      localStorage.setObj(randomId, {
        id: randomId,
        title: val,
        completed: false
      });
      return $input.val('');
    };

    return App;

  })();

  $(function() {
    var app;
    return app = new App;
  });

}).call(this);
