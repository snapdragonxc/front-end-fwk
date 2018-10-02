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

  console.log('pp', params, state)

  console.log(params.action);

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
        console.log('kk')
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
    console.log('ss', state, params)

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

// This code was taken from the Japan Airlines webpage and was altered slightly to use
// the background color and radius instead of images for the buttons.
var mainVisual ={
    CLS_IS_CURRENT : 'is-current',
    timer : null,
    maxNo : 0,
    currentNo : 1,
    setup : function(maxNo){
        this.setTimer();
        this.setEvent();
    },
    getMaxNo : function(){
        this.maxNo = $('.mainVisualItem').length;   ;     
    },
    setTimer : function(){
        var _this = this;
        this.timer = setInterval(function(){
            _this.changePicture();
        }, 7000);
    },
    changePicture : function(){
        $('.mainVisualItem:not(:eq(' + this.currentNo +'))').fadeOut(1000);
        $('.mainVisualItem:eq(' + this.currentNo + ')').fadeIn(500);
        $('.numBtn:not(:eq(' + this.currentNo + '))').removeClass(this.CLS_IS_CURRENT);
        $('.numBtn:eq(' + this.currentNo + ')').addClass(this.CLS_IS_CURRENT);
        this.currentNo = this.currentNo + 1;  
        if(this.maxNo === 0){
            this.getMaxNo(); // call if not set
        }   
        if(this.currentNo === this.maxNo){
            this.currentNo = 0;
        };
    },
    setEvent : function(){
        var _this = this;
        $('.numBtn').on('click', function(){
            _this.currentNo = $('.numBtn').index(this);
            _this.changePicture();
        });
        $('.pauseBtn').on('click', function(){
            if($(this).hasClass('pauseBtn')){
                $(this).html('&#9656;');
            }else{
                $(this).html('||');
            };
            $(this).toggleClass('pauseBtn');
            $(this).toggleClass('startBtn');
            if($(this).hasClass('pauseBtn')){
                _this.setTimer();
            }else{
                clearInterval(_this.timer);    
            };
        });
    }
};
$(function(){
    mainVisual.setup();
});
// This algorithm fills a column element from an array of words up to
// the desired height of the screen window. The algorithm ensures a fixed height for the magazine articles
// so that a single page is contained within an entire screen. This code is experimental.
// This is a three stage algorithm. First stage: an initial approx is guessed using the approximate
// number of words per line. Second stage: This approx is then improved with a binary search algorithm.
// Third stage: Finally the exact solution is achieved with linear search within a few steps.
//setTimeout(myLoad, 200);
//function myLoad() {
    //    document.getElementById("out2").innerHTML = " |";
