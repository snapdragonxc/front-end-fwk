var app = mvc();

app.set('views__dir', 'partials');

app.set('components__dir', 'components');

app.set('default__route', '/Home');

$(window).on('hashchange', function(){      // call routes on hash change

    var route = window.location.hash.slice(1);

    app.http('GET', route); // emit get calls

    app.http('POST', route); // emit post as well
});


$(window).on('load', function(){

    var route = window.location.hash.slice(1);

    app.http('GET', route); // emit get calls

    app.http('POST', route); // emit post as well

});

// template file with event

app.get('/Home', function(params, state){

    state.render('Home', home);
});

app.get('/About', function(params, state){

    state.render('About', home);
});

// string template
app.get('/Blog', function(params, state){

    state.render('Blog', '<div class="blog"><div class="row"><div class="lg-col-span-12" class="blog-content">' +
            '<h2 class="blog-content-title"> Coming soon ... </h2></div></div></div>');
});


app.post('/Specs', function(params, state){

    var action = params.action || '';

    switch(action){
        case 'NEW_TYPE':
            state.models = service.getModels(params.type);
            state.model = state.models[0];
            state.type = params.type;
            state.types = service.types;
            break;
        case 'NEW_MODEL':
            state.models = service.getModels(params.type);
            state.type = params.type;
            state.model = params.model;
            state.types = service.types;
            break;
        default:                            // initial route is empty of parameters
            params.type = 'GSXR-400';
            params.model = 'GK71B (1984)';
            state.type = params.type;
            state.model = params.model;
            state.models = service.getModels(params.type);
            state.types = service.types;
            break;
    }

    service.getSpecs(state.type, state.model).then(function(data) {

            state.specs = JSON.parse(data);

            state.render('Specs', specs);       // update view

        }, function(error) {

            console.log("Failed to load specs");
        });
});

app.get('/Photos/:action/:type/:model/:page', function(params, state){

    switch(params.action){
        case 'NEW_TYPE':
            state.models = [];
            service.getModels(params.type).forEach(function(model){
                if(service.hasPhotos(params.type, model) != 0){
                    state.models.push(model);
                }
            });
            state.types = service.types;
            state.model = state.models[0];
            state.type = params.type;
            state.pageData = service.getPhotos(state.type, state.model, 1);
            state.render('Photos', photos);
            break;

        case 'NEW_MODEL':
            state.models = [];
            service.getModels(params.type).forEach(function(model){
                if(service.hasPhotos(params.type, model) != 0){
                    state.models.push(model);
                }
            });
            state.model = params.model;
            state.type = params.type;
            state.pageData = service.getPhotos(state.type, state.model, 1);
            state.types = service.types;
            state.render('Photos', photos);
            break;

        case 'NEW_PAGE':
            state.pageData = service.getPhotos(state.type, state.model, params.page);
            state.render('Photos', photos);
            break;
        default:
            params.type = 'GSXR-400';
            params.model = 'GK71B (1984)';
            state.type = params.type;
            state.model = params.model;
            state.types = service.types;
            state.models = [];
            service.getModels(params.type).forEach(function(model){

                if(service.hasPhotos(params.type, model) != 0){

                    state.models.push(model);
                }
            });
            state.pageData = service.getPhotos(params.type, params.model, 1);
            state.render('Photos', photos);
            break;
    }
});

app.get('/Articles/:action/:type/:article', function(params, state){

    switch(params.action){
        case 'NEW_TYPE':
            state.type = params.type;
            state.types = service.types;
            state.articles = [];
            state.page = 1;
            service.getArticles(params.type).forEach(function(article){

                state.articles.push(article.title);
            });

            state.article = state.articles[0];

            service.getArticle(params.type, state.article).then(function(res){

                state.file = res;

                state.render('Articles', articles);

            }, function(rej){

                console.log(rej);
            })

            break;

        case 'NEW_ARTICLE':
            state.types = service.types;
            state.type = params.type;
            state.article = params.article;

            state.articles = [];
            state.page = 1;
            service.getArticles(params.type).forEach(function(article){

                state.articles.push(article.title);
            });

            service.getArticle(params.type, params.article).then(function(res){

                state.file = res;

                state.render('Articles', articles);

            }, function(rej){

                console.log(rej);
            })

            break;
        default:
            params.type = 'GSXR-400';
            params.article = 'Two Wheels Jan 85';
            state.type = params.type;
            state.types = service.types;
            state.article = params.article;
            state.articles = [];
            state.page = 1;
            service.getArticles(params.type).forEach(function(article){
                    state.articles.push(article.title);
            });

            service.getArticle(params.type, params.article).then(function(res){

                state.file = res;

                state.render('Articles', articles);

            }, function(rej){

                console.log(rej);
            })

            break;
    }
});

app.get('/SearchPage/:query', function(params, state){

    state.query = params.query;

    state.results = service.search(params.query);

    state.render('SearchPage', searchPage);       // update view

});

