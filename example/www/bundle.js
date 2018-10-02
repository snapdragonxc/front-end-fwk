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

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nfunction EventEmitter() {\n  this._events = this._events || {};\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nEventEmitter.defaultMaxListeners = 10;\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function(n) {\n  if (!isNumber(n) || n < 0 || isNaN(n))\n    throw TypeError('n must be a positive number');\n  this._maxListeners = n;\n  return this;\n};\n\nEventEmitter.prototype.emit = function(type) {\n  var er, handler, len, args, i, listeners;\n\n  if (!this._events)\n    this._events = {};\n\n  // If there is no 'error' event listener then throw.\n  if (type === 'error') {\n    if (!this._events.error ||\n        (isObject(this._events.error) && !this._events.error.length)) {\n      er = arguments[1];\n      if (er instanceof Error) {\n        throw er; // Unhandled 'error' event\n      } else {\n        // At least give some kind of context to the user\n        var err = new Error('Uncaught, unspecified \"error\" event. (' + er + ')');\n        err.context = er;\n        throw err;\n      }\n    }\n  }\n\n  handler = this._events[type];\n\n  if (isUndefined(handler))\n    return false;\n\n  if (isFunction(handler)) {\n    switch (arguments.length) {\n      // fast cases\n      case 1:\n        handler.call(this);\n        break;\n      case 2:\n        handler.call(this, arguments[1]);\n        break;\n      case 3:\n        handler.call(this, arguments[1], arguments[2]);\n        break;\n      // slower\n      default:\n        args = Array.prototype.slice.call(arguments, 1);\n        handler.apply(this, args);\n    }\n  } else if (isObject(handler)) {\n    args = Array.prototype.slice.call(arguments, 1);\n    listeners = handler.slice();\n    len = listeners.length;\n    for (i = 0; i < len; i++)\n      listeners[i].apply(this, args);\n  }\n\n  return true;\n};\n\nEventEmitter.prototype.addListener = function(type, listener) {\n  var m;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events)\n    this._events = {};\n\n  // To avoid recursion in the case that type === \"newListener\"! Before\n  // adding it to the listeners, first emit \"newListener\".\n  if (this._events.newListener)\n    this.emit('newListener', type,\n              isFunction(listener.listener) ?\n              listener.listener : listener);\n\n  if (!this._events[type])\n    // Optimize the case of one listener. Don't need the extra array object.\n    this._events[type] = listener;\n  else if (isObject(this._events[type]))\n    // If we've already got an array, just append.\n    this._events[type].push(listener);\n  else\n    // Adding the second element, need to change to array.\n    this._events[type] = [this._events[type], listener];\n\n  // Check for listener leak\n  if (isObject(this._events[type]) && !this._events[type].warned) {\n    if (!isUndefined(this._maxListeners)) {\n      m = this._maxListeners;\n    } else {\n      m = EventEmitter.defaultMaxListeners;\n    }\n\n    if (m && m > 0 && this._events[type].length > m) {\n      this._events[type].warned = true;\n      console.error('(node) warning: possible EventEmitter memory ' +\n                    'leak detected. %d listeners added. ' +\n                    'Use emitter.setMaxListeners() to increase limit.',\n                    this._events[type].length);\n      if (typeof console.trace === 'function') {\n        // not supported in IE 10\n        console.trace();\n      }\n    }\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.once = function(type, listener) {\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  var fired = false;\n\n  function g() {\n    this.removeListener(type, g);\n\n    if (!fired) {\n      fired = true;\n      listener.apply(this, arguments);\n    }\n  }\n\n  g.listener = listener;\n  this.on(type, g);\n\n  return this;\n};\n\n// emits a 'removeListener' event iff the listener was removed\nEventEmitter.prototype.removeListener = function(type, listener) {\n  var list, position, length, i;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events || !this._events[type])\n    return this;\n\n  list = this._events[type];\n  length = list.length;\n  position = -1;\n\n  if (list === listener ||\n      (isFunction(list.listener) && list.listener === listener)) {\n    delete this._events[type];\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n\n  } else if (isObject(list)) {\n    for (i = length; i-- > 0;) {\n      if (list[i] === listener ||\n          (list[i].listener && list[i].listener === listener)) {\n        position = i;\n        break;\n      }\n    }\n\n    if (position < 0)\n      return this;\n\n    if (list.length === 1) {\n      list.length = 0;\n      delete this._events[type];\n    } else {\n      list.splice(position, 1);\n    }\n\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.removeAllListeners = function(type) {\n  var key, listeners;\n\n  if (!this._events)\n    return this;\n\n  // not listening for removeListener, no need to emit\n  if (!this._events.removeListener) {\n    if (arguments.length === 0)\n      this._events = {};\n    else if (this._events[type])\n      delete this._events[type];\n    return this;\n  }\n\n  // emit removeListener for all listeners on all events\n  if (arguments.length === 0) {\n    for (key in this._events) {\n      if (key === 'removeListener') continue;\n      this.removeAllListeners(key);\n    }\n    this.removeAllListeners('removeListener');\n    this._events = {};\n    return this;\n  }\n\n  listeners = this._events[type];\n\n  if (isFunction(listeners)) {\n    this.removeListener(type, listeners);\n  } else if (listeners) {\n    // LIFO order\n    while (listeners.length)\n      this.removeListener(type, listeners[listeners.length - 1]);\n  }\n  delete this._events[type];\n\n  return this;\n};\n\nEventEmitter.prototype.listeners = function(type) {\n  var ret;\n  if (!this._events || !this._events[type])\n    ret = [];\n  else if (isFunction(this._events[type]))\n    ret = [this._events[type]];\n  else\n    ret = this._events[type].slice();\n  return ret;\n};\n\nEventEmitter.prototype.listenerCount = function(type) {\n  if (this._events) {\n    var evlistener = this._events[type];\n\n    if (isFunction(evlistener))\n      return 1;\n    else if (evlistener)\n      return evlistener.length;\n  }\n  return 0;\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  return emitter.listenerCount(type);\n};\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\n\n\n//# sourceURL=webpack:///./node_modules/events/events.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*<--- APP --->*/\n\nvar http = __webpack_require__(/*! ./http */ \"./src/http.js\");\n\nvar EventEmitter = __webpack_require__(/*! events */ \"./node_modules/events/events.js\").EventEmitter;\n\nvar State = __webpack_require__(/*! ./state */ \"./src/state/index.js\");\n\nvar Router = __webpack_require__(/*! ./router */ \"./src/router.js\");\n//\n\nvar controller__proto = function(){      // must have only one state - singleton\n\n    if (typeof controller__proto.instance === 'object') {\n        return controller__proto.instance;\n    }\n\n    this.state = new State(); // state is the 'model'.\n\n    this.on('HASH_CHANGE', function(url){\n\n        Router.handle.call(this, url);\n\n        this.emit(this.signal, this.params, this.state);\n    });\n\n    controller__proto.instance = this;\n}\n\ncontroller__proto.prototype = new EventEmitter(); // inherit from Event Emiiter\n\ncontroller__proto.prototype.http = function(addr, obj){ \n\n    http.get(addr, obj);\n\n};\n\ncontroller__proto.prototype.set = function(type, param){ return this.state.set(type, param); },\n\ncontroller__proto.prototype.component = function(params){ \n\n    var args = Array.from(arguments)\n\n    return this.state.registerComponent(args);\n}\n\nwindow['mvc__app'] = {}; // used for window event functions\n\n\nwindow['mvc'] = function(){ return new controller__proto() };\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/http.js":
/*!*********************!*\
  !*** ./src/http.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- REST --->*/\n\n\n\nmodule.exports = {\n\n    get: function(addr, obj){\n\n        var str = \"\";\n\n        for (var key in obj) {\n\n            if (str != \"\") {\n                str += \"&\";\n            }\n            str += key + \"=\" + encodeURIComponent(obj[key]);\n        }\n\n        window.location.hash = addr + '?' + str;\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/http.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n\n    handle: function(url){\n\n        var url = '/' + url.slice(1);\n\n        url = decodeURIComponent(url);\n\n        if(url == '/'){\n\n            if(this.state.default_route !== ''){\n\n                url = '/' + this.state.default_route; //'/Home'\n            }         \n        }\n\n        this.params = {};\n\n        var urlHasParams = url.search(/\\?/)\n\n        var tmp = url.substring(urlHasParams + 1, url.length).split('&');\n        \n        for(var i = 0; i < tmp.length; i++){\n\n            var arr__tmp = tmp[i].split('=');\n\n            this.params[arr__tmp[0]] = arr__tmp[1];\n        }\n\n        this.signal = '';\n\n        if( urlHasParams != -1 ){\n\n            this.signal = url.substring(0, urlHasParams);\n\n        } else {\n\n            this.signal = url;\n        }\n\n    } \n}\n\n\n\n//# sourceURL=webpack:///./src/router.js?");

/***/ }),

/***/ "./src/state/display__view.js":
/*!************************************!*\
  !*** ./src/state/display__view.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- DISPLAY VIEW --->*/\n\n/* Based on a stack-overflow post by 'phidah':\n\nhttps://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml\n\nwhich is itself based on jQuery.\n\n*/\n\n\n\nvar display__view = function(obj){\n\n    var nodeName = function( elem, name ) {\n\n        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();\n    }\n\n    var evalScript = function( elem ) {\n\n        var data = ( elem.text || elem.textContent || elem.innerHTML || \"\" );\n\n        var head = document.getElementsByTagName(\"head\")[0] || document.documentElement;\n\n        var script = document.createElement(\"script\");\n\n        script.type = \"text/javascript\";\n\n        script.appendChild( document.createTextNode( data ) );\n\n        head.insertBefore( script, head.firstChild );\n\n        head.removeChild( script );\n\n        if ( elem.parentNode ) {\n\n            elem.parentNode.removeChild( elem );\n        }\n    }\n\n    var x = document.getElementsByClassName(obj.view__id);\n\n    var domelement = x[0];\n\n    domelement.innerHTML = obj.str;\n\n    var scripts = [];\n\n    var ret = domelement.childNodes;\n    for ( var i = 0; ret[i]; i++ ) {\n        if ( scripts && nodeName( ret[i], \"script\" ) && (!ret[i].type || ret[i].type.toLowerCase() === \"text/javascript\") ) {\n            scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );\n        }\n    }\n\n    scripts.forEach(function(script) {\n\n        evalScript(script);\n    });\n\n} \n\nmodule.exports = display__view;\n\n//# sourceURL=webpack:///./src/state/display__view.js?");

/***/ }),

/***/ "./src/state/index.js":
/*!****************************!*\
  !*** ./src/state/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- STATE --->*/\n\n\n\nvar View = __webpack_require__(/*! ../views/view */ \"./src/views/view.js\");\n\nvar display__view = __webpack_require__(/*! ./display__view */ \"./src/state/display__view.js\");\n\nvar swap__views = __webpack_require__(/*! ./swap__views */ \"./src/state/swap__views.js\");\n\n// components\n\nvar Component = __webpack_require__(/*! ../views/component */ \"./src/views/component.js\");\n\n\nvar state__proto = function(){      // must have only one state - singleton\n\n    if (typeof state__proto.instance === 'object') {\n        return state__proto.instance;\n    }\n\n    this.arr_views = [];\n\n    this.view = {};\n\n    this.cur_route = '';\n\n    this.new_route = '';\n\n    this.default_route = '';\n\n    this.views__dir = '';\n\n    // components\n\n    this.components__dir = '';\n\n    this.arr_components = [];\n\n    // cache\n    state__proto.instance = this;\n}\n\nstate__proto.prototype.set = function(type, param){\n\n    switch(type){\n\n        case 'views__dir':\n\n            this.views__dir = param;\n\n            for(var i = 0; i < this.arr_views.length; i++){\n\n                this.arr_views[i].set__dir(param);\n            }\n            \n            break;\n        case 'components__dir':\n\n            this.components__dir = param;\n\n            for(var i = 0; i < this.arr_components.length; i++){\n\n                this.arr_components[i].set__dir(param);\n            }\n            \n            break;\n\n        case 'default__route':\n            this.default_route = param.slice(1);\n            break;\n    }\n};\n\nstate__proto.prototype.registerComponent = function(args){\n\n    var component__id = args[0];\n\n    var components__dir = this.components__dir;\n\n    var callback = function(){};\n\n    var template = '';\n\n    if(typeof(args[1]) === 'function'){\n\n        template = args[2];\n\n        callback = args[1];\n    }\n    \n    if(typeof(args[1]) === 'string'){\n\n        template = args[1];\n    }\n\n    var index = -1;\n\n    for(var i = 0; i < this.arr_components.length; i++){ // get existing component\n\n        if(this.arr_components[i].id === component__id){\n            index = i; \n            return -1;              // component already exists\n        } \n    }\n\n    if(index == -1){  // new component - create and add to array\n\n        var component__obj = new Component(component__id, components__dir, callback, template);\n\n        this.arr_components.push(component__obj);\n\n        index = this.arr_components.length -1 ;\n\n        return index;\n    }\n}\n\nstate__proto.prototype.registerView = function(args){\n\n    var view__id = args[0];\n\n    var views__dir = this.views__dir;\n\n    var callback = function(){};\n\n    var template = '';\n\n    var state__components = this.arr_components;\n\n    if(typeof(args[1]) === 'function'){\n\n        template = args[2];\n\n        callback = args[1];\n    }\n    \n    if(typeof(args[1]) === 'string'){\n\n        template = args[1];\n    }\n\n\n    var index = -1;\n\n    for(var i = 0; i < this.arr_views.length; i++){ // get existing view\n\n        if(this.arr_views[i].id === view__id){\n            index = i;               \n        } \n    }\n\n    if(index == -1){  // new view - create and add to array\n\n        var view__obj = new View(view__id, views__dir, callback, template, state__components);\n\n        window.mvc__app[view__id] = view__obj;\n\n        this.arr_views.push(view__obj);\n\n        index = this.arr_views.length -1 ;\n    }\n\n    this.view = this.arr_views[index];\n}\n\nstate__proto.prototype.render = function(params){\n\n    // if render is called then route matches\n\n    var args = Array.from(arguments);\n\n    var view__id = args[0];\n\n    if(this.cur_route === ''){\n\n        this.cur_route = view__id;\n    }\n\n    this.registerView(args);\n\n    this.new_route = view__id;\n\n    swap__views(this.cur_route, this.new_route);\n\n    this.cur_route = this.new_route;\n\n    var view = this.view;\n\n    var that = this;\n\n    view.load().then(function(value){\n\n        var str = view.render__template(that);\n\n        display__view({view__id: view.id, str: str});\n\n    }, function(err){\n\n        console.log(err);\n    }); \n\n\n}\n\nmodule.exports = state__proto;\n\n//# sourceURL=webpack:///./src/state/index.js?");

/***/ }),

