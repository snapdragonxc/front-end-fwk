/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/state */ \"./src/state/state.js\");\n/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router/router */ \"./src/router/router.js\");\n/* harmony import */ var _rest_rest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rest/rest */ \"./src/rest/rest.js\");\n/*<--- APPP --->*/\n\n\n\n\n \n\n\n\n\nvar mvc = function() {\n\n    window['mvc__app'] = {}; // expose app on window.\n    \n\n    var state = new State();\n\n    var router = new Router();\n\n    var rest = new Rest();\n    \n\n    // define interface\n\n    return {\n        onRoute: function(path, callback){ \n\n            var e = {};\n\n            e.path = path;\n\n            e.callback = callback;\n\n            return router.onEvent('ON_ROUTE', e); \n\n        },\n\n        trigger: function(type, e){ return router.onEvent(type, e); },\n\n        get: function(addr, obj){ return rest.get(addr, obj); },\n\n        set: function(type, param){ return state.set(type, param); },\n\n        getState: function(){ return state; }\n    } \n\n};\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/compiler/compiler.js":
/*!**********************************!*\
  !*** ./src/compiler/compiler.js ***!
  \**********************************/
/*! exports provided: compiler__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compiler__proto\", function() { return compiler__proto; });\n\n/*<--- COMPILER --->*/\n\n\n\nvar compiler__proto = function(){ // compiler is a singleton\n\n    if (typeof compiler__proto.instance === 'object') {\n        return compiler__proto.instance;\n    }\n\n    compiler__proto.instance = this;\n\n}\n\ncompiler__proto.prototype.compile = function(compiled, view){\n\n\n    // replace prop on view with those tied to the window object\n\n    for (var prop in view) {\n\n        if( (view.hasOwnProperty(prop)) && (typeof(view[prop]) == 'function') ) {              \n\n            var str = prop + '\\\\(' + '(' + '[^\\)]*' + ')';\n\n            var re = new RegExp( str, 'g');\n\n            compiled = compiled.replace(re, function(match, p){\n\n                return ( 'mvc__app' + '.' + view.id + '.' + prop + '(' + p );                      \n             });\n        } \n    }   \n\n    \n\n     compiled = compiled.replace(/\\{\\{(.+?)\\}\\}/g, function(match, p) {\n\n                    p = p.trim();\n\n                    return p.split('.').reduce(function(obj, currentValue){\n                                return obj[currentValue];\n                            }, view);\n                });\n\n  /*  compiled = compiled.replace(/{{\\s*([^}]+)\\s*}}/g, function(match, p) {\n                    return p.split('.').reduce(function(obj, currentValue){\n                                return obj[currentValue];\n                            }, view);\n                }); */\n\n    return compiled;\n}\n\n\n\n\n//# sourceURL=webpack:///./src/compiler/compiler.js?");

/***/ }),

/***/ "./src/rest/rest.js":
/*!**************************!*\
  !*** ./src/rest/rest.js ***!
  \**************************/
/*! exports provided: rest__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rest__proto\", function() { return rest__proto; });\n/*<--- REST --->*/\n\n\n\nvar rest__proto = function(){\n\n    if (typeof rest__proto.instance === 'object') {\n        return rest__proto.instance;\n    }\n\n    rest__proto.instance = this;\n}\n\nrest__proto.prototype.get = function(addr, obj){\n\n     var str = \"\";\n\n    for (var key in obj) {\n\n        if (str != \"\") {\n            str += \"&\";\n        }\n        str += key + \"=\" + encodeURIComponent(obj[key]);\n    }\n\n    window.location.hash = addr + '?' + str;\n}\n\n\n\n//# sourceURL=webpack:///./src/rest/rest.js?");

/***/ }),

/***/ "./src/router/router.js":
/*!******************************!*\
  !*** ./src/router/router.js ***!
  \******************************/
