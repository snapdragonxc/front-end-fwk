/*<--- DISPLAY VIEW --->*/

/* Based on a stack-overflow post by 'phidah':

https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml

which is itself based on jQuery.

*/

'use strict';

var display__view = function(obj){

    var nodeName = function( elem, name ) {

        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    }

    var evalScript = function( elem ) {

        var data = ( elem.text || elem.textContent || elem.innerHTML || "" );

        var head = document.getElementsByTagName("head")[0] || document.documentElement;

        var script = document.createElement("script");

        script.type = "text/javascript";

        script.appendChild( document.createTextNode( data ) );

        head.insertBefore( script, head.firstChild );

        head.removeChild( script );

        if ( elem.parentNode ) {

            elem.parentNode.removeChild( elem );
        }
    }

    var x = document.getElementsByClassName(obj.view__id);

    var domelement = x[0];

    domelement.innerHTML = obj.str;

    var scripts = [];

    var ret = domelement.childNodes;
    for ( var i = 0; ret[i]; i++ ) {
        if ( scripts && nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
            scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
        }
    }

    scripts.forEach(function(script) {

        evalScript(script);
    });

} 

module.exports = display__view;