var PageAlgo = (function(){
    // Algorithm for spacing text to desired height "x"    
    var left_prev = 0;
    var right_prev = 0;
    var search_forward = true;
    var fmt; // = document.querySelectorAll(".col");
    var str; // = document.getElementById("hiddenTxt").innerHTML;
    var words; // = removeFormat(str); 
    var page_index = [];
    var index = [];    
    var max_number_col = 5;
    var number_of_col = 0; 
    var endOfDocument = false;
    var set_hgt = 0; /* This is the desired height by the user. Actual height is slightly less */
    function binarySearch(a, initialIndex, left,  right, h, e) {            
        var middle = parseInt( (left + right) / 2);
        if (left > right) { // stop binary search and perform inner search
            // Solution not yet reached, do forward step search
            search_forward = true;               
            return left_prev;
        }
        var hcur = getHeight(a, initialIndex, middle, e);
        var hleft = getHeight(a, initialIndex, left, e);
        var hright = getHeight(a, initialIndex, right, e);
        if( (hleft > h) && (hright > h) ){ // stop binary search and perform inner search. 
            // Solution was passed, do backward step search
            search_forward = false;
            return left;
        }
        if (hcur  == h){ // exact match
            return middle;
        }
        if ( hcur  > h) {
            left_prev = left;
            right_prev = right;
            return binarySearch(a, initialIndex, left, middle - 1, h, e);
        }
        if ( hcur < h ){
            left_prev = left;
            right_prev = right;
            return binarySearch(a, initialIndex, middle + 1, right, h, e);  
        }
    };
    function getHeight(a, startIndex, m, e){
        // calculating the page height is expensive in time 
        var t = insertFormat(a, startIndex, m);
        e.innerHTML =  t ;
        return e.clientHeight;
    };    
    function insertFormat(a, start_index, max_index){    // a is an array 
        // put HTML format tags back to allow accurate calculation of text height
        var txt = "";
        for(var i = start_index; i <= max_index; i++){
            txt = txt + " " + a[i];
        }
        // paragraphs
        var txt1 = txt.replace(/\+\+\+/g, "<p>");  
        var txt2 = txt1.replace(/\-\-\-/g, "<\/p>");
        // heading 1 - 
        // currently supports a single header. Other elements may be added but are not dealt 
        // with in code. In other words the behaviour is unpredicatable - meaning unexpected page breaks etc
        var txt3 = txt2.replace(/\+\+/g, "<h1>");  
        var txt4 = txt3.replace(/\-\-/g, "<\/h1>");
        return txt4;
    }
    function removeFormat(txt){
        //pre-condition text by removing HTML paragraph tags and h1 tags
        // paragraphs
        var txt1 = txt.replace(/<p>/g, " +++");  
        // space to get it to separate words without 
        // spaces between paragraphs
        var txt2 = txt1.replace(/<\/p>/g, "---"); 
        // headings 1
        var txt3 = txt2.replace(/<h1>/g, " ++");  
        var txt4 = txt3.replace(/<\/h1>/g, "--"); 
        var a = txt4.split(" "); //array of words
        return a; // return array;
    }
    function fwd_linearSearch(a, start_index, stop_index, x, e){
        // perform linear search to fine tune solution
        var hgt = 0;
        var j = stop_index;
        for(var i = stop_index + 1; i < a.length; i++){
            hgt = getHeight(a, start_index, i, e);
            j = i;
            if(hgt > x){
                j = i-1;
                break;        
            }
        }
        hgt = getHeight(a, start_index, j, e);
        return j; 
    };
    function bkwd_linearSearch(a, start_index, stop_index, x, e){
        // perform linear search to fine tune solution
        var hgt = 0;
        var j = stop_index;
        for(var i = stop_index - 1; i > start_index; i--){
            hgt = getHeight(a, start_index, i, e);
            j = i;
            if(hgt < x){
                j = i;
                break;        
            }
        }
        hgt = getHeight(a, start_index, j, e);
        return j; 
    };   
    //
    function getCeiling(a, e){        
        // Get Initial Guess using number of words per unit height
        var x2 = (words.length > 1000)? 1000 : words.length-1;                         
        var txt = "";
        for(var i = 0; i <= x2; i++)
            txt = txt + " " + a[i];
        e.innerHTML = txt;
        var h2 = e.clientHeight;
        var x1; // initial guess
        var h1 = set_hgt;
        x1 = x2 * h1/h2;
        return Math.floor(2.0 * x1); // ceiling for Binary Search
    };    
    var x11;
    function fillDiv(words, start_index, desired_height, e){
        // This algorithm fills a div element from an array of words up to
        // the desired height chosen by the user. It returns the end index of the array that 
        // corresponds to the number of words required to fill the div.
        //var cnt = words.length -1;       
        // Get ceiling for binary search
        if(start_index == 0)
            x11 = getCeiling(words, e);
        var cnt = start_index + x11;
        if(cnt > words.length)
            cnt = words.length-1;
        // perform binary search to get approximate end index
        var upper_limit = start_index + cnt;
        if (upper_limit > words.length) 
            upper_limit = words.length-1;
        var endIndex  = binarySearch(words, start_index, start_index, upper_limit, desired_height, e);
        // Perform linear search to get an exact index
        if(search_forward)
            endIndex = fwd_linearSearch(words, start_index, endIndex, desired_height, e);
        else
            endIndex = bkwd_linearSearch(words, start_index, endIndex, desired_height, e);
        //    fwd_linearSearch(words, start_index, 0, desired_height, e);
        var startOfNextDiv = endIndex + 1;
        return startOfNextDiv;
    };
    function initialise(n, height, cols){  // height is the desired height. The actual height may be slightly less.       
        number_of_col = n;
        set_hgt = height;
        fmt = document.querySelectorAll(cols); // cols = ".TxtCols"    
        //    document.getElementById("out").innerHTML = number_of_col;
        for(var i = 0; i < max_number_col; i++){
            index[i] = 0;            
        }
        endOfDocument = false;
    };
    //
    function Next(){ // go to next page
        if(endOfDocument){
            return false;
        }
        ClearHeight();// needed for proper computation
        page_index.push(index[0]);        
        index[0] = index[number_of_col] ;
        for(var i = 0; i < number_of_col; i++){        
            index[i+1] = fillDiv(words, index[i], set_hgt, fmt[i]);
            //document.getElementById("q1").innerHTML = words[index[i+1]-3];
            // Check for end of paragraph in last three index
            if( words[index[i+1]-1].search(/---/) != -1) // first could be a null character
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-2].search(/---/) != -1)
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-3].search(/---/) != -1)
                FormatLastParagraph(fmt[i]);                         
            if((index[i+1]) == words.length) {                
                endOfDocument = true;
                fmt[i].style.height = actual_hgt  + "px";
                if( (i+1) < number_of_col ){            
                    fmt[i+1].style.display = "none";
                }
                break;
            }
        } 
        return true;
    };
    function Prev(){ // go to previous page
        endOfDocument = false;
        if(page_index.length == 0){
            return false;
        }
        ClearHeight(); // needed for proper computation
        index[0] = page_index.pop();
        ClearHeight(); // needed for proper computation
        for(var i = 0; i < number_of_col; i++){        
            index[i+1] = fillDiv(words, index[i] , set_hgt, fmt[i]);
            if( words[index[i+1]-1].search(/---/) != -1) // first could be a null character
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-2].search(/---/) != -1)
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-3].search(/---/) != -1)
                FormatLastParagraph(fmt[i]);         
            if((index[i+1]) == words.length)             
                endOfDocument = true;            
        }
        return true;
    };
    var actual_hgt = 0; /* the actual height is calculated on the first column only but will be the same for all columns */
    function First() {        // go to first page
        //fmt = document.querySelectorAll(".TxtCols");
        page_index = []; // empty page_index
        str = document.getElementById("hiddenTxt").innerHTML;
        words = removeFormat(str); 
        ClearHeight(); 
        index[0] = 0;
        for(var i = 0; i < number_of_col; i++){                
            index[i+1] = fillDiv(words, index[i], set_hgt, fmt[i]) // start of next page
            //    document.getElementById("out").innerHTML += " " + number_of_col;
            // search done with regular expression
            //
            if( words[index[i+1]-1].search(/---/) != -1) // first could be a null character
                FormatLastParagraph(fmt[i]); 
            if( words[index[i+1]-2].search(/---/) != -1)
                FormatLastParagraph(fmt[i]);             
            if((index[i+1]) == words.length)             
                endOfDocument = true;    
        }
        // centralise article in container
        //    var ha = document.getElementsByTagName("article")[0].offsetHeight;
    //    document.getElementsByTagName("article")[0].style.top = (max_hgt-ha)/2 + "px";
    actual_hgt = fmt[0].offsetHeight;
    };
    function FormatLastParagraph(e){
        // add dummy paragraph to ensure last paragraph formats properly
        e.innerHTML = e.innerHTML + "<p></p>"; // add dummy paragraph to force formatting not to justify last paragraph
        e.querySelector("p:last-child").style["display"] = "none"; // make dummy paragraph hidden.
    }  
    function ClearHeight(){
        for(var i = 0; i < number_of_col; i++) {
            fmt[i].style.height = "";
            fmt[i].innerHTML = "";
            fmt[i].style.display = "block";
        }
    }
    function SetHeight(){ // not used at present. Sets height of all cloumns to be the same.
        for(var i = 0; i < number_of_col; i++){
            fmt[i].style.height = actual_hgt  + "px";
        }
    }
    // External interface
    var MyPage = {
        initialise: initialise,
        Next: Next,
        Prev: Prev,
        First: First,
        fillDiv: fillDiv
    };
    return MyPage;
})();
/* <--- external service ---> */