/*! exports provided: router__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"router__proto\", function() { return router__proto; });\n/* harmony import */ var _state_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/state */ \"./src/state/state.js\");\n/*<--- ROUTER --->*/\n\n\n\n\n\nvar router__proto = function(){        // can only have one router - singleton\n\n    if (typeof router__proto.instance === 'object') {\n        return router__proto.instance;\n    }\n\n    this.routes = [];\n\n    this.state = new State();\n\n    router__proto.instance = this;\n\n};\n\nrouter__proto.prototype.onRoute = function(path, callback){\n    this.routes.push({\n        arg: path,\n        callback: callback\n    });\n};\n\nrouter__proto.prototype.controller = function(path, callback, url){\n\n    url = decodeURIComponent(url);\n\n    if(url == '/'){\n\n        if(this.state.default_route !== ''){\n\n            url = '/' + this.state.default_route; //'/Home'\n        }         \n    }\n\n    var params = {};\n\n    var urlHasParams = url.search(/\\?/)\n\n    if( urlHasParams != -1){  \n\n        var tmp = url.substring(urlHasParams + 1, url.length).split('&');\n        \n        for(var i = 0; i < tmp.length; i++){\n\n            var arr__tmp = tmp[i].split('=');\n\n            params[arr__tmp[0]] = arr__tmp[1];\n        }\n\n    } \n\n    if( url.search(new RegExp(path, 'g')) == -1) { // path does not match\n\n        return;\n\n    } else {                    // path matches\n\n\n        this.state.new_route = path.slice(1);             \n\n        if(callback){ \n\n            callback(params, state);\n        }\n    }\n};\n\nrouter__proto.prototype.onEvent = function(type, e){\n\n    switch(type){\n        case 'ROUTE_CHANGE':\n            for(var i = 0; i < this.routes.length; i++){\n\n                this.controller(this.routes[i].arg, this.routes[i].callback, '/' + e.url.slice(1)); \n            }\n            break;\n        case 'ON_LOAD':\n            for(var i = 0; i < this.routes.length; i++){\n\n                this.controller(this.routes[i].arg, this.routes[i].callback, '/' + e.url.slice(1)); \n            }\n            break;\n        case 'ON_ROUTE':\n            this.onRoute(e.path, e.callback);\n            \n            break;\n        default:\n            return;\n    }      \n\n};\n\n\n\n\n//# sourceURL=webpack:///./src/router/router.js?");

/***/ }),

/***/ "./src/state/display__view.js":
/*!************************************!*\
  !*** ./src/state/display__view.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- DISPLAY VIEW --->*/\n\n\n\nmodule.exports = function(view__id, str){\n\n    $('.' + view__id).html(str);\n\n}\n\n//# sourceURL=webpack:///./src/state/display__view.js?");

/***/ }),

/***/ "./src/state/rotate__views.js":
/*!************************************!*\
  !*** ./src/state/rotate__views.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*<--- ROTATE VIEWS --->*/\n\nmodule.exports = function(cur_route, new_route){\n\n    var x = document.getElementsByClassName(cur_route);\n    x[0].classList.add(\"hidden\");\n\n    var y = document.getElementsByClassName(new_route);\n    y[0].classList.remove(\"hidden\");\n\n    return new_route;\n}\n\n//# sourceURL=webpack:///./src/state/rotate__views.js?");

/***/ }),

/***/ "./src/state/state.js":
/*!****************************!*\
  !*** ./src/state/state.js ***!
  \****************************/
