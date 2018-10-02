/*<--- VIEW --->*/

'use strict';

var Component = require('./component');

var view__proto = function(id, dir, callback, template, state__components){

    Component.call(this, id, dir, callback, template);

    this.state__components = state__components;

    this.components = []; // list of all types of components in view

    this.component__instances = []; // list of component instances
}; 

view__proto.prototype = new Component(); // a view is inherited from a component (the smallest unit);

view__proto.prototype.load__components =function(){

    // loop thru compents list and find any Components within View 

    var state__components = this.state__components;

    var promises = [];

    for(var i = 0; i < state__components.length; i++){

        var component = state__components[i];

        var str = '<' + component.id + '[^(\/>)]*\/>';  // search for all components in the view

        var re = new RegExp( str, 'g');

        if( this.str.search(re) != -1){

            this.components.push(state__components[i]);

            var pr = component.load__template(); // load template is a promise

            promises.push(pr);
        }
    }
           
    return Promise.all(promises);
}

view__proto.prototype.load = function(){

    var that = this;

    return new Promise((resolve, reject) => {
            
        that.load__template().then(function(value){

            that.load__components().then(function(){

                resolve('TEMPLATE_LOADED');

            }, function(err){

                reject("TEMPLATE_LOAD_ERR", err);
            });
        });
    });
}

view__proto.prototype.render__components = function(){

    var view = this;

    var instance = 0;

    var compiled = this.str;

    try {

        this.components.forEach(function(component){

            var re = new RegExp( '<' + '(' + component.id + '[^(\/>)]*)\/>', 'g');

            compiled = compiled.replace(re, function(match, p){

                // compile each instance of the component in the view.

                // if the instance does not exist, then it is created

                var props = {};

                // get component props 

                p.replace(/([\w]+)[\s]*=[\s]*\{\{(.+?)\}\}/g, function(match, name, value) { 

                    value = value.trim();

                    props[name] = value;

                    return;
                });

                //evaluate component with props 

                var props__eval = {};

                for (var prop in props) {

                    var param = props[prop];

                    if( view.hasOwnProperty(param) ) {

                        if (typeof(view[param]) !== 'function')  {                         

                            props__eval[prop] = view[param];

                        } else {                       

                            props__eval[prop] = param; 
                        }
                    } 
                }

                // create component instance if it does not exist and render that instance

                var obj = {};

                if( view.component__instances[instance] === undefined ){

                    obj = new Component(component.id, component.dir, component.callback, component.template)

                    obj.str = component.str;

                    obj.instance = instance;

                    view.component__instances.push(obj);

                } else {

                    obj = view.component__instances[instance];
                }                               
                
                instance = instance + 1;

                return obj.render__template(props__eval);
         
             });
        });  

        this.str = compiled;
    }
    catch(err){

        console.log('Failed to render commponents', err);
    }
}


view__proto.prototype.render__template = function(state){ 

   // console.log('vw', state, view)
        
    this.callback(state); // set template with state  

    this.render__components(); // render individual components first

    var view = this;

    var compiled = this.str;

    try {

        // replace params

        compiled = compiled.replace(/\{\{(.+?)\}\}/g, function(match, p) {

            p = p.trim();

            return p.split('.').reduce(function(obj, currentValue){
                        return obj[currentValue];
                    }, view);
        });

        // replace props

        for (var prop in view) {

            if( (view.hasOwnProperty(prop)) && (typeof(view[prop]) == 'function') ) {              

                var re = new RegExp( prop + '\\(' + '(' + '[^\)]*' + ')', 'g');

                compiled = compiled.replace(re, function(match, p){

                    return ( 'mvc__app' + '.' + view.id + '.' + prop + '(' + p );                      
                 });
            } 
        }   

        this.str = compiled; 
    }
    catch(err){

        console.log('Failed to compile template', err);
    }

    return this.str;
};

module.exports = view__proto;