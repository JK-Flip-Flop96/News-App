console.log('JS Started');

var getData = function(){
	$.getJSON("https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=3b3c91de05994045b2b4ab15df772f7e", function(json){
		console.log(json);
		$('#status').html('<h2>The Verge Status: ' + (json.status).toUpperCase() + '</h2>');

		var output = "";
		for(var i = 0; i < (json.articles).length; i++){
			console.log(i);
			console.log(json.articles[i].urlToImage)
			output += '<p id="article">'
            output += '<a href="' + json.articles[i].url + '">';
            output += '<img id = "article-photo" src=' + json.articles[i].urlToImage + '>'
            output += '<br>'
            output += json.articles[i].title
            output += '</p>'
		}

		$('#articles').html('<p>' + output + '</p>')


	});
}

getData()
