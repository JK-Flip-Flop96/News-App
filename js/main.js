console.log('JS Started');

let getSources = function (state) {
    // call to the sources api
    $.getJSON("https://newsapi.org/v1/sources?language=en&category=technology", function (json) {

        // variables used to store the required information from the first call
        let sourcesList = [];
        let sourceNames = [];
        let sourceSorts = [];
        let sourceURLs = [];
        let sourceEnabled = [];

        // clears the articles section of the site
        let reset = "";
        $('#articles').html(reset);

        // adds the information about each source to the variables
        for (let i = 0; i < json.sources.length; i++) {
            sourcesList[i] = json.sources[i].id;
            sourceNames[i] = json.sources[i].name;
            sourceSorts[i] = json.sources[i].sortBysAvailable;
            sourceURLs[i] = json.sources[i].url;
            sourceEnabled[i] = $('input[value=' + sourcesList[i] + ']').is(':checked');
        }

        // used for testing
        // console.log(sourceEnabled);
        // console.log(sourcesList);

        // determines the sort
        let sort;
        if (state === 'Top') {
            sort = 'top'
        } else {
            sort = 'latest'
        }

        // loops through the list of sources to display each.
        for (let i = 0; i < sourcesList.length; i++) {

            // defaults to attempting to load
            let load = true;

            // disables Hacker News as content doesn't display well
            if (sourcesList[i] === "hacker-news") {
                load = false
            }

            // checks whether the source can be sorted by latest
            if ($.inArray('latest', sourceSorts[i]) === -1 && sort === 'latest') {
                load = false
            }

            // checks whether the source can be sorted by top
            if ($.inArray('top', sourceSorts[i]) === -1 && sort === 'top') {
                load = false
            }

            // checks whether the source has been disabled by the user by selecting the appropriate checkbox
            if (!sourceEnabled[i]) {
                load = false
            }

            // used for testing
            // console.log(load + " " + sourceNames[i]);

            // only loads if the above test are all passed
            if (load === true) {

                // api called using the appropriate source and sort
                $.getJSON("https://newsapi.org/v1/articles?source=" + sourcesList[i] + "&sortBy=" + sort + "&apiKey=3b3c91de05994045b2b4ab15df772f7e", function (json) {

                    // determines the number of articles that should be displayed
                    let noArticles = $('select[id=no-articles-drop-down]').val();
                    if(json.articles.length <= noArticles){
                        noArticles = json.articles.length;
                    }

                    //construction of the html to display the article
                    let output = '<a href="' + sourceURLs[i] + '" <div id="source-divider">' + sourceNames[i] + '</div></a>';
                    for (let i = 0; i < noArticles; i++) {
                        output += '<a href="' + json.articles[i].url + '">';
                        output += '<div class="article">';
                        output += '<img id = "article-photo" src=' + json.articles[i].urlToImage + '>';
                        output += '<p id="article-headline">' + json.articles[i].title + '</p>';
                        output += '</div></a>';
                    }

                    $('#articles').append(output)

                });
            }

            // attempt at displaying a message to say that no articles were loaded but it doesn't work
            if($('articles').html() === ""){
                $('status').html('<p>No Articles</p>')
            }else{
                $('status').html("")
            }
        }
    });
};

// run after page load
$(function () {

    // ensures that the "Top" radio button is check by default
    $('input[value=Top]').prop('checked', true);

    // API call to load a list of sources for the creation of the checkboxes on the sidebar
    $.getJSON("https://newsapi.org/v1/sources?language=en&category=technology", function (json) {
        let sourcesList = [];
        for (let i = 0; i < json.sources.length; i++) {
            sourcesList[i] = json.sources[i].id;
            if (sourcesList[i] !== "hacker-news") {
                // actual creation of the checkboxes
                $('#source-list').append('<input type="checkbox" name="source" value="' + json.sources[i].id + '" checked>' + json.sources[i].name + '<br>')
            }
        }

        // calls the function to load and display the articles
        getSources($('input[name=sort]:checked').val());

        // refreshes the page if any of the states of any of the checkboxes change
        $('input[type=checkbox]').change(function () {
            getSources($('input[name=sort]:checked').val());
        });
    });

    // refreshes the page if the sort radio buttons change
    $('input[name=sort]').change(function () {
        getSources(this.value);
    });

    $('select[id=no-articles-drop-down]').change(function () {
        getSources($('input[name=sort]:checked').val());
    });

    setInterval(function(){
        if($(".article:hover").length > 0) {
            $(".article").css('background-color', '#EEEEEE');
            $(".article:hover").css('background-color', '#F5F5F5');
        }
        else {
            $(".article").css('background-color', '#EEEEEE');
        }

    }, 10);

});

