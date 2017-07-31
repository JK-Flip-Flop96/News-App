console.log('JS Started');

let getSources = function () {
    $.getJSON("https://newsapi.org/v1/sources?language=en&category=technology", function (json) {
        console.log(json)

        let sourcesList = [];

        for (let i = 0; i < json.sources.length; i++) {
           sourcesList[i] = json.sources[i].id;
           if(sourcesList[i] !== "hacker-news"){
			   $('#source-list').append('<input type="checkbox" name="source" value="Top" checked>' + json.sources[i].name + '<br>')
           }
        }

        console.log(sourcesList);

        var output = "";

        for(let i = 0; i < sourcesList.length; i++) {

        	if(sourcesList[i] !== "hacker-news") {
                $.getJSON("https://newsapi.org/v1/articles?source=" + sourcesList[i] + "&sortBy=top&apiKey=3b3c91de05994045b2b4ab15df772f7e", function (json) {
                    console.log(json);

                    for (let i = 0; i < (json.articles).length; i++) {
                        console.log(i);
                        console.log(json.articles[i].urlToImage);
                        output += '<div id="article">';
                        output += '<a href="' + json.articles[i].url + '">';
                        output += '<img id = "article-photo" src=' + json.articles[i].urlToImage + '>'
                        output += '<p id="article-headline">' + json.articles[i].title + '</p>';
                        output += '</div>';
                    }

                    $('#articles').append(output)


                });
            }
        }

    });
};

let updateSources = function () {

}


getSources();

$('#source-buttons').click(updateSources)

