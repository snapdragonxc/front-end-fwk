/*<--- STATE --->*/

'use strict';

var View = require('../views/view');

var display__view = require('./display__view');

var swap__views = require('./swap__views');

// components

var Component = require('../views/component');


var state__proto = function(){      // must have only one state - singleton

    if (typeof state__proto.instance === 'object') {
        return state__proto.instance;
    }

    this.arr_views = [];

    this.view = {};

    this.cur_route = '';

    this.new_route = '';

    this.default_route = '';

    this.views__dir = '';

    // components

    this.components__dir = '';

    this.arr_components = [];

    // cache
    state__proto.instance = this;
}

state__proto.prototype.set = function(type, param){

    switch(type){

        case 'views__dir':

            this.views__dir = param;

            for(var i = 0; i < this.arr_views.length; i++){

                this.arr_views[i].set__dir(param);
            }
            
            break;
        case 'components__dir':

            this.components__dir = param;

            for(var i = 0; i < this.arr_components.length; i++){

                this.arr_components[i].set__dir(param);
            }

            break;
        case 'default__route':
            this.default_route = param.slice(1);
            break;
    }
};

state__proto.prototype.registerComponent = function(args){

    var component__id = args[0];

    var components__dir = this.components__dir;

    var callback = function(){};

    var template = '';

    if(typeof(args[1]) === 'function'){

        template = args[2];

        callback = args[1];
    }
    
    if(typeof(args[1]) === 'string'){

        template = args[1];
    }

    var index = -1;

    for(var i = 0; i < this.arr_components.length; i++){ // get existing component

        if(this.arr_components[i].id === component__id){
            index = i; 
            return -1;              // component already exists
        } 
    }

    if(index == -1){  // new component - create and add to array

        var component__obj = new Component(component__id, components__dir, callback, template);


        this.arr_components.push(component__obj);

        index = this.arr_components.length -1 ;

        return index;
    }
}

state__proto.prototype.registerView = function(args){

    var view__id = args[0];

    var views__dir = this.views__dir;

    var callback = function(){};

    var template = '';

    var state__components = this.arr_components;

    if(typeof(args[1]) === 'function'){

        template = args[2];

        callback = args[1];
    }
    
    if(typeof(args[1]) === 'string'){

        template = args[1];
    }


    var index = -1;

    for(var i = 0; i < this.arr_views.length; i++){ // get existing view

        if(this.arr_views[i].id === view__id){
            index = i;               
        } 
    }

    if(index == -1){  // new view - create and add to array

        var view__obj = new View(view__id, views__dir, callback, template, state__components);

        window.mvc__app[view__id] = view__obj;

        this.arr_views.push(view__obj);

        index = this.arr_views.length -1 ;
    }

    this.view = this.arr_views[index];
}

state__proto.prototype.render = function(params){

    // if render is called then route matches

    var args = Array.from(arguments);

    var view__id = args[0];

    if(this.cur_route === ''){

        this.cur_route = view__id;
    }

    this.registerView(args);

    this.new_route = view__id;

    swap__views(this.cur_route, this.new_route);

    this.cur_route = this.new_route;

    var view = this.view;

    var that = this;

    view.load().then(function(value){

        var str = view.render__template(that);

        display__view({view__id: view.id, str: str});

    }, function(err){

        console.log(err);
    }); 


}

module.exports = state__proto;