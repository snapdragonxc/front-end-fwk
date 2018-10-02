/*<--- ACTIVE COMPONENT --->*/

'use strict';

var async__load = require('./async__load');

var component__proto = function(id, dir, callback, template){

    this.id = id;

    this.dir = dir; 

    this.callback = callback;

    if( (template !== undefined) && (template !== '') ){

        this.str = template; // the template

        this.hasFile = false;

    } else {

        this.str = '';

        this.hasFile = true;
    }

    this.instance = 0; // for identifying each instance of a component
}; 

component__proto.prototype.set__dir = function(dir){

    this.dir = dir;
}

component__proto.prototype.template__name = function(views){

    return this.dir + '/' + this.id + '.html';
}

component__proto.prototype.load__template = function(){

    return new Promise((resolve, reject) => {

        if(this.hasFile === false){

            resolve('TEMPLATE_LOADED');

        } else {
          
            var template = this.template__name();

            var that = this;  

            async__load(template).then(function(value){

                that.str = value;

                resolve('TEMPLATE_LOADED');       

            }, function(err){

                reject(err);

                console.log('TEMPLATE_LOAD_ERR');
            })   
        }
    });
}

component__proto.prototype.render__template = function(props){  
        
    this.callback(props); // set template with props from parent

    var compiled = this.str;

    var view = this;

    // replace props

    compiled = compiled.replace(/\{\{(.+?)\}\}/g, function(match, p) {

        p = p.trim();

        return p.split('.').reduce(function(obj, currentValue){
                    return obj[currentValue];
                }, view);
    });

    // replace methods 

    for (var prop in view) {

        if( view.hasOwnProperty(prop) ) {       

            var re = new RegExp( prop + '\\(' + '(' + '[^\)]*' + ')', 'g');

            compiled = compiled.replace(re, function(match, p){

                if(typeof(view[prop]) === 'function'){

                    var instance = view.id + String(view.instance);

                    window.mvc__app[instance] = view;

                    return ( 'mvc__app' + '.' + view.id + String(view.instance) + '.' + prop + '(' + p );   

                } else{

                    return ( view[prop] + '(' + p );
                }                      
             });
        } 
    }   

    return compiled;
} 

module.exports = component__proto;