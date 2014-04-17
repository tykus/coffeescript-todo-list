# Add methods to the Storage prototype to get and set key-value pairs in localStorage
Storage::setObj = (key,obj) ->
  @setItem key, JSON.stringify(obj)
Storage::getObj = (key) ->
  JSON.parse @getItem(key)

class App
  constructor: ->
    @bindEvents()

  bindEvents: ->
    # select the new-todo input and handle it's keyup event
    $('#new-todo').on('keyup', @create)

  create: (e) ->
    # $(this) will return the element which generated the event and assign it to $input
    $input = $(this)
    # get the value of the input using the val() function
    val = $.trim $input.val()
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
    # clear the contents of the inpsut
    $input.val ''

$ ->
  app = new App