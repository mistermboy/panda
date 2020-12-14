window.onload = function(){
    let searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener("click",function(){
        search();
    })
}

async function search(){
    $('#searchResults').empty();
    let criteria = document.getElementById("searchedText").value.toLowerCase();
      document.getElementById("home").style.display = "none";
      document.getElementById("searchResults").style.display = "grid";


    let results = 0;
 
    $.get( "index.html", function( data ) {
       let content = data;
       let result = content.toLowerCase().search(criteria)
        if(result!=-1){
            $('#searchResults').append($("<a href='index.html'>Home</a>"))
            results++;
        }
    }); 

    $.get( "routes/hobbies.html", function( data ) {
        let content = data;
        let result = content.toLowerCase().search(criteria)
        if(result!=-1){
            $('#searchResults').append($("<a href='routes/hobbies.html'>Hobbies</a>"))
            results++;
        }
      });

    $.get( "routes/skills.html", function( data ) {
        let content = data;
       let result = content.toLowerCase().search(criteria)
       if(result!=-1){
            $('#searchResults').append($("<a href='routes/skills.html'>Skills</a>"))
            results++;
       }
      });

    await $.get( "routes/projects.html", function( data ) {
        let content = data;
        let result = content.toLowerCase().search(criteria)
        if(result!=-1){
            $('#searchResults').append($("<a href='routes/projects.html'>Projects</a>"))
            results++;
        }
      });


  
    if(results<=0){
        $('#searchResults').append("<div><h2>Sorry...</h2><p>("+results+") results found for \""+criteria+"\"</p></div>")
    }else{
    
        $('#searchResults').prepend("<div><h2>Take a look at one of these pages:</h2><p>("+results+") results found for \""+criteria+"\"</p></div>")
        
    }
}