/*
app.post('/SearchPage', function(params, state){

    console.log('ss', state)

    state.query = params.query;

    state.results = service.search(params.query);

    state.render('SearchPage', searchPage);       // update view

});
*/

// Define Components

app.component('selector', function(props){

    var options = props.options, option = props.option;

    this.onOption = props.onOption;

    this.list = '';

    var that = this;

    this.option = option;

    this.x = 1;

    this.onTest = function(){

        this.x = this.x + 1;

        console.log('counter', this.x);

    };

    var selected = '';

    for( var i = 0; i < options.length;  i++){
        selected = '';
        if(options[i] == option) {
            selected = 'selected="selected"';
        }

        this.list += '<option value="' + options[i] + '" ' + selected +
            '>' + options[i] + '</option>';
    };
}, '<select class="page-select" onchange="onOption(this.value)">{{list}}</select>' +
        '<div class="page-select-btn"><i class="fa fa-chevron-down"></i></div>');

// Define Views

var home = function(state){

    this.submitNotify = function(elem)
    {
        if( document.forms['notify']['EMAIL'].value != '' ){
            return (function(){
                elem.submit();
                elem.reset();
                return false;
            })();
        }
        return false;
    }
};

var specs = function(state){ // callback function for updating view with state.

    this.onType = function(type){

        app.http('POST', 'Specs', { action: 'NEW_TYPE', type: type });  // trigger for controller

    };

    this.onModel = function(model){

        app.http('POST', 'Specs', { action: 'NEW_MODEL', type: this.type, model: model });  // trigger for controller

    };

    this.types = state.types;

    this.type = state.type;

    this.specs = state.specs;

    this.models = state.models;

    this.model = state.model;
};

var photos = function(state){

    this.onType = function(type){

       app.http('GET', 'Photos/NEW_TYPE/' + type);
    };

    this.onModel = function(model){

        app.http('GET', 'Photos/NEW_MODEL/' + this.type + '/' + model);
    };

    this.onNextPage = function(){

        var nextPage = Number(this.page) + 1;

        console.log('nextPage', nextPage)

        app.http('GET', 'Photos/NEW_PAGE/' + this.type + '/' + this.model + '/' + nextPage);
    };

    this.onPrevPage = function(){

       var prevPage = Number(this.page) - 1;

        app.http('GET', 'Photos/NEW_PAGE/' + this.type + '/' + this.model + '/' + prevPage);
    };

    this.photos = state.pageData.photos;

    this.page = state.pageData.page;

    this.pages = state.pageData.pages;

    this.types = state.types;

    this.type = state.type;

    this.models = state.models;

    this.model = state.model;

    this.display = '';
    for( var i = 0; i < this.photos.length; i++) {
        if( i % 2 == 0 ){
            this.display += '<div class="lg-col-span-3">'
        }
        this.display += '' +
            '<div class="photos-content-img-container">' +
                '<a target="_blank" href="data/photos/' + this.type + '/' + this.model + '/' + this.photos[i] + '">' +
                    '<img src="data/photos/' + this.type + '/' + this.model + '/thbs/' + this.photos[i] + '">' +
                '</a>' +
            '</div>';
        if( (i % 2 == 1)){
            this.display += '</div>'
        }
    }
};

var page = 1;

var articles = function(state){

    this.onType = function(type){

        app.http('GET', 'Articles/NEW_TYPE/' + type);
    };

    this.onArticle = function(article){

        app.http('GET', 'Articles/NEW_ARTICLE/' + this.type + '/' + article);

    };

    this.onNextPage = function(){
        if( PageAlgo.Next() ){

            page = page + 1;

            document.getElementById("articles-page-number").innerHTML = page;
        }
    };

    this.onPrevPage = function(){
        if( PageAlgo.Prev() ){

            page = page - 1;

            document.getElementById("articles-page-number").innerHTML = page;
        }
    };

    this.type = state.type;

    this.article = state.article;

    this.types = state.types;

    this.articles = state.articles;

    this.file = state.file;

};

var searchPage = function(state){

    var results = state.results;

    this.click = function(event, index){

        event.preventDefault();

        var type = results[index].type;

        var article = results[index].article;

        app.http('GET', 'Articles', {action: 'NEW_ARTICLE', type: type, article: article, page: 1});
    }

    this.list = '';

    for( var i = 0; i < results.length; i++ ){

        var index = i;

        var article = results[i].article;

        this.list = this.list + '<li class="search-list-item"><a href="#" onclick="click(event, ' + index + ')">' + article + '</a></li>';
    }

    var title = '';

    if( state.results.length == 0 ){

        this.title = 'No Results for ' + '\'' + state.query  + '\'';

    } else {

        this.title = 'Search Results for ' + '\'' + state.query  + '\'';
    }
}
