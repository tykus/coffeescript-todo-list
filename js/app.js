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
      this.cacheElements();
      this.bindEvents();
      this.displayItems();
    }

    App.prototype.cacheElements = function() {
      this.$input = $('#new-todo');
      return this.$todoList = $('#todo-list');
    };

    App.prototype.bindEvents = function() {
      var _this = this;
      return this.$input.on('keyup', function(e) {
        return _this.create(e);
      });
    };

    App.prototype.create = function(e) {
      var randomId, val;
      val = $.trim(this.$input.val());
      if (!(e.which === 13 && val)) {
        return;
      }
      randomId = Math.round(Math.random() * 999999);
      localStorage.setObj(randomId, {
        id: randomId,
        title: val,
        completed: false
      });
      this.$input.val('');
      return this.displayItems();
    };

    App.prototype.displayItems = function() {
      var id, _i, _len, _ref, _results;
      this.clearItems();
      _ref = Object.keys(localStorage);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        _results.push(this.addItem(localStorage.getObj(id)));
      }
      return _results;
    };

    App.prototype.clearItems = function() {
      return this.$todoList.empty();
    };

    App.prototype.addItem = function(item) {
      var html;
      html = "<li data-id=\"" + item.id + "\">" + item.title + "</li>";
      return this.$todoList.append(html);
    };

    return App;

  })();

  $(function() {
    var app;
    return app = new App;
  });

}).call(this);