var service = {

    types: [ 'GSX 400', 'GSXR-400', 'GSXR-750', 'GS 1000'],

    models: ['Model F (1983)', 'GK71B (1984)', 'GK71F (1986)', 'GR71F (1985)', 'GR77A (1989)',
                '1978', 'Model S (1979)', 'Model G (1981)', 'R (1983)'],

    bikes: [{

            type: 'GSX 400',

            query: 'suzuki gsx400, suzuki gsx 400',

            model: 'Model F (1983)',

            articles: [{title: 'Two Wheels 1982', file: 'gsx400apr1982.html'}],

            specs: 'gsx400_1983.json',

            chart: '',

            photos: 8
        }, {

            type: 'GSXR-400',

            query: 'suzuki gsxr400, suzuki gsxr 400, suzuki gsx-r400, suzuki gsx-r 400',

            model: 'GK71B (1984)',

            articles: [ {

                    title: 'AMCN 1984',

                    file: 'gsxr400nov1984.html'
                }, {
                    title: 'Two Wheels Jan 85',

                    file: 'gsxr400jan1985.html',
                }, {
                    title: 'Two Wheels Aug 85',

                    file: 'gsxr750aug1985.html'
                }],

            specs: 'gsxr400_1984.json',

            chart: '',

            photos: 24
        }, {

            type: 'GSXR-400',

            query: 'suzuki gsxr400, suzuki gsxr 400, suzuki gsx-r400, suzuki gsx-r 400',

            model: 'GK71F (1986)',

            articles: [],

            specs: 'gsxr400_1986.json',

            photos: 8
        }, {

            type: 'GSXR-750',

            query: 'suzuki gsxr750, suzuki gsxr 750, suzuki gsx-r750, suzuki gsx-r 750',

            model: 'GR71F (1985)',

            articles: [{title: 'Two Wheels 1985', file: 'gsxr750aug1985.html'}],

            specs: 'gsxr750_1985.json',

            chart: '',

            photos: 24
        }, {

            type: 'GSXR-750',

            query: 'suzuki gsxr750, suzuki gsxr 750, suzuki gsx-r750, suzuki gsx-r 750',

            model: 'GR77A (1989)',

            articles: [],

            specs: 'gsxr750_1989.json',

            chart: '',

            photos: 8
        }, {

            type: 'GS 1000',

            query: 'suzuki gs1000, suzuki gs 1000',

            model: '1978',

            articles: [],

            specs: 'gs1000_1978.json',

            chart: '',

            photos: 0
        }, {

            type: 'GS 1000',

            query: 'suzuki gs1000, suzuki gs 1000',

            model: 'Model S (1979)',

            articles: [{title: 'Two Wheels 1980', file: 'gs1000feb1980.html'}],

            specs: 'gs1000_1979.json',

            chart: '',

            photos: 16
        }, {

            type: 'GS 1000',

            query: 'suzuki gs1000, suzuki gs 1000',

            model: 'Model G (1981)',

            articles: [],

            specs: 'gs1000_1981.json',

            chart: '',

            photos: 0
        }, {

            type: 'GS 1000',

            query: 'suzuki gs1000, suzuki gs 1000',

            model: 'R (1983)',

            articles: [{
                    title: 'Classic Motor Bikes',

                    file: 'gs1000mar2012.html'
                }, {
                    title: 'Sports Bike',

                    file: 'gs1000may1984.html'
                }],

            specs: 'gs1000_1981.json',

            chart: '',

            photos: 0
        }
    ],

    getModels: function(type){

        var res = [];

        this.bikes.forEach(function(bike){

           if(bike.type == type){

                res.push(bike.model);
           }

        });

        console.log('tt', type, res)

        return res;

    },

    getSpecs: function(type, model) {

        var res = this.bikes.find(function(bike){

           if((bike.type == type) && (bike.model == model)){

                return bike;
           }

        });

        var url = 'data/specs/' + res.specs;

        return new Promise(function(resolve, reject) {
            //XHR
            var req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function() {
              if (req.status == 200) {
                resolve(req.response);
              }
              else {
                reject(Error(req.statusText));
              }
            };
            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });
    },

    getArticles: function(type){

        var res = [];

        for(var i = 0; i < this.bikes.length; i++){
            if(this.bikes[i].type === type){
                var articles = this.bikes[i].articles;
                for(var j = 0; j < articles.length; j++){
                    res.push(articles[j]);
                }
            }
        }
        return res;
    },

    getArticle: function(type, article) {

        var file = ''

        for(var i = 0; i < this.bikes.length; i++){

            var articles = this.bikes[i].articles;

          //  console.log(articles);

           for(var j = 0; j < articles.length; j++){

                if(articles[j].title === article){

                    file = articles[j].file;

                    break;
                }
            }
        }

        var url = 'data/articles/' + file;

        return new Promise(function(resolve, reject) {
            //XHR
            var req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function() {
              if (req.status == 200) {
                resolve(req.response);
              }
              else {
                reject(Error(req.statusText));
              }
            };
            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });



    },

    photosPerPage: 8,

    getPhotos: function(type, model, page){

        var pages = 1;

        var count = 0;

        this.bikes.forEach(function(bike){

           if( (bike.type == type) && (bike.model == model) ){
                count = bike.photos;
           }

        });

        var arr = [];

        for(var i = 1; i <= count; i++){
            arr.push('img' + i.toString() + '.jpg');
        }
        pages = Math.ceil(count/this.photosPerPage);

        // Lower limit on page
        if(page == 0){
            page = 1;
        }
        // Upper limit on page
        if( pages > 0 ){
            if( page > pages ){
                page = pages;
            }
        }
        var start = this.photosPerPage * ( page -1 );
        var end = start + this.photosPerPage;

        return { photos: arr.slice(start, end), pages: pages, page: page };
    },

    hasPhotos: function(type, model) {

        var count = 0;

        this.bikes.forEach(function(bike){

           if( (bike.type == type) && (bike.model == model) ){
                count = bike.photos;
           }

        });
        return count;
    },

    search: function(query){

        function isMatch(item) {
            var i = item.query.search(query);
            if(i != -1 ){
                return item;
            }
        }

        var matches = this.bikes.filter(isMatch);

        var results = [];

        for(var i = 0; i < matches.length; i++){

            var tmp =  matches[i].articles;

           if(tmp.length != 0){

                for(var j = 0; j < tmp.length; j++){

                     var obj = {type: matches[i].type, model: matches[i].model, article: matches[i].articles[j].title };

                    results.push(obj);
                }

            }
        }

        return results;
    }


};
