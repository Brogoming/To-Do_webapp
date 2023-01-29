$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()}; //we grab what ever value is typed and store it in the item property
  
        $.ajax({ //this allows us to delete or add an item to the list
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){ //data is sent back to this function
            //do something with the data via front-end framework
            location.reload(); //reload the page
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){ //delete request
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
  
  });