$(document).ready(function() {
//Array for searched topics to be added
var topics = [];
 	function displayAnimalShow() {
	var x = $(this).data("search");
	console.log(x);
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=46e2a5d512d04452aec3c60dd091391c&q=&limit=25&offset=0&rating=G&lang=en";                 
	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	var showDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var showImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	showImage.attr("src", staticSrc);
        	showImage.addClass("animalGiphy");
        	showImage.attr("data-state", "still");
        	showImage.attr("data-still", staticSrc);
        	showImage.attr("data-animate", defaultAnimatedSrc);
        	showDiv.append(p);
        	showDiv.append(showImage);
        	$("#gifArea").prepend(showDiv);

        }
	});
}
	$("#addShow").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#animalInput").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#animalInput").val('');
        displayButtons();
      });

	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "show");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();
  $(document).on("click", "#show", displayAnimalShow);
  $(document).on("click", ".animalGiphy", pausePlayGifs);
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});