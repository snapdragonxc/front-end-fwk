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
