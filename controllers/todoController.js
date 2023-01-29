//this will control the behavior of our todo list

var bodyParser = require('body-parser')
var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'program for 7 hours'}] //this array will corespond to the series of items
var urlencodedParser = bodyParser.urlencoded({extended: false}) //our middleware

module.exports = function(app){
    //the get request for the url itself
    app.get('/todo', function(request, response){
        response.render('todo', {todos: data}) //we pass our data to todo
    })

    //for when the person adds a new item to the list
    app.post('/todo', urlencodedParser, function(request, response){
        data.push(request.body)
        response.json(data) //sends data back as json
    })

    //lets the user delete items off the list
    app.delete('/todo/:item', function(request, response){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== request.params.item //replace any spaces with -
            //if the item doesn't equal this it will return true for each item
        }) //filters out the item we want to delete
        response.json(data)
    })
}
