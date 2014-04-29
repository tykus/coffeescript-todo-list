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
      this.$input.on('keyup', function(e) {
        return _this.create(e);
      });
      this.$todoList.on('click', '.destroy', function(e) {
        return _this.destroy(e.target);
      });
      return this.$todoList.on('change', '.toggle', function(e) {
        return _this.toggle(e.target);
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
      html = "<li data-id=\"" + item.id + "\">\n  <input class=\"toggle\" type=\"checkbox\" " + (item.completed ? 'checked' : '') + ">\n  " + item.title + "\n  <button class=\"destroy\">Delete</button>\n</li>";
      return this.$todoList.append(html);
    };

    App.prototype.destroy = function(elem) {
      var id;
      id = $(elem).closest('li').data('id');
      localStorage.removeItem(id);
      return this.displayItems();
    };

    App.prototype.toggle = function(elem) {
      var id, item;
      id = $(elem).closest('li').data('id');
      item = localStorage.getObj(id);
      item.completed = !item.completed;
      return localStorage.setObj(id, item);
    };

    return App;

  })();

  $(function() {
    var app;
    return app = new App;
  });

}).call(this);
