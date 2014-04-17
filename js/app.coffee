# Add methods to the Storage prototype to get and set key-value pairs in localStorage
Storage::setObj = (key,obj) ->
  @setItem key, JSON.stringify(obj)
Storage::getObj = (key) ->
  JSON.parse @getItem(key)

class App
  constructor: ->
    # cache the DOM element rather than looking it up every time the  
    @cacheElements()
    # evnet handling
    @bindEvents()

  cacheElements: ->
    @$input = $('#new-todo')

  bindEvents: ->
    # select the new-todo input and handle it's keyup event
    @$input.on('keyup', (e) => @create(e))

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
    console.log "Displaying items"

$ ->
  app = new App