/*! exports provided: state__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state__proto\", function() { return state__proto; });\n/* harmony import */ var _views_active__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/active */ \"./src/views/active.js\");\n/* harmony import */ var _views_inactive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/inactive */ \"./src/views/inactive.js\");\n/* harmony import */ var _views_quotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/quotation */ \"./src/views/quotation.js\");\n/* harmony import */ var _display_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./display__view */ \"./src/state/display__view.js\");\n/* harmony import */ var _display_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_display_view__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _rotate_views__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rotate__views */ \"./src/state/rotate__views.js\");\n/* harmony import */ var _rotate_views__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_rotate_views__WEBPACK_IMPORTED_MODULE_4__);\n/*<--- STATE --->*/\n\n\n\n\n\n\n\n \n\n\n\n\n\nvar state__proto = function(){      // must have only one state - singleton\n\n    if (typeof state__proto.instance === 'object') {\n        return state__proto.instance;\n    }\n\n    this.arr_views = [];\n\n    this.cur_view = '';\n\n    this.cur_route = '';\n\n    this.new_route = '';\n\n    this.default_route = '';\n\n    this.view__dir = '';\n\n    // cache\n    state__proto.instance = this;\n}\n\nstate__proto.prototype.set__dir = function(view__dir){ \n\n    this.view__dir = view__dir;\n\n    for(var i = 0; i < this.arr_views.length; i++){\n\n        this.arr_views[i].set__dir(view__dir);\n    }\n\n}\n\nstate__proto.prototype.set = function(type, param){\n\n    switch(type){\n\n        case 'views__dir':\n            this.set__dir(param);\n            break;\n\n        case 'default__route':\n            this.default_route = param.slice(1);\n            break;\n    }\n};\n\nstate__proto.prototype.renderActive = function(view__id, updateTemplate){   \n\n    // render dynamic view\n\n    var index = -1;\n\n    for(var i = 0; i < this.arr_views.length; i++){ // get existing view\n\n        if(this.arr_views[i].id === view__id){\n            index = i;               \n        } \n    }\n\n    if(index == -1){  // new view - add to array\n\n        var view__obj = new Active(view__id, updateTemplate);\n\n        view__obj.set__dir(this.view__dir);\n\n        this.arr_views.push(view__obj);\n\n        index = this.arr_views.length -1 ;\n\n        window.mvc__app[view__id] = view__obj;\n\n    } \n\n    this.cur_view = this.arr_views[index];\n\n    this.cur_view.updateTemplate(state);\n\n    this.new_route = view__id;\n\n    Object(_rotate_views__WEBPACK_IMPORTED_MODULE_4__[\"rotate__views\"])(this.cur_route, this.new_route);\n\n    this.cur_route = this.new_route;\n\n    return this.cur_view.renderTemplate(); \n}\n\nstate__proto.prototype.renderInactive = function(view__id){\n\n    // render static view\n\n    var index = -1;\n\n    for(var i = 0; i < this.arr_views.length; i++){ // get existing view\n\n        if(this.arr_views[i].id === view__id){\n            index = i;               \n        } \n    }\n\n    if(index == -1){  // new view - add to array\n\n        var view__obj = new Inactive(view__id, updateTemplate);\n\n        view__obj.set__dir(this.view__dir);\n\n        this.arr_views.push(view__obj);\n\n        index = this.arr_views.length -1 ;\n\n    } \n\n    this.cur_view = this.arr_views[index];\n\n    this.new_route = view__id;\n\n    Object(_rotate_views__WEBPACK_IMPORTED_MODULE_4__[\"rotate__views\"])(this.cur_route, this.new_route);\n\n    this.cur_route = this.new_route;\n\n    return this.cur_view.renderTemplate(); \n}\n\nstate__proto.prototype.renderQuotation = function(view__id, str){\n\n    // render string view\n\n    var index = -1;\n\n    for(var i = 0; i < this.arr_views.length; i++){ // get existing view\n\n        if(this.arr_views[i].id === view__id){\n            index = i;               \n        } \n    }\n\n    if(index == -1){  // new view - add to array\n\n        var view__obj = new Quotation(view__id, str);\n\n        view__obj.set__dir(this.view__dir);\n\n        this.arr_views.push(view__obj);\n\n        index = this.arr_views.length -1 ;\n\n    } \n\n    this.cur_view = this.arr_views[index];\n\n    this.new_route = view__id;\n\n    Object(_rotate_views__WEBPACK_IMPORTED_MODULE_4__[\"rotate__views\"])(this.cur_route, this.new_route);\n\n    this.cur_route = this.new_route;\n\n    return this.cur_view.renderTemplate(); \n}\n\nstate__proto.prototype.render = function(params){\n\n    var args = Array.from(arguments);\n\n    // if render is called then route matches\n\n    if(this.cur_route === ''){\n        this.cur_route = args[0];\n    }\n    \n    if( args.length == 1 ){       // static view only\n\n        this.renderActive(args[0]).then(function(resolve){\n\n            Object(_display_view__WEBPACK_IMPORTED_MODULE_3__[\"display__view\"])(this.cur_route, resolve);\n\n        }, function(reject){ \n            \n            console.log(reject);\n        });\n\n    } else {                       \n\n        if( typeof(args[1]) === 'string'){\n\n            this.renderInactive(args[0], args[1]).then(function(resolve){\n\n                Object(_display_view__WEBPACK_IMPORTED_MODULE_3__[\"display__view\"])(this.cur_route, resolve);\n\n            }, function(reject){\n\n                console.log(reject);\n            }); \n\n        } else if( typeof(args[1]) === 'function' ){\n\n            this.renderQuotation(args[0], args[1]).then(function(resolve){\n\n                Object(_display_view__WEBPACK_IMPORTED_MODULE_3__[\"display__view\"])(this.cur_route, resolve);\n\n            }, function(reject){\n\n                console.log(reject);\n            }); \n        } \n    } \n}\n\n\n\n//# sourceURL=webpack:///./src/state/state.js?");

/***/ }),

/***/ "./src/views/active.js":
/*!*****************************!*\
  !*** ./src/views/active.js ***!
  \*****************************/
