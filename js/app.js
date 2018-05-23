/**************Google Books API******************/

document.getElementById('search-button').addEventListener('click', function() {bookSearch();})

function bookSearch() {
	var search_query = document.getElementById('searchbar').value;
	document.getElementById('book-results').innerHTML = "";

	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + search_query,
		dataType: "json",
		success: function(data) {

			console.log(data);
			for(i = 0; i < data.items.length; i++) {
				
				var title = "<span class='title'>" + data.items[i].volumeInfo.title + "</span>";
				var image = "<img src='" + data.items[i].volumeInfo.imageLinks.thumbnail + "alt='no image available'>";
				var temp = data.items[i].volumeInfo.authors;
				var description = "<span class='description'>" + data.items[i].volumeInfo.description + "</span>";
				var categories = "<span class='categories'>" + data.items[i].volumeInfo.categories + "</span>";

				if (i == 0) 
				 	loadVideo(data.items[i].volumeInfo.categories[0]);
				var authors = "";
				for(j = 0; j < temp.length; j++) {
					if(j === temp.length-1)
						authors += temp[j];
					else
						authors += temp[j] + ", ";
				}
				authors = "<span class='authors'>" + authors + "</span>";

				var block_left = "<div class='block-left'>" + image + "</div>";
				var block_right = "<div class='block-right'>" + title + authors + description + categories +
				"</div>";
				
				var block = "<div class='result-block'>" + block_left + block_right + "</div>";
				document.getElementById('book-results').innerHTML += block;
			}
		},
		type: 'GET'
	});
}

/**************Youtube API******************/

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstTagScript = document.getElementsByTagName('script')[0];
firstTagScript.parentNode.insertBefore(tag, firstTagScript);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      events: {
        'onReady': initialize,
        /*'onStateChange': onPlayerStateChange,*/
      }
    });
}

function loadVideo(category) {
	console.log(category);
	if (player) {
		if (videoIDs[category]) {
			player.loadVideoById(videoIDs[category]);
		} else {
			player.loadVideoById(videoIDs.default);
		}
	}
}

function initialize(event) {
		console.log('video player is ready');
	}

var videoIDs = {
	"Romance" : "q1Sxmzc9zEc", //Titanic, Violin 
	"Fiction": "lwxscEX51TQ",  //My immortal, Violin  
	"Juvenile Fiction": "pLhx8HuhYAs", // Beautiful & Sad Violin Cello Piano Flute 
	"History": "iYnquELtoRE", //We hear them talking 
	"Biography": "7LqQARE-X5Q", //Spirit of success 
	"Religion" : "Um8UzTWEAP0", 
	"Business & Economics" : "GsrIZ1mnOvU",
	"Comics & Graphic Novels" : "lCOF9LN_Zxs",


	default: "ZTrrc6Ni5eM"
}


/**************************************/
