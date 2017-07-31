console.log('JS Started');

let getSources = function (state) {
    $.getJSON("https://newsapi.org/v1/sources?language=en&category=technology", function (json) {

        let sourcesList = [];
        let sourceNames = [];
        let sourceSorts = [];
        let sourceURLs = [];
        let sourceEnabled = [];

        let reset = "";
        $('#articles').html(reset);

        for (let i = 0; i < json.sources.length; i++) {
            sourcesList[i] = json.sources[i].id;
            sourceNames[i] = json.sources[i].name;
            sourceSorts[i] = json.sources[i].sortBysAvailable;
            sourceURLs[i] = json.sources[i].url;
            sourceEnabled[i] = $('input[value=' + sourcesList[i] + ']').is(':checked');
        }
        console.log(sourceEnabled);


        console.log(sourcesList);

        let sort;
        if (state === 'Top') {
            sort = 'top'
        } else {
            sort = 'latest'
        }

        for (let i = 0; i < sourcesList.length; i++) {

            let load = true;

            if (sourcesList[i] === "hacker-news") {
                load = false
            }

            if ($.inArray('latest', sourceSorts[i]) === -1 && sort === 'latest') {
                load = false
            }

            if ($.inArray('top', sourceSorts[i]) === -1 && sort === 'top') {
                load = false
            }

            if (!sourceEnabled[i]) {
                load = false
            }

            console.log(load + " " + sourceNames[i]);
            if (load === true) {
                $.getJSON("https://newsapi.org/v1/articles?source=" + sourcesList[i] + "&sortBy=" + sort + "&apiKey=3b3c91de05994045b2b4ab15df772f7e", function (json) {

                    var output = '<a href="' + sourceURLs[i] + '" <div id="source-divider">' + sourceNames[i] + '</div></a>';
                    for (let i = 0; i < (json.articles).length; i++) {
                        output += '<a href="' + json.articles[i].url + '">';
                        output += '<div id="article">';
                        output += '<img id = "article-photo" src=' + json.articles[i].urlToImage + '>';
                        output += '<p id="article-headline">' + json.articles[i].title + '</p>';
                        output += '</div></a>';
                    }

                    $('#articles').append(output)
                });
            }

            if($('articles').html() === ""){
                $('status').html('<p>No Articles</p>')
            }else{
                $('status').html("")
            }
        }
    });
};

$(function () {
    $('input[value=Top]').prop('checked', true);


    $.getJSON("https://newsapi.org/v1/sources?language=en&category=technology", function (json) {
        let sourcesList = [];
        for (let i = 0; i < json.sources.length; i++) {
            sourcesList[i] = json.sources[i].id;
            if (sourcesList[i] !== "hacker-news") {
                $('#source-list').append('<input type="checkbox" name="source" value="' + json.sources[i].id + '" checked>' + json.sources[i].name + '<br>')
            }
        }

        getSources($('input[name=sort]:checked').val());

        $('input[type=checkbox]').change(function () {
            getSources($('input[name=sort]:checked').val());
        });
    });



    $('input[name=sort]').change(function () {
        getSources(this.value);
    });



});



