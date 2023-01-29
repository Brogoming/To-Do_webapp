//this will control the behavior of our todo list
module.exports = function(app){
    //the get request for the url itself
    app.get('/todo', function(request, response){
        response.render('todo')
    })

    //for when the person adds a new item to the list
    app.post('/todo', function(request, response){

    })

    //lets the user delete items off the list
    app.delete('/todo', function(request, response){
        
    })
}