/*! exports provided: active__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"active__proto\", function() { return active__proto; });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./src/views/view.js\");\n/* harmony import */ var _compiler_compiler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compiler/compiler */ \"./src/compiler/compiler.js\");\n/* harmony import */ var _async_load__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./async__load */ \"./src/views/async__load.js\");\n/*<--- VIEW --->*/\n\n\n\n\n\n\n\n\n\n//var dynamic__proto = function(id, arg){\n\nvar active__proto = function(id, arg){\n\n    view.call(this, id, 'DYNAMIC');\n\n    this.updateTemplate = arg;\n}; \n\nactive__proto.prototype = new view();\n\nactive__proto.prototype.renderTemplate = function(){\n\n    return new Promise((resolve, reject) => {\n\n        var template = this.template__name();\n\n        var view = this;  \n\n        Object(_async_load__WEBPACK_IMPORTED_MODULE_2__[\"async__load\"])(template).then(function(response){\n\n            var compiled = Compiler.compile(response, view);\n\n            resolve({view__id: view.id, str: compiled});\n\n          //  display__view(view.id, compiled);          \n\n        }, function(reject){\n\n            console.log(reject);\n        })   \n    });   \n};\n\n\n\n//# sourceURL=webpack:///./src/views/active.js?");

/***/ }),

/***/ "./src/views/async__load.js":
/*!**********************************!*\
  !*** ./src/views/async__load.js ***!
  \**********************************/
/*! exports provided: async__load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"async__load\", function() { return async__load; });\n/*<--- ASYNC FILE LOADER --->*/\n\n\n\nvar async__load = function(url) {\n\n    return new Promise((resolve, reject) => {\n\n        const xhr = new XMLHttpRequest();\n\n        xhr.open(\"GET\", url);\n\n        xhr.onload = () => resolve(xhr.responseText);\n\n        xhr.onerror = () => reject(xhr.statusText);\n\n        xhr.send();\n    });\n}\n\n\n\n//# sourceURL=webpack:///./src/views/async__load.js?");

/***/ }),

/***/ "./src/views/inactive.js":
/*!*******************************!*\
  !*** ./src/views/inactive.js ***!
  \*******************************/
/*! exports provided: inactive__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inactive__proto\", function() { return inactive__proto; });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./src/views/view.js\");\n/*<--- STATIC VIEW --->*/\n\n\n\n\n\nvar async__load = __webpack_require__(/*! ./async__load */ \"./src/views/async__load.js\");\n\nvar inactive__proto = function(id){\n\n    View.call(this, id, 'STATIC');\n}; \n\ninactive__proto.prototype = new View();\n\ninactive__proto.prototype.renderTemplate = function(){\n\n    return new Promise((resolve, reject) => {\n\n        var template = this.template__name();\n\n        var view = this;  \n\n        async__load(template).then(function(response){\n\n            resolve({view__id: view.id, str: response});       \n\n        }, function(reject){\n\n            console.log(reject);\n        })   \n    });\n}\n\n\n\n//# sourceURL=webpack:///./src/views/inactive.js?");

/***/ }),

/***/ "./src/views/quotation.js":
/*!********************************!*\
  !*** ./src/views/quotation.js ***!
  \********************************/
/*! exports provided: quotation__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"quotation__proto\", function() { return quotation__proto; });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./src/views/view.js\");\n/*<--- STRING VIEW --->*/\n\n\n\n\n\nvar quotation__proto = function(id, arg){\n\n    View.call(this, id, 'STATIC');\n\n    this.str = arg;\n}; \n\nquotation__proto.prototype = new View();\n\nquotation__proto.prototype.renderTemplate = function(){\n\n    return new Promise((resolve, reject) => {\n\n        try {\n\n            resolve(this.str);\n        }\n        catch(err){\n\n            reject(err);\n        }\n    }); \n}  \n\n\n\n\n//# sourceURL=webpack:///./src/views/quotation.js?");

/***/ }),

/***/ "./src/views/view.js":
/*!***************************!*\
  !*** ./src/views/view.js ***!
  \***************************/
/*! exports provided: view__proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"view__proto\", function() { return view__proto; });\n/*<--- VIEW --->*/\n\n\n\nvar view__proto = function(id, arg){\n\n    this.id = id;\n\n    this.view__dir = ''; \n\n    this.type = '';\n\n}\n\nview__proto.prototype.set__dir = function(views){\n\n    this.view__dir = view__dir; + '/' + this.id + '.html';\n}\n\nview__proto.prototype.template__name = function(views){\n\n    return view__dir + '/' + this.id + '.html';\n}\n\n\n\n//# sourceURL=webpack:///./src/views/view.js?");

/***/ })

/******/ });