/***/ "./src/state/swap__views.js":
/*!**********************************!*\
  !*** ./src/state/swap__views.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*<--- ROTATE VIEWS --->*/\n\nvar swap__views = function(cur_route, new_route){\n\n    var x = document.getElementsByClassName(cur_route);\n    x[0].classList.add(\"hidden\");\n\n    var y = document.getElementsByClassName(new_route);\n    y[0].classList.remove(\"hidden\");\n\n    return new_route;\n}\n\nmodule.exports = swap__views;\n\n//# sourceURL=webpack:///./src/state/swap__views.js?");

/***/ }),

/***/ "./src/views/async__load.js":
/*!**********************************!*\
  !*** ./src/views/async__load.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- ASYNC FILE LOADER --->*/\n\n\n\nvar async__load = function(url) {\n\n    return new Promise((resolve, reject) => {\n\n        const xhr = new XMLHttpRequest();\n\n        xhr.open(\"GET\", url);\n\n        xhr.onload = () => resolve(xhr.responseText);\n\n        xhr.onerror = () => reject(xhr.statusText);\n\n        xhr.send();\n    });\n}\n\nmodule.exports = async__load;\n\n//# sourceURL=webpack:///./src/views/async__load.js?");

/***/ }),

/***/ "./src/views/component.js":
/*!********************************!*\
  !*** ./src/views/component.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- ACTIVE COMPONENT --->*/\n\n\n\nvar async__load = __webpack_require__(/*! ./async__load */ \"./src/views/async__load.js\");\n\nvar component__proto = function(id, dir, callback, template){\n\n    this.id = id;\n\n    this.dir = dir; \n\n    this.callback = callback;\n\n    if( (template !== undefined) && (template !== '') ){\n\n        this.str = template; // the template\n\n        this.hasFile = false;\n\n    } else {\n\n        this.str = '';\n\n        this.hasFile = true;\n    }\n}; \n\ncomponent__proto.prototype.set__dir = function(dir){\n\n    this.dir = dir;\n}\n\ncomponent__proto.prototype.template__name = function(views){\n\n    return this.dir + '/' + this.id + '.html';\n}\n\ncomponent__proto.prototype.load__template = function(){\n\n    return new Promise((resolve, reject) => {\n\n        if(this.hasFile === false){\n\n            resolve('TEMPLATE_LOADED');\n\n        } else {\n          \n            var template = this.template__name();\n\n            var that = this;  \n\n            async__load(template).then(function(value){\n\n                that.str = value;\n\n                resolve('TEMPLATE_LOADED');       \n\n            }, function(err){\n\n                reject(err);\n\n                console.log('TEMPLATE_LOAD_ERR');\n            })   \n        }\n    });\n}\n\ncomponent__proto.prototype.render__template = function(props){  \n        \n    this.callback(props); // set template with props from parent\n\n    var compiled = this.str;\n\n    var view = this;\n\n    // replace props\n\n    compiled = compiled.replace(/\\{\\{(.+?)\\}\\}/g, function(match, p) {\n\n        p = p.trim();\n\n        return p.split('.').reduce(function(obj, currentValue){\n                    return obj[currentValue];\n                }, view);\n    });\n\n    // replace methods \n\n    for (var prop in view) {\n\n        if( view.hasOwnProperty(prop) ) {       \n\n            var re = new RegExp( prop + '\\\\(' + '(' + '[^\\)]*' + ')', 'g');\n\n            compiled = compiled.replace(re, function(match, p){\n\n                return ( view[prop] + '(' + p );                      \n             });\n        } \n    }   \n\n    return compiled;\n} \n\nmodule.exports = component__proto;\n\n//# sourceURL=webpack:///./src/views/component.js?");

/***/ }),

