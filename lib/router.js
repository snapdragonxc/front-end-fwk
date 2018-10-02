'use strict'

module.exports = {

    handle__query: function(url){

        this.params = {};

        var urlHasParams = url.search(/\?/)

        var tmp = url.substring(urlHasParams + 1, url.length).split('&');
        
        for(var i = 0; i < tmp.length; i++){

            var arr__tmp = tmp[i].split('=');

            this.params[arr__tmp[0]] = arr__tmp[1];
        }

        this.signal = '';

        if( urlHasParams != -1 ){

            this.signal = url.substring(0, urlHasParams);

        } else {

            this.signal = url;
        }

        this.signal = 'GET/' + this.signal;

    },

    handle: function(url){

        var _url = 'GET' + url;

        this.params = {};

        var tmp = [];

        for(var event in this._events){

            tmp.push(event);
        }

        for(var i = 0; i < tmp.length; i++){

            var pathHasParams = tmp[i].search(/\:/);

            var paramNames = [];

            var addr = '';

            if(pathHasParams != -1){

                paramNames = tmp[i].replace(/(^[^\:]+)/, function(match, p){

                    addr = p.slice(0, -1); // remove trailing '/'

                    return '';
                }).split('/');

                for(var j = 0; j < paramNames.length; j ++){

                    paramNames[j] = paramNames[j].slice(1); // remove leading ':'
                }

            } else {

                addr = tmp[i];
            }

            if(addr != 'GET'){

                if( _url.search(new RegExp(addr, 'g')) != -1) { // route matches

                    for(var j = 0; j < paramNames.length; j ++){

                        this.params[paramNames[j]] = '';
                    }

                    var arr = _url.replace(new RegExp(addr, 'g'), '');

                    arr = arr.slice(1).split('/');

                    if(arr[0] == ''){
                        arr = [];
                    }

                    for(var j = 0; j < arr.length; j ++){

                        this.params[paramNames[j]] = arr[j];
                    }

                    this.signal = tmp[i]; // must include path parameters to match 'on'

                    break;
                }
            }
        }
    }
}

