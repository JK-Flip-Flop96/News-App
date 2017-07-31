console.log('JS Started');

let getSources = function (state) {
    $.getJSON("https://newsapi.org/v1/sources?language=en&category=technology", function (json) {
        console.log(json)

        let sourcesList = [];
        let sourceNames = [];
        let sourceSorts = [];

        let reset = "";
        $('#source-list').html(reset);
        $('#articles').html(reset);

        for (let i = 0; i < json.sources.length; i++) {
           sourcesList[i] = json.sources[i].id;
           sourceNames[i] = json.sources[i].name;
           sourceSorts[i] = json.sources[i].sortBysAvailable;
           if(sourcesList[i] !== "hacker-news"){
			   $('#source-list').append('<input type="checkbox" name="source" value="Top" checked>' + json.sources[i].name + '<br>')
           }
        }

        console.log(sourcesList);

        let sort;
        if(state === 'Top'){
            sort = 'top'
        }else{
            sort = 'latest'
        }

        for(let i = 0; i < sourcesList.length; i++) {

        	if(sourcesList[i] !== "hacker-news") {
                $.getJSON("https://newsapi.org/v1/articles?source=" + sourcesList[i] + "&sortBy=" + sort + "&apiKey=3b3c91de05994045b2b4ab15df772f7e", function (json) {
                    console.log(json);
                    if(($.inArray('latest',sourceSorts[i]) !== -1 && sort === 'latest') || sort === 'top') {
                        var output = '<div id="source-divider">' + sourceNames[i] + '</div>';
                        for (let i = 0; i < (json.articles).length; i++) {
                            console.log(i);
                            console.log(json.articles[i].urlToImage);
                            output += '<a href="' + json.articles[i].url + '">';
                            output += '<div id="article">';
                            output += '<img id = "article-photo" src=' + json.articles[i].urlToImage + '>';
                            output += '<p id="article-headline">' + json.articles[i].title + '</p>';
                            output += '</div></a>';
                        }
                    }
                    $('#articles').append(output)
                });
            }
        }
    });
};

let Top = "Top";

$(function () {
    getSources($('input[name=sort]:selected').val());

    $('input[name=sort]').change(function () {
        getSources(this.value);
    });

});



