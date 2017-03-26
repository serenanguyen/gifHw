// have array of prepopulated buttons that will be loaded to the page 
// when you click on a button the gifs are in still mode 
// _s
// 	on click, gif is active, click again and gif is still
// 	gif is displayed with rating
// have form input taken when submit is pressed and button is formed 		

$(document).ready(function(){
	var animals = ["kitten", "puppy", "armadillo", "bunny", "bird", "ferret", "turtle", "hamster", "goat", "whale"];

	// dynamically creating buttons 
	function renderButtons() {
		//deleting buttons before adding new buttons to prevent repeat buttons 
		$("#buttons-view").empty();
		for (var i=0; i<animals.length; i++){
			// create a button div
			var a = $("<button>");
			// add class animal
			a.addClass("btn btn-info btn-lg animal");
			// add attribute data-name of animal name
			a.attr("data-name",animals[i]);
			// adding button name of the animal 
			a.text(animals[i]);
			//appending newly created div to buttons-view div
			$("#buttons-view").append(a);
		}
	};
	// adding user input to array so that new button can be created
	$(".submit").on("click", function(event){
		console.log("frog");
		event.preventDefault();
		//grabbing input from textbox and removing white space
		var animal = $("#addButton").val().trim();
		// adding animal from textbox to array
		animals.push(animal);
		//calling renderButtons to create buttons from array
		renderButtons();
	})
	//why didn't this work when it was just $(".gif").on("click")??
	$(document).on("click", ".gif", function(){
		console.log("mewmew");
		// get state of gif
		var state = $(this).attr("data-state");
		//if state is still
		if(state === "still"){
			//change src to value of data-animate
			$(this).attr("src", $(this).attr("data-animate"));
			//change state to animate
			$(this).attr("data-state", "animate");
		} else if (state !== "still"){
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});	
	renderButtons();
	// adding a click event listener to all elements with a class of animal and running function to display gif results
	// $(document).on("click", ".animal", displayResults)
	
	// when click button with class animals
	$(document).on("click", ".animal", function(){
		// grab data name and store as variable animal
		var animal = $(this).attr("data-name");
		//creating search url
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=9"
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response.data);	
			var results = response.data
			// for each result
			for (var i=0; i<results.length; i++){	
				var animalDiv = $("<div>");
				animalDiv.addClass("col-md-4");
				var p =$("<p>");
				p.text("Rating: "+results[i].rating);
				var animalImage = $("<img>");
				//result image is still gif
				animalImage.attr("src", results[i].images.fixed_height_still.url);
				//gif stored as data-animate
				animalImage.attr("data-animate", results[i].images.fixed_height.url);
				animalImage.attr("data-still", results[i].images.fixed_height_still.url);
				//default state is still
				animalImage.attr("data-state", "still");
				animalImage.addClass("gif");
				animalDiv.append(p);
				animalDiv.append(animalImage);
				$(".results").prepend(animalDiv);
			}
		})
	})   




});	



