# Add methods to the Storage prototype to get and set key-value pairs in localStorage
Storage::setObj = (key,obj) ->
  @setItem key, JSON.stringify(obj)
Storage::getObj = (key) ->
  JSON.parse @getItem(key)

class App
  constructor: ->
    # cache the DOM element rather than looking it up for every event
    @cacheElements()
    # event handling
    @bindEvents()
    # display all existing todo items
    @displayItems()

  cacheElements: ->
    @$input = $('#new-todo')
    @$todoList = $('#todo-list')
    @$clearCompleted = $('#clear-completed')

  bindEvents: ->
    # select the new-todo input and handle it's keyup event
    @$input.on('keyup', (e) => @create(e))
    # event handler for the remove task button
    @$todoList.on('click', '.destroy', (e) => @destroy(e.target))
    # event handler for the complete task checkbook
    @$todoList.on('change', '.toggle', (e) => @toggle(e.target))
    # event handler for the 'clear completed' button
    @$clearCompleted.click => @clearCompleted()

  create: (e) ->
    # get the value of the input using the val() function
    val = $.trim @$input.val()
    # check if the Enter key has been pressed and #new-todo has a value
    return unless e.which == 13 and val
    # generate a random id for localStorage key
    randomId = (Math.round Math.random()*999999)
    # put val into localStorage with id as key
    localStorage.setObj randomId,{
      id: randomId
      title: val
      completed: false
    }
    # clear the contents of the input
    @$input.val ''
    # update the list of todo items
    @displayItems()

  displayItems: ->
    # empty the todo list of any existing todo items before re-populating
    @clearItems()
    # add each existing todo item in localStorage
    @addItem(localStorage.getObj(id)) for id in Object.keys(localStorage)

  clearItems: ->
    @$todoList.empty()

  addItem: (item) ->
    html = """<li data-id="#{item.id}">
                <input class="toggle" type="checkbox" #{if item.completed then 'checked' else ''}>
                #{item.title}
                <button class="destroy">Delete</button>
              </li>
           """
    @$todoList.append(html)

  destroy: (elem) ->
    # get the todo item id from the data-id of the closest <li> element
    id = $(elem).closest('li').data('id')
    # remove the item from localStorage
    localStorage.removeItem(id)
    # display the items again
    @displayItems()

  toggle: (elem) ->
    # get the todo item id from the data-id of the closest <li> element
    id = $(elem).closest('li').data('id')
    # fetch the item from localStorage
    item = localStorage.getObj(id)
    # toggle the 'completed' property
    item.completed = !item.completed
    # save the todo item
    localStorage.setObj(id, item)

  clearCompleted: () ->
    for id in Object.keys(localStorage)
      item = localStorage.getObj(id)
      localStorage.removeItem(id) if item.completed
      @displayItems()

$ ->
  app = new App