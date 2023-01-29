//this will control the behavior of our todo list

var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// connect to the database
mongoose.connect('mongodb+srv://Test:Test@todo.pskycsu.mongodb.net/todo')

//create a schema - this is like a blue print
var todoSchema = new mongoose.Schema({
    item: String
})

//create a todo model
var Todo = mongoose.model('Todo', todoSchema) //model and schema

// var itemOne = Todo({ item: 'buy flowers' }).save(function(err){
//     if(err) throw err
//     console.log('item saved')
// })
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'program for 7 hours'}] //this array will corespond to the series of items

//our middleware
var urlencodedParser = bodyParser.urlencoded({extended: false}) 

module.exports = function(app){
    //the get request for the url itself
    app.get('/todo', function(request, response){
        //get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err
            response.render('todo', {todos: data}) //we pass our data to todo
        }) 
        //goes out to a collection and find either all the items in the collection or specific items in the collection
        //for all items just pass in {}
        
    })

    //for when the person adds a new item to the list
    app.post('/todo', urlencodedParser, function(request, response){
        //get data from the view and add it to mongodb
        var newTodo = Todo(request.body).save(function(err, data){
            if (err) throw err
            response.json(data)
        }) //adds an item to the todo collection
        // data.push(request.body)
        // response.json(data) //sends data back as json
    })

    //lets the user delete items off the list
    app.delete('/todo/:item', function(request, response){
        //delete the requested item from mongodb
        Todo.find({item: request.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err
            response.json(data)
        }) //replaces - with spaces
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== request.params.item //replace any spaces with -
        //     //if the item doesn't equal this it will return true for each item
        // }) //filters out the item we want to delete
        // response.json(data)
    })
}