/***/ "./src/views/view.js":
/*!***************************!*\
  !*** ./src/views/view.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*<--- VIEW --->*/\n\n\n\nvar Component = __webpack_require__(/*! ./component */ \"./src/views/component.js\");\n\nvar view__proto = function(id, dir, callback, template, state__components){\n\n    Component.call(this, id, dir, callback, template);\n\n    this.state__components = state__components;\n\n    this.components = [];\n}; \n\nview__proto.prototype = new Component();\n\nview__proto.prototype.load__components =function(){\n\n    // loop thru compents list and find any Components within View \n\n    var state__components = this.state__components;\n\n    var promises = [];\n\n    for(var i = 0; i < state__components.length; i++){\n\n        var component = state__components[i];\n\n        var str = '<' + component.id + '[^(\\/>)]*\\/>';  // search for all components in the view\n\n        var re = new RegExp( str, 'g');\n\n        if( this.str.search(re) != -1){\n\n            this.components.push(state__components[i]);\n\n            var pr = component.load__template(); // load template is a promise\n\n            promises.push(pr);\n        }\n    }\n           \n    return Promise.all(promises);\n}\n\nview__proto.prototype.load = function(){\n\n    var that = this;\n\n    return new Promise((resolve, reject) => {\n            \n        that.load__template().then(function(value){\n\n            that.load__components().then(function(){\n\n                resolve('TEMPLATE_LOADED');\n\n            }, function(err){\n\n                reject(\"TEMPLATE_LOAD_ERR\", err);\n            });\n        });\n    });\n}\n\nview__proto.prototype.render__components = function(){\n\n    var view = this;\n\n    try {\n\n        var compiled = this.str;\n\n        var arr_components = this.components; // components in view\n\n        for (var i = 0; i < arr_components.length; i++) {  \n\n            var component = arr_components[i];\n\n            var re = new RegExp( '<' + '(' + component.id + '[^(\\/>)]*)\\/>', 'g');\n\n            compiled = compiled.replace(re, function(match, p){\n\n                var props = {};\n\n                // get component props \n\n                    p.replace(/([\\w]+)[\\s]*=[\\s]*\\{\\{(.+?)\\}\\}/g, function(match, name, value) { \n\n                        value = value.trim();\n\n                        props[name] = value;\n\n                        return;\n                    });\n\n                //evaluate component with props \n\n                var props__eval = {};\n\n                for (var prop in props) {\n\n                    var param = props[prop];\n\n                    if( view.hasOwnProperty(param) ) {\n\n                        if (typeof(view[param]) !== 'function')  {                         \n\n                            props__eval[prop] = view[param];\n\n                        } else {                       \n\n                            props__eval[prop] = param; \n                        }\n                    } \n\n                }\n                return component.render__template(props__eval);                  \n             });\n        }  \n\n        this.str = compiled;\n    }\n    catch(err){\n\n        console.log('Failed to render commponents', err);\n    }\n}\n\n\nview__proto.prototype.render__template = function(state){ \n\n   // console.log('vw', state, view)\n        \n    this.callback(state); // set template with state  \n\n    this.render__components(); // render individual components first\n\n    var view = this;\n\n    // replace params\n\n    var compiled = this.str;\n\n    try {\n\n        compiled = compiled.replace(/\\{\\{(.+?)\\}\\}/g, function(match, p) {\n\n            p = p.trim();\n\n            return p.split('.').reduce(function(obj, currentValue){\n                        return obj[currentValue];\n                    }, view);\n        });\n\n        // replace props\n\n        for (var prop in view) {\n\n            if( (view.hasOwnProperty(prop)) && (typeof(view[prop]) == 'function') ) {              \n\n                var re = new RegExp( prop + '\\\\(' + '(' + '[^\\)]*' + ')', 'g');\n\n                compiled = compiled.replace(re, function(match, p){\n\n                    return ( 'mvc__app' + '.' + view.id + '.' + prop + '(' + p );                      \n                 });\n            } \n        }   \n\n        this.str = compiled; \n    }\n    catch(err){\n\n        console.log('Failed to compile template', err);\n    }\n\n    return this.str;\n};\n\nmodule.exports = view__proto;\n\n//# sourceURL=webpack:///./src/views/view.js?");

/***/ })

/******/ });