/*<--- APP --->*/

var EventEmitter = require('events').EventEmitter;

var State = require('./state');

var Router = require('./router');
//

var controller__proto = function(){      // must have only one controller - singleton

    if (typeof controller__proto.instance === 'object') {
        return controller__proto.instance;
    }

    this.state = new State(); // state is the 'model'.

    this.on('GET', function(url){

        window.location.hash = url; // set window path

        var url = '/' + decodeURIComponent(url);

        if(url == '/'){

            if(this.state.default_route !== ''){

                url = '/' + this.state.default_route; //'/Home'
            }         
        }    

        if( url.search(/\?/) !== -1){

            Router.handle__query.call(this, url);  // handle routes with query
            
        } else {

            Router.handle.call(this, url);            

        }
        
        this.emit(this.signal, this.params, this.state);
    });

    this.on('POST', function(url, obj){

        this.params = {};

        for (var prop in obj) {

            var param = obj[prop];

            this.params[prop] = param;

        }

        var url = '/' + decodeURIComponent(url);

        this.signal = 'POST' + url;

        this.emit(this.signal, this.params, this.state);

    });

    controller__proto.instance = this;
}

controller__proto.prototype = new EventEmitter(); // inherit from Event Emiiter

controller__proto.prototype.set = function(type, param){ return this.state.set(type, param); },

controller__proto.prototype.component = function(params){ 

    var args = Array.from(arguments)

    return this.state.registerComponent(args);
}

controller__proto.prototype.get = function(url, callback){

    // wrapper for event emmitter 'on'

    this.on('GET' + url, callback);

}

controller__proto.prototype.post = function(url, callback){

    // wrapper for event emmitter 'on'

    this.on('POST' + url, callback);
}

controller__proto.prototype.http = controller__proto.prototype.emit; // rename emit to be more familiar

window['mvc__app'] = {}; // used for window event functions

window['mvc'] = function(){ return new controller__proto() };
